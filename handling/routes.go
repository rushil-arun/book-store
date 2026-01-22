package handling

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/rushil-arun/book-store/book"
	"github.com/rushil-arun/book-store/responses"
)

func (h *BookHandler) Get(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "bookID")
	book, ok := h.store.Get(id)
	if ok {
		responses.ResponseJSON(w, http.StatusOK, book)
		return
	}
	responses.ResponseError(w, http.StatusNotFound, "Book with specified ID doesn't exist.")
}

func (h *BookHandler) List(w http.ResponseWriter, r *http.Request) {
	books := h.store.GetAll()
	responses.ResponseJSON(w, http.StatusOK, books)
}

func (h *BookHandler) Create(w http.ResponseWriter, r *http.Request) {
	var book book.Book
	err := json.NewDecoder(r.Body).Decode(&book)
	if err != nil {
		responses.ResponseError(w, http.StatusBadRequest, "Invalid Create Request Body.")
		return
	}

	if book.Author == "" || book.Title == "" {
		responses.ResponseError(w, http.StatusBadRequest, "Invalid Book Request Body.")
		return
	}

	created := h.store.Create(book)
	responses.ResponseJSON(w, http.StatusCreated, created)
}

func (h *BookHandler) Update(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "bookID")
	var book book.Book
	err := json.NewDecoder(r.Body).Decode(&book)
	if err != nil {
		responses.ResponseError(w, http.StatusBadRequest, "Invalid Update Request Body.")
		return
	}
	updated, ok := h.store.Update(id, book)
	if !ok {
		responses.ResponseError(w, http.StatusNotFound, "Book with specified ID not found.")
		return
	}
	responses.ResponseJSON(w, http.StatusOK, updated)

}

func (h *BookHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "bookID")
	ok := h.store.Delete(id)
	if !ok {
		responses.ResponseError(w, http.StatusNotFound, "Book with specificed ID doesn't exist.")
		return
	}
	responses.ResponseJSON(w, http.StatusNoContent, []byte(""))
}
