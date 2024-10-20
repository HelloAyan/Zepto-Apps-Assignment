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
        <nav ref={navRef} className="bg-sky-700">
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
                    <Link to="#" className="hover:text-gray-200">Services</Link>
                    <Link to="#" className="hover:text-gray-200">Contact</Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden">
                    <div className="space-y-4 p-4 text-white">
                        <Link to="/" className="block hover:text-gray-200">Home</Link>
                        <Link to="/wishlist" className="block hover:text-gray-200">Wishlist </Link>
                        <Link to="#" className="block hover:text-gray-200">Services</Link>
                        <Link to="#" className="block hover:text-gray-200">Contact</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
