export const API_BASE = 'http://localhost:8080/api';

export interface Book {
  id: string;
  title: string;
  author: string;
}

export const getBooks = async (): Promise<Book[]> => {
  const res = await fetch(`${API_BASE}/books`);
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
};

export const createBook = async (book: Omit<Book, 'id'>): Promise<Book> => {
  const res = await fetch(`${API_BASE}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error('Failed to create book');
  return res.json();
};

export const updateBook = async (id: string, book: Omit<Book, 'id'>): Promise<Book> => {
  const res = await fetch(`${API_BASE}/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error('Failed to update book');
  return res.json();
};

export const deleteBook = async (id: string): Promise<void> => {
  const res = await fetch(`${API_BASE}/books/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete book');
};