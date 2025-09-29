package repo

import (
	"context"
	"database/sql"
	"time"
)

type pgRepo struct {
	db *sql.DB
}

// NewPostgresRepo returns a UserRepo backed by Postgres.
func NewPostgresRepo(db *sql.DB) UserRepo {
	return &pgRepo{db: db}
}

func (p *pgRepo) CreateUser(ctx context.Context, id, email, hashedPassword string) error {
	_, err := p.db.ExecContext(ctx, `INSERT INTO users (id, email, password, created_at) VALUES ($1,$2,$3,$4)`, id, email, hashedPassword, time.Now())
	return err
}

func (p *pgRepo) GetUserByEmail(ctx context.Context, email string) (string, string, error) {
	var id, hashed string
	row := p.db.QueryRowContext(ctx, `SELECT id, password FROM users WHERE email = $1`, email)
	if err := row.Scan(&id, &hashed); err != nil {
		return "", "", err
	}
	return id, hashed, nil
}
