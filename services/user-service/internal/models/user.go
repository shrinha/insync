package models

import "time"

// User is the domain representation of a user account.
type User struct {
	ID        string    `db:"id" json:"id"`
	Email     string    `db:"email" json:"email"`
	Password  string    `db:"password" json:"-"` // stored as bcrypt hash
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}
