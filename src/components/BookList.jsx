import { useFetchBooks } from '../hooks/useFetchBooks';
import BookCard from './BookCard';

const BookList = () => {
    const { books, loading, error } = useFetchBooks();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    );
};

export default BookList;
