package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
)

// newReverseProxy builds a reverse proxy for the provided target string.
func newReverseProxy(target string) (*httputil.ReverseProxy, error) {
	u, err := url.Parse(target)
	if err != nil {
		return nil, err
	}
	proxy := httputil.NewSingleHostReverseProxy(u)
	// Ensure Host is set for backend
	proxy.Director = func(req *http.Request) {
		req.URL.Scheme = u.Scheme
		req.URL.Host = u.Host
	}
	return proxy, nil
}

// addProxyRoutes wires simple proxy endpoints to the mux.
func addProxyRoutes(mux *http.ServeMux, cfg Config) error {
	// Auth (no auth required)
	userProxy, err := newReverseProxy(cfg.UserServiceURL)
	if err != nil {
		return err
	}
	mux.Handle("/auth/", http.StripPrefix("/auth", userProxy))

	// Protected API proxied to other service with middleware applied in main
	otherProxy, err := newReverseProxy(cfg.OtherServiceURL)
	if err != nil {
		return err
	}
	mux.Handle("/api/", otherProxy)

	log.Printf("proxy routes configured: auth->%s api->%s", cfg.UserServiceURL, cfg.OtherServiceURL)
	return nil
}
