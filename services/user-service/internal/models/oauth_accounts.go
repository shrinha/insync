package models

import "time"

type OAuthAccount struct {
	ID         string    `db:"id"`
	UserID     string    `db:"user_id"`
	Provider   string    `db:"provider"`    // e.g., google, zoom, github
	ProviderID string    `db:"provider_id"` // provider’s unique user id
	CreatedAt  time.Time `db:"created_at"`
}
