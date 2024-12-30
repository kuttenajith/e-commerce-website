import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useWishlist } from "../context/WishlistProvider";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

    const isInWishlist = wishlist.some((item) => item.id === product.id);

    const toggleWishlist = () => {
        isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
    };

    return (
        <div
            className="relative p-4 bg-white dark:bg-gray-900 rounded shadow-lg hover:shadow-xl 
            transform hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => navigate(`/products/${product.id}`)}
        >
            <img src={product.images} alt={product.title} className="w-full h-48 object-contain" />
            <h3 className="text-lg font-bold mt-2">{product.title}</h3>
            <p className="text-primary font-semibold">${product.price}</p>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist();
                }}
                className="absolute top-2 right-2 text-xl"
            >
                {isInWishlist ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}
            </button>
        </div>
    );

};

export default ProductCard;
