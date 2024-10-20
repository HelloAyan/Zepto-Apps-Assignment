import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { GoHeart } from 'react-icons/go';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookCard = ({ book }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const isBookWishlisted = wishlist.some((item) => item.id === book.id);
        setIsWishlisted(isBookWishlisted);
    }, [book.id]);

    const toggleWishlist = () => {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        if (isWishlisted) {
            // Remove book from wishlist
            wishlist = wishlist.filter((item) => item.id !== book.id);
            toast.error("Removed from Wishlist", { position: "bottom-right" });
        } else {
            // Add book to wishlist
            wishlist.push(book);
            toast.success("Added to Wishlist", { position: "bottom-right" });
        }

        // Save updated wishlist to local storage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setIsWishlisted(!isWishlisted);
    };

    return (
        <div className="relative w-full mx-auto">
            <div className='absolute bottom-2 right-2'>
                {isWishlisted ? (
                    <FaHeart
                        className="text-red-500 text-xl cursor-pointer"
                        onClick={toggleWishlist}
                    />
                ) : (
                    <GoHeart
                        className="text-red-500 text-xl cursor-pointer"
                        onClick={toggleWishlist}
                    />
                )}
            </div>

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

            {/* Toast notification container */}
            <ToastContainer />
        </div>
    );
};

export default BookCard;
