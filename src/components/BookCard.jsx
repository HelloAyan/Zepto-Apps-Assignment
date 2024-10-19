import React from 'react';
import { FaHeart } from 'react-icons/fa'; // Import heart icon from react-icons
import { GoHeart } from 'react-icons/go';

const BookCard = ({ book }) => {
    return (
        <div className="relative w-full mx-auto">
            <GoHeart className="absolute bottom-2 right-2 text-red-500 text-xl cursor-pointer" />
            <div className="bg-white shadow-md p-4 rounded-lg h-[360px] flex flex-col justify-between border border-[var(--border-color)] pb-2">
                {book.formats["image/jpeg"] && (
                    <img
                        src={book.formats["image/jpeg"]}
                        alt={book.title}
                        className="w-full h-[150px] object-full rounded-lg mb-4"
                    />
                )}
                <div className="flex-1">
                    <h3 className=" text-[var(--primary-color)] text-lg font-semibold leading-6">
                        Title:
                        <span className="font-normal pl-2">{book.title}</span>
                    </h3>
                    <p className="text-[var(--primary-color)] font-semibold">
                        Author Name:
                        <span className="font-normal pl-2">
                            {book.authors.map((author) => author.name).join(', ')}
                        </span>
                    </p>
                    <p className="text-[var(--primary-color)] font-semibold">
                        Genre:
                        <span className="font-normal pl-2">
                            {book.subjects.slice(0, 1).join(', ').length > 40
                                ? book.subjects.slice(0, 1).join(', ').substring(0, 40) + '...'
                                : book.subjects.slice(0, 1).join(', ')}
                        </span>
                    </p>
                    <p className="text-[var(--primary-color)] font-semibold">
                        ID:
                        <span className="font-normal pl-2">{book.id}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
