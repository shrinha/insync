package models

import (
	"database/sql"
	"fmt"
	"time"
)

// CreateUser inserts a new user (expects password already hashed) and returns the generated id.
func CreateUser(db *sql.DB, email, hashedPassword string) (string, error) {
	var newID int
	err := db.QueryRow(`INSERT INTO users (email, password_hash, created_at) VALUES ($1, $2, $3) RETURNING id`, email, hashedPassword, time.Now()).Scan(&newID)
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("%d", newID), nil
}

// GetUserByEmail returns user id and hashed password for the given email.
func GetUserByEmail(db *sql.DB, email string) (string, string, error) {
	var id int
	var hashed string
	row := db.QueryRow(`SELECT id, password_hash FROM users WHERE email = $1`, email)
	if err := row.Scan(&id, &hashed); err != nil {
		return "", "", err
	}
	return fmt.Sprintf("%d", id), hashed, nil
}
