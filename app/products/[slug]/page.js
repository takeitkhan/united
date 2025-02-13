"use client"; // Indicate that this component is a client component
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "@/components/Loading";
import axiosInstance from "@/helpers/axiosInstance";
import { stripHtmlTags } from "@/helpers/truncate";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import RelatedProduct from "@/components/RelatedProduct";
import ProductDetails from "@/components/ProductDetails";
import GetAQuote from "@/components/GetAQuote";
import { FaFileInvoice } from "react-icons/fa6";
import { MdDetails, MdPictureAsPdf } from "react-icons/md";
import ProductImage from "@/components/ProductImage";

const ProductSingle = ({ params }) => {
  const slug = params.slug;
  const [product, setProduct] = useState([]); // set product data

  const [loading, setLoading] = useState(true); // set loading
  const [error, setError] = useState(false); // set error
  const [activeSection, setActiveSection] = useState("details"); // Default to 'details'

  // State to manage the visibility of the Get A Quote form
  const [isFormVisible, setIsFormVisible] = useState(false);

  const showDetails = () => {
    setActiveSection("details"); // Set to 'details' on button click
  };

  const showContactForm = () => {
    setActiveSection("contact"); // Set to 'contact' on button click
  };

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const res = await axiosInstance.get(`/post?slug=${slug}`); // Use axiosInstance
        setProduct(res.data.data);
      } catch (error) {
        setError("Error", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleProduct();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  const images =
    Array.isArray(product.extra_fields[0]?.meta_value) &&
    product.extra_fields[0]?.meta_value.length > 0
      ? product.extra_fields[0].meta_value
      : [product.featured_image]; // If no extra fields, fallback to featured_image

  //const shortDesciption = stripHtmlTags();

  const openPopUp = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <>
      <section>
        <div className="productImageCover py-12 md:py-12">
          <div className="container mx-auto px-3 md:px-0">
            <h2 className="text-white font-semibold text-4xl uppercase">
              {product?.name}
            </h2>
            <div className="text-white mt-3">
              <Link href={"/"}>Home / </Link>
              <span> {product?.name} </span>
            </div>
          </div>
        </div>

        {/* product review  */}
        <div className="container mx-auto py-2 px-3 md:px-0 ">
          <div className="md:flex md:gap-10 mt-5">
            <div className="md:w-full">
              <div className="md:flex md:justify-between gap-5">
                <div className="md:h-1/3 mx-auto w-full border border-gray-200 p-5">
                  <ProductImage product={product} />
                </div>

                <div className="md:w-2/3">
                  <h1 className="text-2xl font-semibold mt-5 md:mt-0 mb-5">
                    {product.name}
                  </h1>
                  <p className="leading-7 md:leading-7 text-sm md:text-base text-paraColor">
                    {product?.extra_fields.find(field => field.meta_name === "product_short_description")?.meta_value && (
                        <p className="w-full py-2">{product?.extra_fields.find(field => field.meta_name === "product_short_description")?.meta_value}</p>
                    )}
                  </p>
                  <p className="mt-3">
                    <button
                      onClick={openPopUp}
                      className="capitalize text-sm bg-navBg text-white p-2 px-4 rounded-sm hover:bg-blue-700 duration-200 ease-in-out w-fit text-center font-semibold"
                    >
                      Get a quote
                    </button>
                  </p>
                </div>
              </div>

              <div>
                <div className="product-page mt-10">
                  {/* Buttons to switch between sections */}
                  <div className="button-group flex gap-5">
                    <button
                      className={`px-4 flex items-center gap-1 py-2 ${
                        activeSection === "details"
                          ? "bg-navBg text-white"
                          : "bg-productBg border border-hoverborder"
                      }`}
                      onClick={showDetails}
                    >
                      <MdDetails /> Product Details
                    </button>
                    <button
                      className={`px-4 py-2 flex items-center gap-1 ${
                        activeSection === "contact"
                          ? "bg-navBg text-white"
                          : "bg-gray-300 border border-hoverborder"
                      }`}
                      onClick={openPopUp} // Open Get A Quote popup
                    >
                      <FaFileInvoice /> Get A Quote
                    </button>
                    
                    {product?.extra_fields.find(field => field.meta_name === "catalogue_pdf_link")?.meta_value && (
                    
                        <button
                          className={`px-4 flex items-center gap-1 py-2 ${
                            activeSection === "details"
                              ? "bg-navBg text-white"
                              : "bg-productBg border border-hoverborder"
                          }`}
                        >
                          <a href={product?.extra_fields.find(field => field.meta_name === "catalogue_pdf_link")?.meta_value} download 
                                className="flex items-center gap-1">
                            <MdPictureAsPdf /> Download PDF Catalogue
                          </a>
                        </button>
                        
                    )}
                  </div>

                  {/* Conditionally render content based on active section */}
                  <div className="content mt-4">
                    {activeSection === "details" ? (
                      <ProductDetails product={product} />
                    ) : (
                      <div className="contact-form-section bg-navBg p-5 md:w-full rounded-md mt-10"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* explore product  */}
        <div className="container mx-auto py-20 px-3 md:px-0">
          <div className="mt-3 opacity-100">
            <RelatedProduct />
          </div>
        </div>
      </section>

      <GetAQuote
        visible={isFormVisible}
        onClose={handleCloseForm}
        productName={product.name}
        productId={product.id}
      />
    </>
  );
};

export default ProductSingle;
