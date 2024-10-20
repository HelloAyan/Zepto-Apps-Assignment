import { useState, useEffect } from 'react';
import { fetchBooks } from '../api/booksAPI';

export const useFetchBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const localData = localStorage.getItem('booksData');
                if (localData) {
                    // If data is found in localStorage, parse and set it
                    setBooks(JSON.parse(localData));
                    setLoading(false);
                } else {
                    // Otherwise, fetch the data from API
                    const data = await fetchBooks();
                    setBooks(data.results);
                    localStorage.setItem('booksData', JSON.stringify(data.results));
                    // Save data to localStorage
                }
            } catch (error) {
                setError('Failed to fetch books');
            } finally {
                setLoading(false);
            }
        };

        getBooks();
    }, []);

    return { books, loading, error };
};
