import React from "react";
import Image from "next/image";
import Link from "next/link";


import aboutus from "./../public/Image/about-us.jpg";

const Aboutus = () => {
  return (
    <div className="container mx-auto px-3 md:px-0 py-10">
      <div className="md:flex items-center justify-center gap-6">

        <div className="w-full ">
          <Image
            src={aboutus}
            width={450}
            height={450}
            alt="about us"
            priority
            className="rounded-md mx-auto"
          ></Image>
        </div>

        <div className="w-full mt-8 md:mt-0">
          <h2 className="text-xl md:text-3xl text-textHeadingColor font-semibold my-3">
            About Us
          </h2>
          <p className=" leading-7 md:leading-7 text-paraColor text-sm md:text-base">
            The United Machinery Bangladesh (UMB) is a unique and trustworthy
            name in the machinery industry throughout Bangladesh. Since 2014,
            UMB has been providing a complete solution of material handling
            equipment, construction machines, and spare-parts on-time delivery.
            We are one of the most leading Forklift supplier in Bangladesh. UMB
            is currently one of the largest importer, supplier, and distributor
            in Bangladesh. We have a huge 4S center containing bulk amounts of
            ready stocks which offer various choices on the products. Upon
            delivery of our products, UMB’s expert service team ensures further
            quality wherever required. We highly focus on Material Handling
            Equipment, Industrial Rack, Wheel Loader, Hand Pallet, VNA truck,
            Ware House Equipment.
          </p>
          <h2 className="md:text-2xl text-xl mt-4 text-textNavColor font-semibold -tracking-tighter">
            We are committed to provide safe industrial solutions to many
            factories.
          </h2>
          <Link
            href={"/about-us"}
            className="bg-navBg p-2 px-5 mt-5 text-white rounded-sm 
            inline-block font-semibold text-sm uppercase hover:bg-navHoverColor
             duration-150 ease-in-out"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
