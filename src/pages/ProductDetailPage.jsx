import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { cart, addToCart, removeFromCart } = useCart();
    const isInCart = cart?.some((item) => item?.id === product?.id);

    const handleCartClick = (e) => {
        e.stopPropagation();
        if (isInCart) {
            removeFromCart(product.id);
        } else {
            addToCart({ ...product, quantity: 1 });
            navigate("/cart"); // Redirect to cart page on add
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                if (!response.ok) throw new Error("Product not found.");
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <img
                src={product.images}
                alt={product.title}
                className="w-64 h-64 object-contain my-4"
            />
            <p className="text-lg">${product.price}</p>
            <p className="text-sm">{product.description}</p>
            <div className="flex justify-between">
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate("/products")}>
                    Back
                </button>
                <button
                    onClick={handleCartClick}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    {isInCart ? "Remove from Cart" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
};

export default ProductDetailPage;
