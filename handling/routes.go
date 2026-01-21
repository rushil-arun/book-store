package handling

import (
	"net/http"

	"github.com/rushil-arun/book-store/book"
	"github.com/rushil-arun/book-store/responses"
)

func (h *BookHandler) Get(w http.ResponseWriter, r *http.Request) {
	book := r.Context().Value("book").(book.Book)
	responses.ResponseJSON(w, http.StatusOK, book)
}

func (h *BookHandler) List(w http.ResponseWriter, r *http.Request) {
	books := h.store.GetAll()
	responses.ResponseJSON(w, http.StatusOK, books)
}
