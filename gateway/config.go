package main

import (
	"os"
)

// Getenv returns the environment variable value or a default.
func Getenv(key, def string) string {
	v := os.Getenv(key)
	if v == "" {
		return def
	}
	return v
}
