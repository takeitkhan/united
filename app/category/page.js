"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";



// image 
import product2 from "./../../public/Image/product-category/p2.png";
import product3 from "./../../public/Image/product-category/p3.png";
import product4 from "./../../public/Image/product-category/p4.png";
import product5 from "./../../public/Image/product-category/p5.png";
import product6 from "./../../public/Image/product-category/p6.png";
import product7 from "./../../public/Image/product-category/7.png";

// === icons ===
import { FaArrowRight } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
import CategorySection from "@/components/CategorySection";

const Category = () => {
    const productList = [
        {
            product_image: product2,
            Product_title: "1.5-3.5T Electric Forklift",
            product_content:
                "These 4-wheel electric forklifts is ready to face some of the most difficult material handling tasks. Max-8 series is your […]",
        },
        {
            product_image: product3,
            Product_title: "1.5T Three Wheel Electric Forklift",
            product_content:
                "EP introduces a compact and agile 3-wheel Li-ion forklift truck for the rapid turnover of goods in confined space with […]",
        },
        {
            product_image: product4,
            Product_title: "7.0-10.0T Lithium Powered Electric Forklift",
            product_content:
                "EFL Series releases a new generation, EFL702/1002 7.0/10.0Ton Li-ion electric forklift, to fill the vacancy of large ton and send […]",
        },
        {
            product_image: product5,
            Product_title: "LPG/Gasoline Forklift – 2.5T",
            product_content:
                "Introduction EQUIPMAX 2.5T Cushion Tires LPG forklift adopts the newest technologies and ergonomic concepts in designing and manufacturing. The forklift […]",
        },
        {
            product_image: product6,
            Product_title: "Telescopic Forklift 2WD/4WD – 2.5-4.0T",
            product_content:
                "Introduction: The EQUIPMAX telescopic forklift (telehandler) adopts the latest technologies and ergonomic concepts in designing and manufacturing. The forklift with […]",
        },
        {
            product_image: product7,
            Product_title: "Stand-on VNA Three Way Forklift 1.0-1.5T",
            product_content: "1.0-1.5T Stand-on VNA Three Way Forklift  ",
        },
    ];

    return (
        <>
            <div className=" productImageCover py-12 md:py-28">
                <div className=" container mx-auto px-3 md:px-0">
                    <h2 className="text-white font-semibold text-4xl">Forklift</h2>
                    <div className="text-white  mt-3">
                        <Link href={"/"}>Home /</Link>
                        <span>Forklift</span>
                    </div>
                </div>
            </div>

           {/* hero bottom section  */}
            <div className="container mx-auto px-3 md:px-0 py-10">
                <div className="flex items-start justify-center gap-2 md:gap-6 flex-wrap">
                    <Link href={"#"} className="bg-bgYellow p-1 px-3 rounded-full text-sm md:text-base ">
                        Diesel Forklift
                    </Link>
                    <Link href={"#"} className="bg-bgYellow p-1 px-3 rounded-full text-sm  md:text-base">
                        Electric Forklift
                    </Link>
                    <Link href={"#"} className="bg-bgYellow p-1 px-3 rounded-full text-sm md:text-base">
                        Lithium Powered Forklift
                    </Link>
                    <Link href={"#"} className="bg-bgYellow p-1 px-3 rounded-full text-sm md:text-base ">
                        LPG Forklift
                    </Link>
                    <Link href={"#"} className="bg-bgYellow p-1 px-3 rounded-full text-sm md:text-base">
                        Specialized Forklift
                    </Link>
                </div>

                <div className="mt-3">
                    <p className="md:text-lg my-4">
                        Forklift is a small industrial vehicle, having a power operated
                        forked platform attached at the front that can be raised and lowered
                        for insertion under a cargo to lift or move it. Forklifts serve the
                        needs of various industries including warehouses and other large
                        storage facilities.
                    </p>
                    <p className="my-4 md:text-lg">
                        Forklifts are powered by electric battery or combustion engines.
                        Some Forklifts allow the operators to sit while driving and
                        operating the machine while others require the operator to stand. It
                        is being extensively used throughout the industry for transporting
                        materials and goods.
                    </p>
                </div>

                {/* product list  */}

                <div className="md:flex gap-10">
                    {/* category section  */}
                    <CategorySection/>
                    {/* end category section */}
                    <div className="md:w-[75%]">
                        <div className="md:py-16 flex flex-col items-start justify-center gap-10">
                            {productList.map((product, index) => (
                                <div
                                    key={index}
                                    className="md:flex md:gap-10 md:items-center md:justify-center"
                                >
                                    <Image
                                        width={300}
                                        height={300}
                                        src={product.product_image}
                                        alt={product.name}
                                        priority
                                        className="md:w-80 md:h-80 object-cover"
                                    ></Image>
                                    <div>
                                        <h2 className="md:text-3xl text-2xl mt-4 font-semibold">
                                            {product.Product_title}
                                        </h2>
                                        <p className="md:text-lg mt-3">
                                            {product.product_content}
                                        </p>
                                        <button
                                            className="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border border-gray-500
before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-navBg hover:text-white hover:duration-1000 before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 font-semibold mt-4 flex items-center gap-2 uppercase text-sm"
                                        >
                                            more <FaArrowRight />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex mt-10 ">
                            <Link
                                href={"#"}
                                className=" border border-gray-200 px-4 p-1 bg-navBg text-white hover:bg-blue-900 duration-200 ease-in-out hover:text-white"
                            >
                                1
                            </Link>
                            <Link
                                href={"#"}
                                className=" border border-gray-200 px-4 p-1 hover:bg-blue-900 duration-200 ease-in-out hover:text-white"
                            >
                                2
                            </Link>
                            <Link
                                href={"#"}
                                className="flex items-center gap-2 border border-gray-200 px-4 p-1 hover:bg-blue-900 duration-200 ease-in-out hover:text-white"
                            >
                                Next Page <FaAnglesRight />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Category;
