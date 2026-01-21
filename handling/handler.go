package handling

import (
	"github.com/rushil-arun/book-store/book"
)

type BookHandler struct {
	store *book.BookStore
}

func NewBookHandler(store *book.BookStore) *BookHandler {
	return &BookHandler{
		store: store,
	}
}
