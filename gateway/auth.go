package main

import (
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret []byte

func initJWT() {
	secret := Getenv("JWT_SECRET", "dev-secret")
	jwtSecret = []byte(secret)
}

// jwtMiddleware validates JWT tokens (cookie or Bearer header) and sets X-User-Id
func jwtMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// read cookie
		var tokenStr string
		if c, err := r.Cookie("token"); err == nil {
			tokenStr = c.Value
		}
		// fallback to header
		if tokenStr == "" {
			auth := r.Header.Get("Authorization")
			if strings.HasPrefix(auth, "Bearer ") {
				tokenStr = strings.TrimPrefix(auth, "Bearer ")
			}
		}
		if tokenStr == "" {
			http.Error(w, "unauthenticated", http.StatusUnauthorized)
			return
		}
		token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
			if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, nil
			}
			return jwtSecret, nil
		})
		if err != nil || !token.Valid {
			http.Error(w, "invalid token", http.StatusUnauthorized)
			return
		}
		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			if sub, ok := claims["sub"].(string); ok {
				// forward user id to downstream service
				r.Header.Set("X-User-Id", sub)
			}
		}
		next.ServeHTTP(w, r)
	})
}
