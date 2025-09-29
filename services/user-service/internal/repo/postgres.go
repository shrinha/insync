package repo

import (
	"context"
	"database/sql"
	"fmt"
	"time"
)

type pgRepo struct {
	db *sql.DB
}

// NewPostgresRepo returns a UserRepo backed by Postgres.
func NewPostgresRepo(db *sql.DB) UserRepo {
	return &pgRepo{db: db}
}

func (p *pgRepo) CreateUser(ctx context.Context, email, hashedPassword string) (string, error) {
	// Insert and return the generated integer id
	var newID int
	err := p.db.QueryRowContext(ctx, `INSERT INTO users (email, password_hash, created_at) VALUES ($1,$2,$3) RETURNING id`, email, hashedPassword, time.Now()).Scan(&newID)
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("%d", newID), nil
}

func (p *pgRepo) GetUserByEmail(ctx context.Context, email string) (string, string, error) {
	var id int
	var hashed string
	row := p.db.QueryRowContext(ctx, `SELECT id, password_hash FROM users WHERE email = $1`, email)
	if err := row.Scan(&id, &hashed); err != nil {
		return "", "", err
	}
	return fmt.Sprintf("%d", id), hashed, nil
}
