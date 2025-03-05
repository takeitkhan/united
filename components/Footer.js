"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaChevronRight,
  FaChevronLeft,
  FaFacebookF,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaWhatsappSquare,
  FaTimes
} from "react-icons/fa";
import axiosInstance from "@/helpers/axiosInstance";
import { getMetaValueByMetaName } from '@/helpers/metaHelpers';

const Footer = () => {
  const [gallery, setGallery] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false); // Full-screen state
  const [currentIndex, setCurrentIndex] = useState(0); // Current image index

  const [menus, setMenus] = useState([]);
  const [settings, setSettings] = useState(null);


  // Fetch gallery data from API
  useEffect(() => {

    // Fetch menu
    const menuRes = axiosInstance.get("/menus?menu=3").then(response => {
      setMenus(response.data.data.items);
    })
      .catch(error => {
        console.error('Error fetching settings:', error);
      });

    axiosInstance.get('/frontend/settings')
      .then(response => {
        setSettings(response.data);
      })
      .catch(error => {
        console.error('Error fetching settings:', error);
      });

    const fetchGallery = async () => {
      try {
        const res = await axiosInstance.get("/posts?term_type=gallery");
        setGallery(res.data.data); // Set the gallery data
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchGallery();
  }, []);

  // Get social links dynamically with fallback to '#'
  const facebookLink = getMetaValueByMetaName(settings, 'facebook_url') || '#';
  const youtubeLink = getMetaValueByMetaName(settings, 'youtube_url') || '#';
  const linkedinLink = getMetaValueByMetaName(settings, 'linkedin_url') || '#';
  const instagramLink = getMetaValueByMetaName(settings, 'instagram_url') || '#';
  const whatsappLink = getMetaValueByMetaName(settings, 'whatsapp_url') || '#';
  // Limiting gallery display to 4 images
  const galleryLimit = gallery.slice(0, 8); // Get only first 3 images

  // Open full-screen viewer
  const openFullscreen = (index) => {
    setCurrentIndex(index);
    setIsFullscreen(true);
  };

  // Close full-screen viewer
  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  // Show next image
  const showNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === gallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Show previous image
  const showPrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? gallery.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-footerBg text-white py-8 px-3 md:px-0">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="md:text-xl font-semibold text-lg capitalize"> Navigation</h2>
          <div className="flex flex-col gap-6 mt-5">
            {menus.map((item) => (
              <Link key={item?.id} href={item.link} className="flex items-center gap-2 text-textNavColor text-sm">
                <FaChevronRight className="text-sm" /> {item.label}
              </Link>              
            ))}
          </div>
        </div>

        <div className="mt-8 md:mt-0">
          <h2 className="md:text-xl font-semibold text-lg">Connect with us</h2>
          <div className="flex gap-5 mt-5">
            <Link href={facebookLink} className="bg-facebookBg p-1.5 rounded-full text-white">
              <FaFacebookF />
            </Link>
            <Link href={youtubeLink} className="bg-youtubeBg p-1.5 rounded-full text-white">
              <FaYoutube />
            </Link>
            <Link href={linkedinLink} className="bg-linkedinBg p-1.5 rounded-full text-white">
              <FaLinkedin />
            </Link>
            <Link href={instagramLink} className="bg-instagramBg p-1.5 rounded-full text-white">
              <FaInstagram />
            </Link>
            <Link href={whatsappLink} className="bg-whatsappBg p-1.5 rounded-full text-white">
              <FaWhatsappSquare />
            </Link>
          </div>
        </div>

        {/* Gallery Section with 'See More' Option */}
        <div className="grid grid-cols-4 gap-4">
          {galleryLimit.map((post, index) => (
            <div key={post.id}>
              <div className="border rounded overflow-hidden">
                <Image
                  src={post.featured_image}
                  alt={post.name || "Gallery Image"}
                  width={300}
                  priority
                  height={300}
                  className="w-full cursor-pointer"
                  onClick={() => openFullscreen(index)} // Open fullscreen on click
                />
              </div>
            </div>
          ))}

          {/* 'See More' Button */}
          {/* {gallery.length > 4 && (
            <div className="flex justify-center items-center">
              <Link
                href="/gallery"
                className="text-white bg-navBg px-4 py-2 rounded-md text-center border border-gray-50 text-sm"
              >
                View All
              </Link>
            </div>
          )} */}
        </div>
      </div>

      <div className="w-full h-0.5 bg-gray-800 mt-12"></div>

      <div className="container mx-auto mb-12 md:mb-0 mt-5 text-textNavColor">
        <div className="text-sm text-center">
          <p>Copyright © 2025 United Machinery Bangladesh. All Rights Reserved.</p>
          <h2>Developed By <Link className="text-blue-400" href={`https://mathmozo.com`} target="_blank">Mathmozo IT</Link></h2>
        </div>
      </div>

      {/* Full-screen image viewer */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center">
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={closeFullscreen}
          >
            <FaTimes />
          </button>
          <button
            className="absolute left-5 text-white text-3xl"
            onClick={showPrevImage}
          >
            <FaChevronLeft />
          </button>
          <div className="max-w-3xl">
            <Image
              src={gallery[currentIndex].featured_image}
              alt={gallery[currentIndex].name || "Gallery Image"}
              width={800}
              height={800}
              className="w-full h-auto"
              priority
            />
            {/* <p className="text-center text-white mt-4">{gallery[currentIndex].name}</p> */}
          </div>
          <button
            className="absolute right-5 text-white text-3xl"
            onClick={showNextImage}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Footer;
