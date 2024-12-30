import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex justify-center mt-6">
            {currentPage > 1 && (
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className="px-4 py-2 bg-gray-300 rounded-l hover:bg-gray-400"
                >
                    Prev
                </button>
            )}
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 ${page === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 hover:bg-gray-400"
                        }`}
                >
                    {page}
                </button>
            ))}
            {currentPage < totalPages && (
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className="px-4 py-2 bg-gray-300 rounded-r hover:bg-gray-400"
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default Pagination;
