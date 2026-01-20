package book

import (
	"sync"
	"time"
)

type Book struct {
	ID          string    `json:"id"`
	Title       string    `json:"title"`
	Author      string    `json:"author"`
	ISBN        string    `json:"isbn"`
	PublishedAt time.Time `json:"published_at"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type BookStore struct {
	mu     sync.RWMutex
	books  map[string]Book
	nextID int
}

func NewBookStore() *BookStore {
	return &BookStore{
		books:  make(map[string]Book),
		nextID: 1,
	}
}
