// components/Shared/Tooltip.js
import React from "react";

const Tooltip = ({ message }) => {
  return (
    <span
      className="hidden md:block absolute top-full mt-2 px-2 py-1 text-sm text-white bg-gray-700 
    rounded-md shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100
     whitespace-nowrap"
    >
      {message}
    </span>
  );
};

export default Tooltip;
