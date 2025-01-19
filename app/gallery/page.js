"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "@/helpers/axiosInstance";
import { FaChevronRight, FaChevronLeft, FaTimes } from "react-icons/fa";

const GalleryPage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axiosInstance.get("/posts?term_type=gallery");
        setGallery(res.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchGallery();
  }, []);

  const openFullscreen = (index) => setCurrentIndex(index) || setIsFullscreen(true);
  const closeFullscreen = () => setIsFullscreen(false);
  const showNextImage = () => setCurrentIndex((prev) => (prev + 1) % gallery.length);
  const showPrevImage = () => setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  return (
    <section className="container mx-auto px-3 py-8">
      <h1 className="text-xl md:text-4xl font-semibold mb-4">Gallery</h1>
      {/* <div className="flex gap-2 mt-2 mb-10 text-xs md:text-sm">
        <Link href="/">Home</Link><span>/ Gallery</span>
      </div> */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map((post, index) => (
          <div key={post.id} className="border rounded overflow-hidden">
            <Image
              src={post.featured_image}
              alt={post.name || "Gallery Image"}
              width={300}
              priority
              height={300}
              className="w-full cursor-pointer"
              onClick={() => openFullscreen(index)}
            />
          </div>
        ))}
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center">
          <button className="absolute top-5 right-5 text-white text-3xl" onClick={closeFullscreen}>
            <FaTimes />
          </button>
          <button className="absolute left-5 text-white text-3xl" onClick={showPrevImage}>
            <FaChevronLeft />
          </button>
          <Image
            src={gallery[currentIndex].featured_image}
            alt={gallery[currentIndex].name || "Gallery Image"}
            width={800}
            priority
            height={800}
            className="md:w-1/2 h-auto"
          />
          <button className="absolute right-5 text-white text-3xl" onClick={showNextImage}>
            <FaChevronRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default GalleryPage;
