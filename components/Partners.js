"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/helpers/axiosInstance";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";

// Import required modules
import { Autoplay, Pagination } from "swiper/modules";
import Loading from "./Loading";

const Partners = () => {
    const [partners, setPartners] = useState([]); // corrected variable name
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch partners
        const fetchPartners = async () => {
            try {
                const res = await axiosInstance.get("/posts?term_type=clients");
                setPartners(res.data.data);
                setLoading(false); // stop loading once data is fetched
            } catch (error) {
                setError(error.message);
                setLoading(false); // stop loading if there’s an error
            }
        };
        fetchPartners();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>; // render error message
    }

    return (
        <div className="container mx-auto px-3 md:px-0 py-5">
            <h2 className="md:text-3xl text-xl text-textHeadingColor font-semibold text-center">
                Some Of Our Valued Partners. Why You Not Next?
            </h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={6}
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
                {partners.map((partner, index) => (
                    <SwiperSlide key={index}>
                        <div className="border border-gray-300 rounded-md p-2 mx-auto hover:shadow-2xl duration-150 ease-in-out mt-5 w-full">
                            <Image
                                src={partner?.featured_image}
                                width={300}
                                height={300}
                                alt={partner.name}
                                priority
                                className="imgRation w-full"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Partners;
