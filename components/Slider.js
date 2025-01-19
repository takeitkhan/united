"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axiosInstance from "@/helpers/axiosInstance";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Loading from "./Loading";

const Hero = () => {
  const [slider, setSlider] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const response = await axiosInstance.get("/posts?term_type=slider");
        setSlider(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSlider();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 md:px-0 md:py-5 w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slider.map((slideItem, sliderIndex) => (
          <SwiperSlide key={sliderIndex}>
            <div>
              <Image
                src={slideItem?.featured_image}
                width={1170}
                height={550}
                priority
                quality={90}
                alt={slideItem.name}
                className="object-cover w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
