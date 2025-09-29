package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	config "insync/user-service/configs"
	"insync/user-service/internal/auth"
	"insync/user-service/internal/models"

	"golang.org/x/crypto/bcrypt"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

type signupRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// RegisterRoutes returns an http.Handler for the service. It requires an open DB and a JWT secret.
func RegisterRoutes(cfg *config.Config, db *sql.DB, jwtSecret string) http.Handler {
	r := mux.NewRouter()

	r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	}).Methods("GET")

	r.HandleFunc("/signup", func(w http.ResponseWriter, r *http.Request) {
		var req signupRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "invalid request", http.StatusBadRequest)
			return
		}
		if req.Email == "" || req.Password == "" {
			http.Error(w, "email and password required", http.StatusBadRequest)
			return
		}

		id := uuid.NewString()
		if err := models.CreateUser(db, id, req.Email, req.Password); err != nil {
			http.Error(w, "failed to create user", http.StatusInternalServerError)
			return
		}

		token, err := auth.CreateToken(id, jwtSecret)
		if err != nil {
			http.Error(w, "failed to create token", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"token": token})
	}).Methods("POST")

	r.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		var req loginRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "invalid request", http.StatusBadRequest)
			return
		}
		if req.Email == "" || req.Password == "" {
			http.Error(w, "email and password required", http.StatusBadRequest)
			return
		}

		id, hashed, err := models.GetUserByEmail(db, req.Email)
		if err != nil {
			http.Error(w, "invalid credentials", http.StatusUnauthorized)
			return
		}

		if err := bcrypt.CompareHashAndPassword([]byte(hashed), []byte(req.Password)); err != nil {
			http.Error(w, "invalid credentials", http.StatusUnauthorized)
			return
		}

		token, err := auth.CreateToken(id, jwtSecret)
		if err != nil {
			http.Error(w, "failed to create token", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"token": token})
	}).Methods("POST")

	return r
}
