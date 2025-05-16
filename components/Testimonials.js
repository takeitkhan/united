"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axiosInstance from "@/helpers/axiosInstance";

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

  // console.log('from testimonials', testimonials[0])

  return (
    <div className="py-5">
      <section className="relative isolate overflow-hidden bg-white py-5 px-3 md:px-0">
        <h3 className="text-xl md:text-3xl text-center font-semibold text-textHeadingColor">
          Testimonials
        </h3>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <figure className="mt-5">
            <blockquote className="text-center font-semibold text-gray-900">
              {/* <p className="text-sm leading-7 text-paraColor">

                { testimonials[0]?.description}
              </p> */}

              <p
                className="text-sm leading-7 text-paraColor"
                dangerouslySetInnerHTML={{ __html: testimonials[0]?.description }}
              />
            </blockquote>
          </figure>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
