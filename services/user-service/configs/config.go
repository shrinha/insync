package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

// Config holds service configuration values.
type Config struct {
	Port string // HTTP port to listen on

	// DB configuration. We support connecting via unix domain socket (host = "/tmp")
	DBUser   string
	DBName   string
	DBSocket string // directory containing the socket, e.g. "/tmp"
	DBPort   string
	SSLMode  string
	DBPass   string

	JwtSecret string
}

// Load reads configuration from environment variables with sensible defaults.
// For this workspace the DB defaults match: user=pankaj, dbname=postgres, socket=/tmp, port=5432
func Load() *Config {
	// Try to load .env file in the current working directory; ignore error if it doesn't exist.
	_ = godotenv.Load()

	return &Config{
		Port: getEnv("PORT", "8080"),

		DBUser:   getEnv("DB_USER", getEnv("POSTGRES_USER", "user")),
		DBName:   getEnv("DB_NAME", getEnv("POSTGRES_DB", "postgres")),
		DBSocket: getEnv("DB_SOCKET", "/tmp"),
		DBPort:   getEnv("DB_PORT", "5432"),
		SSLMode:  getEnv("DB_SSLMODE", "disable"),
		DBPass:   getEnv("DB_PASSWORD", ""),

		JwtSecret: getEnv("JWT_SECRET", "supersecretkey"),
	}
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}

// ConnString returns a lib/pq-compatible connection string that uses a unix
// domain socket when DBSocket is set. Example:
// host=/tmp user=pankaj dbname=postgres port=5432 sslmode=disable
func (c *Config) ConnString() string {
	// lib/pq accepts "host=/path/to/socket" to connect over unix sockets.
	// Include password only when provided.
	if c.DBPass != "" {
		return fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s", c.DBSocket, c.DBUser, c.DBPass, c.DBName, c.DBPort, c.SSLMode)
	}
	return fmt.Sprintf("host=%s user=%s dbname=%s port=%s sslmode=%s", c.DBSocket, c.DBUser, c.DBName, c.DBPort, c.SSLMode)
}
