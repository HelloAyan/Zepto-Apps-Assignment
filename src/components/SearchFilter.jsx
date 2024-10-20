import React, { useState, useEffect } from 'react';
import { useFetchBooks } from '../hooks/useFetchBooks';

const SearchFilter = () => {
    const { books, loading, error } = useFetchBooks();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);

    // Use effect to filter books when the search term changes
    useEffect(() => {
        if (books.length > 0) {
            const filtered = books.filter((book) =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredBooks(filtered);
        }
    }, [searchTerm, books]);

    if (loading) {
        return <div>Loading books...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search books by title"
                className="border p-2 rounded-lg w-full mb-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Display filtered books */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <div key={book.id} className="p-4 bg-white shadow-md rounded-lg">
                            <img
                                src={book.formats['image/jpeg']}
                                alt={book.title}
                                className="w-full h-[200px] object-cover rounded mb-4"
                            />
                            <h3 className="text-lg font-semibold">
                                {book.title.length > 100
                                    ? `${book.title.substring(0, 100)}...`
                                    : book.title}
                            </h3>
                            <p className="text-sm">
                                Author: {book.authors.length > 0 ? book.authors[0].name : 'Unknown'}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No books found matching your search term.</p>
                )}
            </div>
        </div>
    )
}

export default SearchFilter