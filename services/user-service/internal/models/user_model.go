package models

import (
	"database/sql"
	"errors"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID        string    `db:"id"`
	Email     string    `db:"email"`
	Password  string    `db:"password"`
	CreatedAt time.Time `db:"created_at"`
}

// CreateUser inserts a new user with hashed password. Expects caller to provide a unique ID (e.g., uuid).
func CreateUser(db *sql.DB, id, email, password string) error {
	// hash password
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	_, err = db.Exec("INSERT INTO users (id, email, password, created_at) VALUES ($1, $2, $3, $4)", id, email, string(hashed), time.Now())
	return err
}

// GetUserByEmail returns id, hashed password for the given email.
func GetUserByEmail(db *sql.DB, email string) (string, string, error) {
	var id string
	var hashed string
	row := db.QueryRow("SELECT id, password FROM users WHERE email=$1", email)
	if err := row.Scan(&id, &hashed); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return "", "", sql.ErrNoRows
		}
		return "", "", err
	}
	return id, hashed, nil
}
