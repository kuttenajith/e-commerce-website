import React, { useState } from "react";
import { useCart } from "../context/CartProvider";
import DialogBox from "../components/DialogBox";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

const CartPage = () => {
    const { cart, removeFromCart } = useCart();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;
    const navigate = useNavigate();

    const handleRemoveClick = (item) => {
        setItemToRemove(item);
        setDialogOpen(true);
    };

    const confirmRemove = () => {
        if (itemToRemove) {
            removeFromCart(itemToRemove.id);
        }
        setDialogOpen(false);
    };

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalPages = Math.ceil(cart.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedProducts = cart.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );
    return (
        <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-800">
            <div className="flex justify-between py-3">
                <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate("/products")}>
                    Back
                </button>
                <h1 className="text-2xl font-bold text-center mb-4">Your Cart</h1>
            </div>
            {paginatedProducts.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty!</p>
            ) : (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {paginatedProducts.map((item) => (
                            <div
                                key={item.id}
                                className="p-4 bg-white dark:bg-gray-900 shadow-lg rounded hover:shadow-xl
                             transform hover:scale-105 transition duration-300"
                            >
                                <div className="cursor-pointer" onClick={() => navigate(`/products/${item.id}`)}>
                                    <img
                                        src={item.images}
                                        alt={item.title}
                                        className="w-full h-40 object-contain mb-2"
                                    />
                                    <h3 className="font-bold">{item.title}</h3>
                                    <p>${item.price}</p>
                                </div>
                                <button
                                    onClick={() => handleRemoveClick(item)}
                                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-lg font-bold text-right">
                        Total: <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            )}
            {dialogOpen && (
                <DialogBox
                    title="Confirm Remove"
                    message="Are you sure you want to remove this item from your cart?"
                    onConfirm={confirmRemove}
                    onCancel={() => setDialogOpen(false)}
                />
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default CartPage;
