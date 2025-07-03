"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axiosInstance from "@/helpers/axiosInstance";
import Loading from "@/components/Loading";
import { stripHtmlTags } from "@/helpers/truncate";
import {  getSingleImageFromExtraFields } from "@/helpers/metaHelpers";

const page = ({ params }) => {
  const service = params.slug;

  const [services, setServices] = useState([]); // services
  // console.log("services", services);

  // const [product, setProduct] = useState([]); //product
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fertch services
    const fetchService = async () => {
      try {
        const res = await axiosInstance.get(`/post?slug=${service}`); // Use axiosInstance to fetch data
        setServices(res.data.data); // Set the service data
      } catch (error) {
        setError(error.message); // Catch and handle errors
      } finally {
        setLoading(false); // Stop loading after the fetch is done
      }
    };
    fetchService();
  }, [service]);

  const [dropdown, setDropdown] = useState(null);
  const [isCategory, setIsCategory] = useState(false);
  const [isOpenBar, setIswOpenBar] = useState(false);

  const bgImg = getSingleImageFromExtraFields(services, "cover_image");

console.log("from single service:", bgImg)


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

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div
        className="productImageCover py-12 md:py-28 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImg}) `,
        }}
      >
        <div className="container mx-auto px-3 md:px-0">
          <h2 className="text-white font-semibold text-4xl">{services.name}</h2>
          <div className="text-white mt-3">
            <Link href={"/"}>Home /</Link>
            <span>{services?.extra_fields[0]?.meta_value}</span>
          </div>
        </div>
      </div>

      {/* ===== hero bottom section === */}
      <div className="container mx-auto px-3 md:px-0 py-10">
        <div className="mt-3">
          {/* <p> {services.description} </p> */}
          <h2 className="text-2xl font-medium mb-4 text-textHeadingColor">
            {services?.extra_fields[0]?.meta_value}
          </h2>
          <p className="text-paraColor leading-8 text-sm md:text-base">
            {stripHtmlTags(services.description)}
          </p>
        </div>
      </div>
    </>
  );
};

export default page;
