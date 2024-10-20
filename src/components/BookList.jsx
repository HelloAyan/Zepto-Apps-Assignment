import { useState, useEffect } from 'react';
import { useFetchBooks } from '../hooks/useFetchBooks';
import BookCard from './BookCard';
import Loader from './Loader';

const BookList = () => {
    const { books, loading, error } = useFetchBooks();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [genres, setGenres] = useState([]);
    const [previousSearches, setPreviousSearches] = useState([]);
    const itemsPerPage = 6;


    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];
        setPreviousSearches(storedSearches);
    }, []);

    // Extract unique genres/topics from API data
    useEffect(() => {
        if (books.length > 0) {
            const uniqueGenres = new Set();
            books.forEach((book) => {
                if (book.bookshelves && book.bookshelves.length > 0) {
                    book.bookshelves.forEach((shelf) => {
                        uniqueGenres.add(shelf);
                    });
                }
            });
            setGenres(['All', ...Array.from(uniqueGenres)]);
        }
    }, [books]);

    // Filter books by title and genre/topic
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedGenre === 'All' || book.bookshelves.includes(selectedGenre))
    );

    // Save the search term and results to localStorage
    useEffect(() => {
        if (searchTerm && filteredBooks.length > 0) {
            const searchItem = { term: searchTerm, results: filteredBooks.slice(0, 5) }; // Store up to 5 results
            let updatedSearches = [searchItem, ...previousSearches.filter(item => item.term !== searchTerm)];

            // Limit stored searches to 5 items
            if (updatedSearches.length > 5) updatedSearches = updatedSearches.slice(0, 5);

            localStorage.setItem('previousSearches', JSON.stringify(updatedSearches));
            setPreviousSearches(updatedSearches);
        }
    }, [searchTerm, filteredBooks]);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    // Pagination logic
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
    const indexOfLastBook = currentPage * itemsPerPage;
    const indexOfFirstBook = indexOfLastBook - itemsPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    // Pagination handler
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='w-[95%] md:w-[90%] lg:w-[70%] mx-auto my-8'>
            {/* Search and Dropdown Filter Section */}
            <div className="flex gap-y-3 lg:gap-x-10 flex-col lg:flex-row lg:justify-between items-center mb-8">
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search books by title..."
                    className="border p-2 rounded-lg w-[80%] lg:w-[70%] focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    list="previousSearches" // Datalist for previous searches
                />
                <datalist id="previousSearches" className=' bg-slate-200'>
                    {previousSearches.map((searchItem, index) => (
                        <option key={index} value={searchItem.term}>
                            {searchItem.term}
                        </option>
                    ))}
                </datalist>

                {/* Dropdown Filter */}
                <div className="relative w-[80%] lg:w-[30%]">
                    <select
                        className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                        value={selectedGenre}
                        onChange={(e) => {
                            setSelectedGenre(e.target.value);
                            setCurrentPage(1); // Reset to first page when filter changes
                        }}
                    >
                        {genres.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Book Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentBooks.length > 0 ? (
                    currentBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))
                ) : (
                    <div className='text-xl text-[var(--primary-color)]'>No books found matching your search or filter.</div>
                )}
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
