"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/helpers/axiosInstance";

import { FaUser, FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from 'react-toastify';


const GetAQuote = ({ visible, onClose, productName, productId }) => {
  if (!visible) return null;

  const [formData, setFormData] = useState({
    subject: "Quotation Query",
    product_id: "", // Pre-populate with the productId prop
    product_name: "", // Pre-populate with the productName prop
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  // UseEffect to update product info when productName or productId changes
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      product_id: productId,
      product_name: productName,
    }));
  }, [productId, productName]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Handle form submission, e.g., send data to an API
    try {
      const response = await axiosInstance.post('/contacts/create', formData); // Replace with your API endpoint

      toast.success("Your query has been submitted", {
        position: "bottom-left", // Position toast in the bottom-left corner
      });
      onClose();
      //console.log('Response:', response.data);
      // Handle success, e.g., show a success message or redirect
    } catch (error) {
      toast.error(error.response?.data || error.message);
      // console.error('Error:', error.response?.data || error.message);
      // Handle error, e.g., show an error message
    }


  };

  return (
    <>
      <section>
        <div className="h-screen w-full bg-gray-800 left-0 top-0 z-40 bg-opacity-10 bg-fixed py-5 fixed overflow-auto">
          <form
            className="bg-white shadow-md rounded p-4 w-[90%] md:w-1/2 mx-auto relative"
            onSubmit={handleSubmit}
          >
            <span
              onClick={onClose}
              className="text-2xl absolute right-3 top-2 cursor-pointer"
            >
              <IoCloseSharp />
            </span>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-center">Get a quote</h2>
              <span className=" flex items-start justify-center text-xs font-normal">
                Product Name: {productName}
              </span>
            </div>

            {/* Hidden Fields */}
            <input
              type="hidden"
              value="Quotation Query"
              name="subject"
              required
            />
            <input
              type="hidden"
              value="NULL"
              name="product_id"
              required
            />
            <input
              type="hidden"
              value="NULL"
              name="product_name"
              required
            />

            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Name
              </label>
              <div className="flex">
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm">
                    <FaUser />
                  </span>
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className="pl-10 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                E-Mail
              </label>
              <div className="flex">
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm">
                    <IoMdMail />
                  </span>
                  <input
                    name="email"
                    type="email"
                    placeholder="E-Mail Address"
                    className="pl-10 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Phone #
              </label>
              <div className="flex">
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm">
                    <FaPhone />
                  </span>
                  <input
                    name="phone"
                    type="text"
                    placeholder="Number"
                    className="pl-10 p-2 text-sm w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Comment */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Comments or Questions
              </label>
              <textarea
                name="comment"
                placeholder="Enter your comments or questions here..."
                className="p-2 text-sm w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows="4"
                value={formData.comment}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-indigo-600 text-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default GetAQuote;