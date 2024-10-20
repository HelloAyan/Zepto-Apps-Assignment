import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlistItems(wishlist);
    }, []);

    const removeFromWishlist = (bookId) => {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist = wishlist.filter((item) => item.id !== bookId);

        // Update local storage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setWishlistItems(wishlist);

        // Show toast notification
        toast.error("Removed from Wishlist", { position: "bottom-right" });
    };

    return (
        <div className="w-[80%] h-auto mx-auto my-8">
            <h1 className="text-2xl font-bold text-[var(--primary-color)] text-center mb-4">Your Wishlist</h1>
            {wishlistItems.length === 0 ? (
                <p>No items in your wishlist yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistItems.map((book) => (
                        <div key={book.id} className="bg-white shadow-md p-4 rounded-lg relative">
                            <img
                                src={book.formats["image/jpeg"]}
                                alt={book.title}
                                className="w-full h-[150px] object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-lg font-semibold">{book.title}</h3>
                            <p>Author: {book.authors.map(author => author.name).join(', ')}</p>
                            <p>ID: {book.id}</p>


                            <FaHeart
                                className="text-red-500 text-xl cursor-pointer absolute bottom-2 right-2"
                                onClick={() => removeFromWishlist(book.id)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Toast notification container */}
            <ToastContainer />
        </div>
    )
}

export default Wishlist;