package book

import (
	"fmt"
	"time"
)

func (s *BookStore) GetAll() []Book {
	s.mu.RLock()

	var books []Book = make([]Book, 0, len(s.books))
	for _, book := range s.books {
		books = append(books, book)
	}
	s.mu.RUnlock()
	return books
}

func (s *BookStore) Get(id string) (Book, bool) {
	s.mu.RLock()
	book, ok := s.books[id]
	s.mu.RUnlock()
	return book, ok
}

func (s *BookStore) Create(book Book) Book {
	s.mu.Lock()
	book.ID = fmt.Sprintf("%d", s.nextID)
	s.nextID++
	book.CreatedAt = time.Now()
	book.UpdatedAt = time.Now()
	s.books[book.ID] = book
	s.mu.Unlock()
	return book
}

func (s *BookStore) Update(id string, book Book) (Book, bool) {
	s.mu.Lock()

	existing, ok := s.books[id]
	if ok {
		book.ID = id
		book.CreatedAt = existing.CreatedAt
		book.UpdatedAt = time.Now()
		s.books[id] = book
		s.mu.Unlock()
	}
	s.mu.Unlock()
	return Book{}, false
}

func (s *BookStore) Delete(id string) bool {
	s.mu.Lock()
	_, ok := s.books[id]
	if ok {
		delete(s.books, id)
		s.mu.Unlock()
		return true
	}
	s.mu.Unlock()
	return false
}
