import React from 'react';
import { BookProvider } from './context/BookContext';
import BookList from './components/BookList';

function App() {
  return (
    <BookProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gray-900 text-white">
          <div className="px-4 py-4">
            <h1 className="text-2xl font-bold">Book</h1>
          </div>
        </header>
        <main className="container mx-auto p-4">
          <BookList />
        </main>
      </div>
    </BookProvider>
  );
}

export default App;
