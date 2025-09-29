package main

import (
	"log"
	"net/http"

	config "insync/user-service/configs"
	"insync/user-service/internal/auth"
	"insync/user-service/internal/db"
	"insync/user-service/internal/handlers"
)

func main() {
	cfg := config.Load()

	// connect to db
	database := db.Connect(cfg)
	defer database.Close()

	// ensure we have a JWT secret
	jwtSecret := cfg.JwtSecret
	if jwtSecret == "" {
		s, err := auth.GenerateRandomSecret()
		if err != nil {
			log.Fatal("failed to generate jwt secret", err)
		}
		jwtSecret = s
		log.Println("generated jwt secret for runtime (not persisted)")
	}

	// setup router
	router := handlers.RegisterRoutes(cfg, database, jwtSecret)

	log.Printf("User service running on port %s", cfg.Port)
	if err := http.ListenAndServe(":"+cfg.Port, router); err != nil {
		log.Fatal(err)
	}
}
