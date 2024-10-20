import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get the id from route
import { ToastContainer } from 'react-toastify';
import { useFetchBooks } from '../hooks/useFetchBooks';

const BookDetails = () => {
    const { id } = useParams(); // Capture the book id from the route
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { books, loading, error } = useFetchBooks();

    // Filter the book by id from the fetched books array
    const book = books?.find((book) => book.id === parseInt(id));

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading book</div>;
    if (!book) return <div>No book found for ID: {id}</div>;

    const { title, authors, bookshelves, formats } = book;

    return (
        <div className="relative w-[90%] lg:w-[40%] mx-auto my-10">
            <div className="bg-white shadow-md p-4 rounded-lg h-auto flex flex-col justify-between border border-[var(--border-color)] pb-2">

                {/* Display book cover */}
                <img
                    src={formats['image/jpeg']} // Book cover image URL
                    alt={title}
                    className="w-full h-[250px] object-full rounded-lg mb-4"
                />

                <div className="flex-1">
                    <h3 className="text-[var(--primary-color)] text-lg font-semibold leading-6">
                        Title:
                        <span className="font-normal pl-2">{title}</span>
                    </h3>

                    <p className="text-[var(--primary-color)] font-semibold">
                        Author Name:
                        <span className="font-normal pl-2">
                            {authors.map((author) => author.name).join(', ')}
                        </span>
                    </p>

                    <p className="text-[var(--primary-color)] font-semibold">
                        Genre:
                        <span className="font-normal pl-2">
                            {bookshelves.slice(0, 2).join(', ')} {/* Displaying first 2 genres */}
                        </span>
                    </p>

                    <p className="text-[var(--primary-color)] font-semibold">
                        ID:
                        <span className="font-normal pl-2">{id}</span>
                    </p>
                </div>
            </div>

            {/* Toast notification container */}
            <ToastContainer />
        </div>
    )
}

export default BookDetails;