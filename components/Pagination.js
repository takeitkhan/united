import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handleClick = (page) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex py-3">
            <nav>
                <ul className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handleClick(index + 1)}
                                className={`px-2 py-0 rounded ${currentPage === index + 1 ? 'bg-navBg text-white' : 'bg-gray-200'}`}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
