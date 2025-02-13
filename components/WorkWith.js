"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/helpers/axiosInstance";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import Loading from "./Loading";

const WorkWith = () => {
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch brands
    const fetchBrands = async () => {
      try {
        const res = await axiosInstance.get("/posts?term_type=work_with&per_page=50");
        setBrands(res.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="container mx-auto px-3 py-5">
      <h4 className="md:text-3xl text-xl text-textHeadingColor font-semibold text-center">
        We Work With
      </h4>
      <Swiper
        slidesPerView={1}
        spaceBetween={4}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          360: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {brands.map((brand, index) => (
          <SwiperSlide key={index}>
            <div className="border border-gray-300 rounded-md p-2 mx-auto hover:shadow-2xl duration-150 ease-in-out mt-5 w-full">
              <Image
                src={brand?.featured_image}
                width={300}
                height={300}
                alt={brand.name}
                priority
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-36 lg:w-32 lg:h-40 object-contain mx-auto"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WorkWith;
