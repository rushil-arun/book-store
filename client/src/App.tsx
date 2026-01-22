import React from 'react';
import { BookProvider } from './context/BookContext';
import BookList from './components/BookList';

function App() {
  return (
    <BookProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Book Store</h1>
        <BookList />
      </div>
    </BookProvider>
  );
}

export default App;
