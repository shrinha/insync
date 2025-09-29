package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
)

// Config holds runtime configuration for the gateway.
type Config struct {
	UserServiceURL  string
	OtherServiceURL string
	Port            string
	JwtSecret       string
}

func main() {
	logger := logrus.New()
	logger.SetLevel(logrus.InfoLevel)

	// load local .env if present (makes `go run` pick up gateway/.env automatically)
	_ = godotenv.Load()

	// initialize jwt secret
	initJWT()

	router := mux.NewRouter()

	// health
	router.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("API Gateway is healthy"))
	}).Methods("GET")

	// Build config from env (read once)
	cfg := Config{
		UserServiceURL:  Getenv("USER_SERVICE_URL", "http://host.docker.internal:8081"),
		OtherServiceURL: Getenv("OTHER_SERVICE_URL", "http://localhost:8082"),
		Port:            Getenv("PORT", "8084"),
		JwtSecret:       Getenv("JWT_SECRET", "dev-secret"),
	}

	// Setup proxies
	muxSrv := http.NewServeMux()
	if err := addProxyRoutes(muxSrv, cfg); err != nil {
		log.Fatalf("failed to configure proxies: %v", err)
	}

	// Log resolved proxy targets (helpful for local vs docker runs)
	logger.Infof("Proxy targets: auth->%s api->%s", cfg.UserServiceURL, cfg.OtherServiceURL)

	// Mount proxies under router
	// /auth/ routes are proxied without JWT validation
	router.PathPrefix("/auth/").Handler(muxSrv)
	// /api/ routes are proxied with JWT middleware
	router.PathPrefix("/api/").Handler(jwtMiddleware(muxSrv))

	port := Getenv("PORT", "8084")
	logger.Infof("API Gateway starting on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
