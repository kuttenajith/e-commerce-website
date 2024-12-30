import React from "react";
import Slider from "react-slick";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Arrow = ({ onClick, direction }) => (
    <button
        onClick={onClick}
        className={`absolute top-1/2 transform -translate-y-1/2 ${direction === "left" ? "left-4" : "right-4"
            } text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80`}
    >
        {direction === "left" ? <AiOutlineLeft size={20} /> : <AiOutlineRight size={20} />}
    </button>
);

const Carousel = ({ products }) => {
    const navigate = useNavigate();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <Arrow direction="right" />,
        prevArrow: <Arrow direction="left" />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="relative">
            <Slider {...settings}>
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="p-4 cursor-pointer"
                        onClick={() => navigate(`/products/${product.id}`)}
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-40 object-contain"
                        />
                        <p className="text-center font-semibold mt-2">{product.title}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
