'use client'
import React, { useRef, useState } from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <div>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                <SwiperSlide>
                    <Image src={productSlide1} width={100} height={100} alt='product' priority className='w-3'></Image>
                </SwiperSlide>
                <SwiperSlide>
                    <Image width={200} height={200} alt='product' priority src={productSlide1}></Image>
                </SwiperSlide>
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Image width={200} height={200} alt='produt' priority src={productSlide1}></Image>
                </SwiperSlide>
                <SwiperSlide>
                    <Image width={200} height={200} alt='product' priority src={productSlide1}></Image>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Product
