package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
)

func main() {
	logger := logrus.New()
	logger.SetLevel(logrus.InfoLevel)

	// initialize jwt secret
	initJWT()

	router := mux.NewRouter()

	// health
	router.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("API Gateway is healthy"))
	}).Methods("GET")

	// Setup proxies
	muxSrv := http.NewServeMux()
	if err := addProxyRoutes(muxSrv); err != nil {
		log.Fatalf("failed to configure proxies: %v", err)
	}

	// Mount proxies under router
	// /auth/ routes are proxied without JWT validation
	router.PathPrefix("/auth/").Handler(muxSrv)
	// /api/ routes are proxied with JWT middleware
	router.PathPrefix("/api/").Handler(jwtMiddleware(muxSrv))

	port := Getenv("PORT", "8084")
	logger.Infof("API Gateway starting on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
