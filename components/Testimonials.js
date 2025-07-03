"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/helpers/axiosInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axiosInstance.get("/posts?term_type=testimonials");
        setTestimonials(res.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, []);

  return (
    <div className="py-10">
      <section className="relative isolate overflow-hidden bg-white py-10 px-3 md:px-0">
        <h3 className="text-xl md:text-3xl text-center font-semibold text-textHeadingColor mb-8">
          Testimonials
        </h3>

        {/* Decorative Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(50rem_60rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>

        <div className="relative mx-auto max-w-2xl lg:max-w-4xl px-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading testimonials...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : testimonials.length === 0 ? (
            <p className="text-center text-gray-500">No testimonials found.</p>
          ) : (
            <div className="relative">
              {/* Custom Buttons */}
              <div className="absolute -left-6 top-1/2 z-10 transform -translate-y-1/2">
                <div className="swiper-button-prev-custom bg-navBg
                  text-white p-2 rounded-full shadow hover:bg-navHoverColor cursor-pointer">
                  <FaChevronLeft />
                </div>
              </div>
              <div className="absolute -right-6 top-1/2 z-10 transform -translate-y-1/2">
                <div className="swiper-button-next-custom bg-navBg 
                 text-white p-2 rounded-full shadow hover:bg-navHoverColor cursor-pointer">
                  <FaChevronRight />
                </div>
              </div>

              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                  prevEl: ".swiper-button-prev-custom",
                  nextEl: ".swiper-button-next-custom",
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop
                className="w-full"
              >
                {testimonials?.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <figure className="bg-white p-6 rounded-xl shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg">
                      <blockquote className="font-semibold text-gray-900">
                        <p
                          className="text-base md:text-lg leading-relaxed text-paraColor"
                          dangerouslySetInnerHTML={{
                            __html: testimonial?.description,
                          }}
                        />
                      </blockquote>

                      {/* Author info */}
                      {/* {testimonial?.meta?.full_name && (
                        <figcaption className="mt-5 flex items-center justify-center gap-3 text-sm text-gray-600">
                          {testimonial?.meta?.avatar && (
                            <img
                              src={testimonial?.meta?.avatar}
                              alt={testimonial?.meta?.full_name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          )}
                          <span>— {testimonial?.meta?.full_name}</span>
                        </figcaption>
                      )} */}
                    </figure>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
