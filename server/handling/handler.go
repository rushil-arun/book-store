package handling

import (
	"github.com/go-chi/chi"
	"github.com/rushil-arun/book-store/server/book"
)

type BookHandler struct {
	store *book.BookStore
}

func NewBookHandler(store *book.BookStore) *BookHandler {
	return &BookHandler{
		store: store,
	}
}

func (h *BookHandler) Routes() chi.Router {
	r := chi.NewRouter()

	r.Get("/", h.List)
	r.Post("/", h.Create)

	r.Route("/{bookID}", func(rc chi.Router) {
		rc.Get("/", h.Get)
		rc.Put("/", h.Update)
		rc.Delete("/", h.Delete)
	})

	return r
}
