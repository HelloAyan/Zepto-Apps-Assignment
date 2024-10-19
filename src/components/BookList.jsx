import { useState } from 'react';
import { useFetchBooks } from '../hooks/useFetchBooks';
import BookCard from './BookCard';
import Loader from './Loader';

const BookList = () => {
    const { books, loading, error } = useFetchBooks();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;


    const totalPages = Math.ceil(books.length / itemsPerPage);


    const indexOfLastBook = currentPage * itemsPerPage;
    const indexOfFirstBook = indexOfLastBook - itemsPerPage;

    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    console.log('list of books', books)

    // Pagination handler
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='w-[95%] md:w-[90%] lg:w-[70%] mx-auto my-8'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} hover:bg-blue-700 transition`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BookList;
