"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ==== image ===
import product2 from "./../../public/Image/product-category/p2.png";
import product3 from "./../../public/Image/product-category/p3.png";
import product4 from "./../../public/Image/product-category/p4.png";
import product5 from "./../../public/Image/product-category/p5.png";
import product6 from "./../../public/Image/product-category/p6.png";
import product7 from "./../../public/Image/product-category/7.png";

// === icons ===
import { FaArrowRight } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import axiosInstance from "@/helpers/axiosInstance";

const page = () => {
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

  const [dropdown, setDropdown] = useState(null);
  const [isCategory, setIsCategory] = useState(false);
  const [isOpenBar, setIswOpenBar] = useState(false);

  const [service, setService] = useState([]);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axiosInstance.get('/posts?term_type=services')
        setService(res.data.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchService()
  }, [])

  const handleProductCategory = (tabname) => {
    setDropdown(tabname);
    setIsCategory(!isCategory);
  };

  const handleFilter = () => {
    setIsCategory(!isCategory);
  };

  const handleFilterBarClick = () => {
    setIswOpenBar(!isOpenBar);
  };

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

      {/* ===== hero bottom section === */}
      <div className="container mx-auto px-3 md:px-0 py-10">
        <div className="flex items-start justify-center gap-2 md:gap-6 flex-wrap">
          <Link
            href={"#"}
            className="bg-bgYellow p-1 px-3 rounded-full text-sm md:text-base "
          >
            Diesel Forklift
          </Link>
          <Link
            href={"#"}
            className="bg-bgYellow p-1 px-3 rounded-full text-sm  md:text-base"
          >
            Electric Forklift
          </Link>
          <Link
            href={"#"}
            className="bg-bgYellow p-1 px-3 rounded-full text-sm md:text-base"
          >
            Lithium Powered Forklift
          </Link>
          <Link
            href={"#"}
            className="bg-bgYellow p-1 px-3 rounded-full text-sm md:text-base "
          >
            LPG Forklift
          </Link>
          <Link
            href={"#"}
            className="bg-bgYellow p-1 px-3 rounded-full text-sm md:text-base"
          >
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

        {/* === product list === */}

        <div className="md:flex gap-10">
          <div className="mt-10 md:hidden">
            <div className="md:hidden flex items-center justify-between bg-navBg text-white p-2 rounded-sm mb-4">
              <h2 className="font-medium text-base capitalize">
                Product Filter
              </h2>
              <AiOutlineBars
                onClick={handleFilterBarClick}
                className="text-xl cursor-pointer"
              />
            </div>

            <div className="mb-5">
              {isOpenBar && (
                <div className="md:w-1/4 flex flex-col gap-4 md:hidden  w-full">
                  <div className="md:flex flex-col relative justify-between border-b border-gray-300 pb-2 cursor-pointer font-medium">
                    <div
                      onClick={() => handleProductCategory(1)}
                      className="flex items-center justify-between"
                    >
                      <h2>Rental Equipment</h2>
                      <FaAngleDown />
                    </div>

                    <div>
                      {dropdown == 1 && isCategory && (
                        <div className="flex flex-col bg-gray-200 rounded-md gap-3 p-1 mt-2">
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Forklift
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            excavator
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Wheel loader
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            payloader
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Road Roller
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:flex flex-col relative justify-between border-b border-gray-300 pb-2 cursor-pointer font-medium">
                    <div
                      onClick={() => handleProductCategory(2)}
                      className="flex items-center justify-between"
                    >
                      <h2>Engine Parts</h2>
                      <FaAngleDown />
                    </div>

                    <div>
                      {dropdown == 2 && isCategory && (
                        <div className="flex flex-col bg-gray-200 rounded-md gap-3 p-1 mt-2">
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Forklift
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            excavator
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Wheel loader
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            payloader
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Road Roller
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:flex flex-col relative justify-between border-b border-gray-300 pb-2 cursor-pointer font-medium">
                    <div
                      onClick={() => handleProductCategory(3)}
                      className="flex items-center justify-between"
                    >
                      <h2>Filters</h2>
                      <FaAngleDown />
                    </div>

                    <div>
                      {dropdown == 3 && isCategory && (
                        <div className="flex flex-col bg-gray-200 rounded-md gap-3 p-1 mt-2">
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Forklift
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            excavator
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Wheel loader
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            payloader
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Road Roller
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:flex flex-col relative justify-between border-b border-gray-300 pb-2 cursor-pointer font-medium">
                    <div
                      onClick={() => handleProductCategory(4)}
                      className="flex items-center justify-between"
                    >
                      <h2>Hydraulic parts</h2>
                      <FaAngleDown />
                    </div>

                    <div>
                      {dropdown == 4 && isCategory && (
                        <div className="flex flex-col bg-gray-200 rounded-md gap-3 p-1 mt-2">
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Forklift
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            excavator
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Wheel loader
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            payloader
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Road Roller
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:flex flex-col relative justify-between border-b border-gray-300 pb-2 cursor-pointer font-medium">
                    <div
                      onClick={() => handleProductCategory(5)}
                      className="flex items-center justify-between"
                    >
                      <h2>Transmission Parts</h2>
                      <FaAngleDown />
                    </div>

                    <div>
                      {dropdown == 5 && isCategory && (
                        <div className="flex flex-col bg-gray-200 rounded-md gap-3 p-1 mt-2">
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Forklift
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            excavator
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Wheel loader
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            payloader
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Road Roller
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:flex flex-col relative justify-between border-b border-gray-300 pb-2 cursor-pointer font-medium">
                    <div
                      onClick={() => handleProductCategory(6)}
                      className="flex items-center justify-between"
                    >
                      <h2>Brakes parts</h2>
                      <FaAngleDown />
                    </div>

                    <div>
                      {dropdown == 6 && isCategory && (
                        <div className="flex flex-col bg-gray-200 rounded-md gap-3 p-1 mt-2">
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Forklift
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            excavator
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Wheel loader
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            payloader
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Road Roller
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:flex flex-col relative justify-between border-b border-gray-300 pb-2 cursor-pointer font-medium">
                    <div
                      onClick={() => handleProductCategory(7)}
                      className="flex items-center justify-between"
                    >
                      <h2>Electric Parts</h2>
                      <FaAngleDown />
                    </div>

                    <div>
                      {dropdown == 7 && isCategory && (
                        <div className="flex flex-col bg-gray-200 rounded-md gap-3 p-1 mt-2">
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Forklift
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            excavator
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Wheel loader
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            payloader
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Road Roller
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:flex flex-col relative justify-between border-b border-gray-300 pb-2 cursor-pointer font-medium">
                    <div
                      onClick={() => handleProductCategory(8)}
                      className="flex items-center justify-between"
                    >
                      <h2>Seal kits</h2>
                      <FaAngleDown />
                    </div>

                    <div>
                      {dropdown == 8 && isCategory && (
                        <div className="flex flex-col bg-gray-200 rounded-md gap-3 p-1 mt-2">
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Forklift
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            excavator
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Wheel loader
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            payloader
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Road Roller
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:flex flex-col relative justify-between border-b border-gray-300 pb-2 cursor-pointer font-medium">
                    <div
                      onClick={() => handleProductCategory(9)}
                      className="flex items-center justify-between"
                    >
                      <h2>Drive Parts</h2>
                      <FaAngleDown />
                    </div>

                    <div>
                      {dropdown == 9 && isCategory && (
                        <div className="flex flex-col bg-gray-200 rounded-md gap-3 p-1 mt-2">
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Forklift
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            excavator
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Wheel loader
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            payloader
                          </Link>
                          <Link href={"#"} className="hover:bg-gray-300 p-1">
                            Road Roller
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ======== left side bar =========  */}
          <div className="md:w-1/4 md:flex md:justify-between w-full md:mt-40">
            <div className="md:w-full md:flex flex-col gap-6 hidden">
              <div className="md:flex flex-col relative justify-between border-b border-gray-300 pb-2 cursor-pointer font-medium">
                <div
                  onClick={() => handleProductCategory(1)}
                  className="flex items-center justify-between"
                >
                  <h2>Rental Equipment</h2>
                  <FaAngleDown />
                </div>

                <div>
                  {dropdown == 1 && isCategory && (
                    <div className="flex flex-col bg-gray-200 rounded-md gap-3 p-1 mt-2">
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Forklift
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        excavator
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Wheel loader
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        payloader
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Road Roller
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:flex flex-col relative justify-between border-b border-gray-300 pb-2 cursor-pointer font-medium">
                <div
                  onClick={() => handleProductCategory(2)}
                  className="flex items-center justify-between"
                >
                  <h2>Engine Parts</h2>
                  <FaAngleDown />
                </div>

                <div>
                  {dropdown == 2 && isCategory && (
                    <div className="flex flex-col bg-gray-200 rounded-md gap-3 p-1 mt-2">
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Forklift
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        excavator
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Wheel loader
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        payloader
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Road Roller
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:flex flex-col relative justify-between border-b border-gray-300 pb-2 cursor-pointer font-medium">
                <div
                  onClick={() => handleProductCategory(3)}
                  className="flex items-center justify-between"
                >
                  <h2>Filters</h2>
                  <FaAngleDown />
                </div>

                <div>
                  {dropdown == 3 && isCategory && (
                    <div className="flex flex-col bg-gray-200 rounded-md gap-3 p-1 mt-2">
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Forklift
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        excavator
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Wheel loader
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        payloader
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Road Roller
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:flex flex-col relative justify-between border-b border-gray-300 pb-2 cursor-pointer font-medium">
                <div
                  onClick={() => handleProductCategory(4)}
                  className="flex items-center justify-between"
                >
                  <h2>Hydraulic parts</h2>
                  <FaAngleDown />
                </div>

                <div>
                  {dropdown == 4 && isCategory && (
                    <div className="flex flex-col bg-gray-200 rounded-md gap-3 p-1 mt-2">
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Forklift
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        excavator
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Wheel loader
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        payloader
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Road Roller
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:flex flex-col relative justify-between border-b border-gray-300 pb-2 cursor-pointer font-medium">
                <div
                  onClick={() => handleProductCategory(5)}
                  className="flex items-center justify-between"
                >
                  <h2>Transmission Parts</h2>
                  <FaAngleDown />
                </div>

                <div>
                  {dropdown == 5 && isCategory && (
                    <div className="flex flex-col bg-gray-200 rounded-md gap-3 p-1 mt-2">
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Forklift
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        excavator
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Wheel loader
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        payloader
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Road Roller
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:flex flex-col relative justify-between border-b border-gray-300 pb-2 cursor-pointer font-medium">
                <div
                  onClick={() => handleProductCategory(6)}
                  className="flex items-center justify-between"
                >
                  <h2>Brakes parts</h2>
                  <FaAngleDown />
                </div>

                <div>
                  {dropdown == 6 && isCategory && (
                    <div className="flex flex-col bg-gray-200 rounded-md gap-3 p-1 mt-2">
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Forklift
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        excavator
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Wheel loader
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        payloader
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Road Roller
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:flex flex-col relative justify-between border-b border-gray-300 pb-2 cursor-pointer font-medium">
                <div
                  onClick={() => handleProductCategory(7)}
                  className="flex items-center justify-between"
                >
                  <h2>Electric Parts</h2>
                  <FaAngleDown />
                </div>

                <div>
                  {dropdown == 7 && isCategory && (
                    <div className="flex flex-col bg-gray-200 rounded-md gap-3 p-1 mt-2">
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Forklift
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        excavator
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Wheel loader
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        payloader
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Road Roller
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:flex flex-col relative justify-between border-b border-gray-300 pb-2 cursor-pointer font-medium">
                <div
                  onClick={() => handleProductCategory(8)}
                  className="flex items-center justify-between"
                >
                  <h2>Seal kits</h2>
                  <FaAngleDown />
                </div>

                <div>
                  {dropdown == 8 && isCategory && (
                    <div className="flex flex-col bg-gray-200 rounded-md gap-3 p-1 mt-2">
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Forklift
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        excavator
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Wheel loader
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        payloader
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Road Roller
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:flex flex-col relative justify-between border-b border-gray-300 pb-2 cursor-pointer font-medium">
                <div
                  onClick={() => handleProductCategory(9)}
                  className="flex items-center justify-between"
                >
                  <h2>Drive Parts</h2>
                  <FaAngleDown />
                </div>

                <div>
                  {dropdown == 9 && isCategory && (
                    <div className="flex flex-col bg-gray-200 rounded-md gap-3 p-1 mt-2">
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Forklift
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        excavator
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Wheel loader
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        payloader
                      </Link>
                      <Link href={"#"} className="hover:bg-gray-300 p-1">
                        Road Roller
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* ===== end left side bar =========  */}
          <div className="md:w-[75%]">
            <div className="md:py-16 flex flex-col items-start justify-center gap-10">
              {service.map((product, index) => (
                <div
                  key={index}
                  className="md:flex md:gap-10 md:items-center md:justify-center"
                >
                  <Image
                    width={300}
                    height={300}
                    src={product.featured_image}
                    alt={product.name}
                    priority
                    className="md:w-80 md:h-80 object-cover"
                  ></Image>
                  <div>
                    <h2 className="md:text-3xl text-2xl mt-4 font-semibold">
                      {product.Product_title}
                    </h2>
                    <p className="md:text-lg mt-3">{product.product_content}</p>
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

export default page;
