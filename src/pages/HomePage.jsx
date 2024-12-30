import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import Spinner from "../components/Spinner";

const HomePage = () => {
    const [recentProducts, setRecentProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setRecentProducts(data.slice(0, 10));
            setLoading(false);
        };

        fetchProducts();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Recently Sold Products</h1>
            {loading ? <Spinner /> : <Carousel products={recentProducts} />}
        </div>
    );
};

export default HomePage;
