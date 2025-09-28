package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "user-service up and running")
	})
	fmt.Println("Starting user-service on :8080")
	http.ListenAndServe(":8080", nil)
}
