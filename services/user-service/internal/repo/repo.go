package repo

import "context"

// UserRepo defines DB operations related to users.
type UserRepo interface {
	CreateUser(ctx context.Context, id, email, hashedPassword string) error
	GetUserByEmail(ctx context.Context, email string) (id string, hashedPassword string, err error)
}
