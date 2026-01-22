import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Book } from '@/services/api';

interface BookFormProps {
  onSubmit: (book: Omit<Book, 'id'>) => void;
  initialBook?: Book;
  onCancel?: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, initialBook, onCancel }) => {
  const [title, setTitle] = useState(initialBook?.title || '');
  const [author, setAuthor] = useState(initialBook?.author || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, author });
    if (!initialBook) {
      setTitle('');
      setAuthor('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <Button type="submit">{initialBook ? 'Update' : 'Add'} Book</Button>
      {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
    </form>
  );
};

export default BookForm;