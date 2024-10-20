import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <nav ref={navRef} className="bg-sky-700 relative">
            <div className="container mx-auto flex justify-between items-center pl-10 pr-6 lg:pr-52">
                {/* Logo */}
                <div className="text-white text-lg font-bold">
                    <Link to="/" className="hover:text-gray-200">
                        Zepto Apps
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="block lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center text-white focus:outline-none"
                    >
                        {isOpen ? (
                            // Cross icon when menu is open
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            // Hamburger icon when menu is closed
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex lg:items-center space-x-6 text-white">
                    <Link to="/" className="hover:text-gray-200">Home</Link>
                    <Link to="/wishlist" className="hover:text-gray-200">Wishlist</Link>
                </div>
            </div>

            {/* Mobile Menu Popup */}
            {isOpen && (
                <div className="lg:hidden absolute top-0 left-0 w-full h-[150px] bg-sky-700 z-50 flex flex-col justify-between items-center p-4">
                    {/* Close button */}
                    <div className="w-full flex justify-end">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white focus:outline-none"
                        >
                            {/* Close icon */}
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Menu items */}
                    <div className="space-y-6 text-white text-center">
                        <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-gray-200 text-xl">Home</Link>
                        <Link to="/wishlist" onClick={() => setIsOpen(false)} className="block hover:text-gray-200 text-xl">Wishlist</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
