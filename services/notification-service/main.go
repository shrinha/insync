package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
)

func main() {
	logger := logrus.New()
	logger.SetLevel(logrus.InfoLevel)

	router := mux.NewRouter()

	// Health check endpoint
	router.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Notification service is healthy"))
	}).Methods("GET")

	// Notification endpoints
	router.HandleFunc("/api/v1/notifications", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"message": "Notification service endpoints"}`))
	}).Methods("GET")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8083"
	}

	logger.Infof("Notification service starting on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
