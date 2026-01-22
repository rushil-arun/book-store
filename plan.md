# Book-Store Project Overview

This is a Go-based REST API for a simple book store, built with the Chi HTTP router. It provides CRUD operations for books, stored in-memory.

## Architecture

- **book/**: Defines core types and logic.
  - `book.go`: `Book` struct (ID, Title, Author, ISBN, timestamps) and `BookStore` (thread-safe map-based collection with mutex).
  - `methods.go`: CRUD methods on `BookStore` (GetAll, Get, Create, Update, Delete). No methods on individual `Book` instances.

- **responses/**: Utility functions for JSON responses.
  - `responses.go`: `ResponseJSON` (general JSON response) and `ResponseError` (error JSON response).

- **handling/**: HTTP handlers and routing.
  - `handler.go`: `BookHandler` struct with `BookStore`, `NewBookHandler` constructor, and `Routes()` method setting up Chi routes (GET/POST /, GET/PUT/DELETE /{bookID}).
  - `routes.go`: Handler methods (Get, List, Create, Update, Delete) that decode JSON, call `BookStore` methods, and use `responses` for output.

- **main.go**: Server entry point.
  - Initializes `BookStore`, sets up Chi router with middleware (logger, timeout, etc.).
  - Defines `/health` endpoint.
  - Mounts book routes under `/api/books`.
  - Starts server on `localhost:3000`.

## API Endpoints

- `GET /health`: Health check.
- `GET /api/books/`: List all books.
- `POST /api/books/`: Create a book (JSON body: title, author required).
- `GET /api/books/{id}`: Get a book by ID.
- `PUT /api/books/{id}`: Update a book by ID.
- `DELETE /api/books/{id}`: Delete a book by ID.

## Notes

- In-memory storage (no persistence).
- Thread-safe via mutex in `BookStore`.
- Uses Chi for routing and middleware.
- JSON-based request/response handling.