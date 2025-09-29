package handlers

import (
	"database/sql"
	"net/http"

	config "insync/user-service/configs"
	"insync/user-service/internal/repo"

	"github.com/gorilla/mux"
)

// Handler-specific request types moved to their own files.

// RegisterRoutes returns an http.Handler for the service. It requires an open DB and a JWT secret.
func RegisterRoutes(cfg *config.Config, db *sql.DB, jwtSecret string) http.Handler {
	r := mux.NewRouter()

	r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	}).Methods("GET")

	// Create repo implementation and wire into handlers
	rdb := repo.NewPostgresRepo(db)

	r.HandleFunc("/signup", SignupHandler(cfg, rdb, jwtSecret)).Methods("POST")

	r.HandleFunc("/login", LoginHandler(cfg, rdb, jwtSecret)).Methods("POST")

	return r
}
