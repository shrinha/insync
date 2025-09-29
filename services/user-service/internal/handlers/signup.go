package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	config "insync/user-service/configs"
	"insync/user-service/internal/repo"

	"golang.org/x/crypto/bcrypt"
)

type signupRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// SignupHandler handles user signup requests.
func SignupHandler(cfg *config.Config, rRepo repo.UserRepo) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req signupRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "invalid request", http.StatusBadRequest)
			return
		}
		if req.Email == "" || req.Password == "" {
			http.Error(w, "email and password required", http.StatusBadRequest)
			return
		}

		// Hash password before passing to repo
		hashed, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, "failed to hash password", http.StatusInternalServerError)
			return
		}

		ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
		defer cancel()

		_, err = rRepo.CreateUser(ctx, req.Email, string(hashed))
		if err != nil {
			// Log underlying DB error for diagnostics
			log.Printf("CreateUser error for email=%s: %v", req.Email, err)
			http.Error(w, "failed to create user", http.StatusInternalServerError)
			return
		}

		// on successful signup, return a simple creation acknowledgement
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]string{"message": "user created"})
	}
}
