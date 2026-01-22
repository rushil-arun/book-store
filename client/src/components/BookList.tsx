import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBooks } from '@/context/BookContext';
import { Book } from '@/services/api';
import BookForm from './BookForm';

const BookList: React.FC = () => {
  const { books, loading, error, removeBook, addBook, editBook } = useBooks();
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Books</h2>
        <Button onClick={() => setShowAdd(true)}>Add New Book</Button>
      </div>
      {books.map(book => (
        <Card key={book.id}>
          <CardHeader>
            <CardTitle>{book.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Author: {book.author}</p>
            <div className="mt-4 space-x-2">
              <Button onClick={() => setEditingBook(book)}>Edit</Button>
              <Button variant="destructive" onClick={() => removeBook(book.id)}>Delete</Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {(showAdd || editingBook) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingBook ? 'Edit Book' : 'Add New Book'}</CardTitle>
          </CardHeader>
          <CardContent>
            <BookForm
              onSubmit={async (bookData) => {
                if (editingBook) {
                  await editBook(editingBook.id, bookData);
                  setEditingBook(null);
                } else {
                  await addBook(bookData);
                  setShowAdd(false);
                }
              }}
              initialBook={editingBook || undefined}
              onCancel={() => {
                setEditingBook(null);
                setShowAdd(false);
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookList;