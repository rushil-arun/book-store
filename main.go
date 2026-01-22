package main

import (
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/rushil-arun/book-store/server/book"
	"github.com/rushil-arun/book-store/server/handling"
	"github.com/rushil-arun/book-store/server/responses"
)

func cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	store := book.NewBookStore()
	r := chi.NewRouter()
	r.Use(cors)
	r.Use(middleware.Logger)
	r.Use(middleware.RealIP)
	r.Use(middleware.RequestID)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		responses.ResponseJSON(w, http.StatusOK, map[string]string{
			"status": "healthy",
			"time":   time.Now().Format(time.RFC3339),
		})
	})

	r.Route("/api", func(rc chi.Router) {
		bookHandler := handling.NewBookHandler(store)
		rc.Mount("/books", bookHandler.Routes())
	})

	addr := "localhost:8080"
	log.Printf("Server on: %s", addr)
	log.Fatal(http.ListenAndServe(addr, r))
}
