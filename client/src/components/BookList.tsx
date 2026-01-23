import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBooks } from '@/context/BookContext';
import { Book } from '@/services/api';
import BookForm from './BookForm';

type FormMode = 'add' | 'edit' | null;

const BookList: React.FC = () => {
  const { books, loading, error, removeBook, addBook, editBook } = useBooks();
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Books</h2>
        <Button onClick={() => { setFormMode('add'); setCurrentBook(null); }}>Add New Book</Button>
      </div>
      {books.map(book => (
        <Card key={book.id}>
          <CardHeader>
            <CardTitle>{formMode === 'edit' && currentBook?.id === book.id ? 'Edit Book' : book.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {formMode === 'edit' && currentBook?.id === book.id ? (
              <BookForm
                onSubmit={async (bookData) => {
                  await editBook(currentBook.id, bookData);
                  setFormMode(null);
                  setCurrentBook(null);
                }}
                initialBook={currentBook || undefined}
                onCancel={() => {
                  setFormMode(null);
                  setCurrentBook(null);
                }}
              />
            ) : (
              <>
                <p>Author: {book.author}</p>
                <div className="mt-4 space-x-2">
                  <Button onClick={() => { setFormMode('edit'); setCurrentBook(book); }}>Edit</Button>
                  <Button variant="destructive" onClick={() => removeBook(book.id)}>Delete</Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ))}
      {formMode === 'add' && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Book</CardTitle>
          </CardHeader>
          <CardContent>
            <BookForm
              onSubmit={async (bookData) => {
                await addBook(bookData);
                setFormMode(null);
                setCurrentBook(null);
              }}
              initialBook={undefined}
              onCancel={() => {
                setFormMode(null);
                setCurrentBook(null);
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookList;