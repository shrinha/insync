package models

import (
	"database/sql"
	"time"

	"golang.org/x/crypto/bcrypt"
)

// CreateUser inserts a new user with a hashed password.
func CreateUser(db *sql.DB, id, email, password string) error {
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	_, err = db.Exec(`INSERT INTO users (id, email, password, created_at) VALUES ($1, $2, $3, $4)`, id, email, string(hashed), time.Now())
	return err
}

// GetUserByEmail returns user id and hashed password for the given email.
func GetUserByEmail(db *sql.DB, email string) (string, string, error) {
	var id string
	var hashed string
	row := db.QueryRow(`SELECT id, password FROM users WHERE email = $1`, email)
	if err := row.Scan(&id, &hashed); err != nil {
		return "", "", err
	}
	return id, hashed, nil
}
