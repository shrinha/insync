package db

import (
	"database/sql"
	"log"

	config "insync/user-service/configs"

	_ "github.com/lib/pq" // Postgres driver
)

// Connect opens a DB connection using values from the provided config.
// It returns a *sql.DB which the caller must Close().
func Connect(cfg *config.Config) *sql.DB {
	conn := cfg.ConnString()
	db, err := sql.Open("postgres", conn)
	if err != nil {
		log.Fatalf("Failed to open DB: %v", err)
	}

	if err := db.Ping(); err != nil {
		log.Fatalf("Failed to ping DB: %v", err)
	}

	log.Println("Connected to PostgreSQL via socket/host", cfg.DBSocket)

	// Ensure users table exists (simple migration)
	usersTable := `CREATE TABLE IF NOT EXISTS users (
		id TEXT PRIMARY KEY,
		email TEXT UNIQUE NOT NULL,
		password TEXT NOT NULL,
		created_at TIMESTAMP NOT NULL
	);`
	if _, err := db.Exec(usersTable); err != nil {
		log.Fatalf("Failed to ensure users table: %v", err)
	}

	return db
}
