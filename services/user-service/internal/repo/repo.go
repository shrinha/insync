package repo

import "context"

// UserRepo defines DB operations related to users.
type UserRepo interface {
	// CreateUser inserts a new user and returns the generated id as a string.
	CreateUser(ctx context.Context, email, hashedPassword string) (string, error)
	GetUserByEmail(ctx context.Context, email string) (id string, hashedPassword string, err error)
}
