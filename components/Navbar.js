"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import unitedLogo from "./../public/Image/United.png";
import { FaAngleDown } from "react-icons/fa6";
import { FaFacebook, FaYoutube, FaLinkedin, FaInstagram, FaBars, FaTimes } from "react-icons/fa";
import axiosInstance from "@/helpers/axiosInstance";
import { getMetaValueByMetaName } from "@/helpers/metaHelpers";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [menus, setMenus] = useState([]);
  const [settings, setSettings] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [suggestions, setSuggestions] = useState([]); // State for suggestions

  // Fetch settings and menu items dynamically
  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuRes = await axiosInstance.get("/menus?menu=1");
        setMenus(menuRes.data.data.items);
        const settingsRes = await axiosInstance.get('/frontend/settings');
        setSettings(settingsRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Use helper method to get specific meta values with fallback
  const facebookLink = getMetaValueByMetaName(settings, 'facebook_url') || '#';
  const instagramLink = getMetaValueByMetaName(settings, 'instagram_url') || '#';
  const linkedinLink = getMetaValueByMetaName(settings, 'linkedin_url') || '#';
  const youtubeLink = getMetaValueByMetaName(settings, 'youtube_url') || '#';

  // Fetch suggestions based on search term
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length > 0) {
        try {
          const res = await axiosInstance.get(`/posts?term_type=product&s=${searchTerm}`);
          setSuggestions(res.data.data); // Assuming your API returns suggestions in data
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
        }
      } else {
        setSuggestions([]); // Clear suggestions when search term is empty
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  return (
    <>
      <div className="container mx-auto w-full py-3 px-3 md:px-0 z-10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center justify-between w-full">
            <div>
              <Link href={"/"}>
                <Image
                  src={unitedLogo}
                  width={150}
                  height={150}
                  priority
                  alt="united"
                  className="w-36 md:w-48"
                />
              </Link>
            </div>
            <div
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="text-2xl cursor-pointer text-gray-700 block xl:hidden"
            >
              {isNavOpen ? <FaTimes /> : <FaBars />}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative flex items-center mx-2 w-full md:block hidden"> {/* Adjust width here */}
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-50" // Set width to 100%
            />
            {suggestions.length > 0 && (
              <div className="absolute top-10 left-0 right-0 bg-white border border-gray-300 mt-1 z-20">
                {suggestions.map((suggestion) => (
                  <Link
                    key={suggestion.id}
                    href={`/products/${suggestion?.slug}`} // Adjust link as needed
                    className="block px-3 py-2 hover:bg-gray-200"
                    onClick={() => setSearchTerm("")} // Clear search term on suggestion click
                  >
                    {suggestion.name} {/* Adjust to match your suggestion structure */}
                  </Link>
                ))}
              </div>
            )}
          </div>


          {/* Dynamic Social Links */}
          <div className="xl:flex flex-col hidden w-full">
            <div className="flex items-center justify-end gap-3">
              <Link href={facebookLink} className="bg-facebookBg p-1.5 rounded-full text-white cursor-pointer hover:border border hover:border-gray-600 hover:bg-transparent hover:text-black ease-in-out duration-200 text-sm">
                <FaFacebook />
              </Link>
              <Link href={youtubeLink} className="bg-youtubeBg p-1.5 rounded-full text-white cursor-pointer hover:border border hover:border-gray-600 hover:bg-transparent hover:text-black ease-in-out duration-200">
                <FaYoutube />
              </Link>
              <Link href={linkedinLink} className="bg-linkedinBg p-1.5 rounded-full text-white cursor-pointer hover:border border hover:border-gray-600 hover:bg-transparent hover:text-black ease-in-out duration-200">
                <FaLinkedin />
              </Link>
              <Link href={instagramLink} className="bg-instagramBg p-1.5 rounded-full text-white cursor-pointer hover:border border hover:border-gray-600 hover:bg-transparent hover:text-black ease-in-out duration-200">
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the Navbar and Menu rendering */}
      <div className="bg-navBg text-white top-0">
        <div className="container mx-auto xl:flex items-center justify-between gap-14 hidden">
          <ul className="flex items-center justify-between w-full">
            {menus.map((item) => (
              <li key={item.id} className="relative group py-5">
                <Link href={item.link} className="flex items-center justify-center gap-1 text-base capitalize">
                  {item.label}
                  {item.child && item.child.length > 0 && <FaAngleDown />}
                </Link>

                {item.child && item.child.length > 0 && (
                  <ul className="absolute top-full hidden group-hover:block bg-white text-black shadow-md border-hoverborder space-y-0 w-60 z-10">
                    {item.child.map((childItem) => (
                      <li key={childItem.id}>
                        <Link href={`/category${childItem.link}`} className="block hover:bg-gray-200 p-1 px-2">
                          {childItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-navBg fixed top-0 left-0 h-screen w-full z-30 flex flex-col px-4 pt-4"
          >
            {/* Logo and Close Button */}
            <div className="flex flex-row items-center justify-between bg-white p-4 border-b">
              <Link href={"/"}>
                <Image
                  src={unitedLogo}
                  width={150}
                  height={150}
                  priority
                  alt="united"
                  className="w-32"
                />
              </Link>
              <div
                onClick={() => setIsNavOpen(false)}
                className="text-2xl cursor-pointer text-gray-700 mt-2"
              >
                <FaTimes />
              </div>
            </div>

            <ul className="flex flex-col gap-1 bg-white p-5">
              {menus.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.link}
                    className="text-lg"
                    onClick={() => setIsNavOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
