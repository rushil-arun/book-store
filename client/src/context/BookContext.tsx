import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book, getBooks, createBook, updateBook, deleteBook } from '../services/api';

interface BookContextType {
  books: Book[];
  loading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
  addBook: (book: Omit<Book, 'id'>) => Promise<void>;
  editBook: (id: string, book: Omit<Book, 'id'>) => Promise<void>;
  removeBook: (id: string) => Promise<void>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (book: Omit<Book, 'id'>) => {
    try {
      const newBook = await createBook(book);
      setBooks(prev => [...prev, newBook]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add book');
    }
  };

  const editBook = async (id: string, book: Omit<Book, 'id'>) => {
    try {
      const updatedBook = await updateBook(id, book);
      setBooks(prev => prev.map(b => b.id === id ? updatedBook : b));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update book');
    }
  };

  const removeBook = async (id: string) => {
    try {
      await deleteBook(id);
      setBooks(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete book');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{ books, loading, error, fetchBooks, addBook, editBook, removeBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) throw new Error('useBooks must be used within BookProvider');
  return context;
};