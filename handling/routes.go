package handling

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/rushil-arun/book-store/responses"
)

func (h *BookHandler) Get(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "bookID")
	book, ok := h.store.Get(id)
	if ok {
		responses.ResponseJSON(w, http.StatusOK, book)
	} else {
		responses.ResponseError(w, http.StatusBadRequest, "Book with specified ID doesn't exist.")
	}
}

func (h *BookHandler) List(w http.ResponseWriter, r *http.Request) {
	books := h.store.GetAll()
	responses.ResponseJSON(w, http.StatusOK, books)
}
