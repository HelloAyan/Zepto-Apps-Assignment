import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useFetchBooks } from '../hooks/useFetchBooks';

const SingleBook = () => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { books, loading, error } = useFetchBooks();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading books</div>;

    return (
        <div className="relative w-[90%] mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => {
                const { id, title, authors, bookshelves, formats } = book;

                return (
                    <div key={id} className="bg-white shadow-md p-4 rounded-lg h-auto flex flex-col justify-between border border-[var(--border-color)] pb-2">
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
                );
            })}

        </div>
    );
};

export default SingleBook;
