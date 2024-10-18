import { useState, useEffect } from 'react';
import { fetchBooks } from '../api/booksAPI';

export const useFetchBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const data = await fetchBooks();
                setBooks(data.results);
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
