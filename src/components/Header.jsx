import React from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header
            className={`p-4 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-primary text-lime-600"
                } shadow-md sticky top-0 z-50`}
        >
            <nav className="container responsive-header mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    Shopify
                </Link>
                <div className="flex items-center space-x-4">
                    <Link to="/products" className="hover:underline">
                        Products
                    </Link>
                    <Link to="/wishlist" className="hover:underline">
                        Wishlist
                    </Link>
                    <Link to="/cart" className="hover:underline">
                        Cart
                    </Link>
                    <button
                        onClick={toggleTheme}
                        className="px-3 py-1 bg-secondary text-white rounded hover:bg-opacity-80"
                    >
                        {theme === "dark" ? <BsSun size={20} /> : <BsMoon size={20} />}
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
