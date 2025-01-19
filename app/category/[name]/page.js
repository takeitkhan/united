"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "@/helpers/axiosInstance";
import Loading from "@/components/Loading";
import GetAQuote from "@/components/GetAQuote";
import CategorySection from "@/components/CategorySection";
import Pagination from "@/components/Pagination";

const Category = ({ params }) => {
  const slugName = params.name;

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectCategory, setSelectCategory] = useState(null);
  const [filterProducts, setFilterProducts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async (page = 1) => {
      setLoading(true);
      try {
        const categoriesRes = await axiosInstance.get("/categories?taxonomy_type=categories&limit=40");
        setCategories(categoriesRes.data.data);

        const categoryRes = await axiosInstance.get("/category?slug=" + slugName);
        setCategory(categoryRes?.data?.data);

        const productsRes = await axiosInstance.get(`/posts?term_type=product&per_page=10&page=${page}`); // Increased per_page
        const fetchedProducts = productsRes.data.data;

        console.log('Fetched Products:', fetchedProducts); // Debugging line

        setProducts(fetchedProducts);
        setTotalPages(productsRes.data.meta.last_page);

        const matchedProducts = fetchedProducts.filter((product) =>
          product.categories.some((category) => category.slug === slugName)
        );
        setFilterProducts(matchedProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(currentPage); // Fetch data for the current page
  }, [slugName, currentPage]); // Add currentPage to the dependency array

  const handleCategoryClick = (slug) => {
    setSelectCategory(slug);
    const matchedProducts = products.filter((product) =>
      product.categories.some((category) => category.slug === slug)
    );
    setFilterProducts(matchedProducts);
  };

  const openPopUp = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const toggleCategories = () => {
    setIsOpen(!isOpen);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="productImageCover py-12 md:py-12">
        <div className="container mx-auto px-3 md:px-0">
          <h2 className="text-white font-semibold text-4xl uppercase">{category?.name}</h2>
          <div className="text-white mt-3">
            <Link href="/">Home / </Link>
            <span>{category?.name}</span>
          </div>

          <div className="flex items-start gap-2 md:gap-4 pt-5 flex-wrap">
            {categories?.find(item => item.slug === slugName)?.child?.map(child => (
              <Link
                key={child.id}
                href={`/category/${child.slug}`}
                className="bg-bgYellow p-1 px-3 rounded-full text-sm md:text-base"
              >
                {child.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 md:px-0 pt-3 pb-10">
        <div className="md:flex md:justify-between gap-5 mt-5">
          <div className="xl:w-1/3">
            <CategorySection categories={categories} isOpen={isOpen} toggleCategories={toggleCategories} height="500px" />
          </div>
          <div className="xl:w-full overflow-hidden">
            <div className="md:basis-[80%] pt-5 md:pt-0">
              <div className="text-sm md:text-base pb-5" dangerouslySetInnerHTML={{ __html: category?.description }} />

              {selectCategory && filterProducts.length === 0 && (
                <div className="text-red-500">No related products found</div>
              )}
              <div className="md:w-full mx-auto flex flex-col gap-5">
                {filterProducts.map((product, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-4 border hover:border-slate-300 hover:bg-slate-50 p-2 rounded-md">
                    <div className="flex-shrink-0 w-full md:w-1/3">
                      <Link
                        href={`/products/${product.slug}`}
                        className="duration-200 ease-in-out flex items-center justify-center p-2"
                      >
                        <Image
                          src={product.featured_image}
                          width={300}
                          height={300}
                          alt={product.name}
                          priority={false}
                          className="w-full h-auto object-cover rounded-md"
                        />
                      </Link>
                    </div>

                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                        {product.categories.filter(category => category.taxonomy_type === "product_brands").map(category => (
                          <div key={category?.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                            <Link href={`/category/${category?.slug}`}>
                              <Image
                                src={category?.media_url}
                                width={100}
                                height={100}
                                alt={category?.name}
                                className="object-cover rounded-md"
                              />
                            </Link>
                            <Link href={`/category/${category?.slug}`}>
                              <h2 className="text-lg">{category?.name}</h2>
                            </Link>
                          </div>
                        ))}
                      </div>
                      <h2 className="font-medium text-base hover:text-blue-700 mb-2">
                        <Link href={`/products/${product.slug}`}>
                          {product?.name}
                        </Link>
                      </h2>

                      {(product.extraFields.find(field => field.meta_name === "battery_type")?.meta_value ||
                        product.extraFields.find(field => field.meta_name === "length")?.meta_value ||
                        product.extraFields.find(field => field.meta_name === "capacity")?.meta_value) ? (
                        <>
                          {product.extraFields.find(field => field.meta_name === "battery_type")?.meta_value && (
                            <div className="flex">
                              <h5 className="w-48 text-gray-500">Battery Type</h5>
                              <p className="w-full">{product.extraFields.find(field => field.meta_name === "battery_type")?.meta_value}</p>
                            </div>
                          )}
                          {product.extraFields.find(field => field.meta_name === "length")?.meta_value && (
                            <div className="flex">
                              <h5 className="w-48 text-gray-500">Length</h5>
                              <p className="w-full">{product.extraFields.find(field => field.meta_name === "length")?.meta_value}</p>
                            </div>
                          )}
                          {product.extraFields.find(field => field.meta_name === "capacity")?.meta_value && (
                            <div className="flex">
                              <h5 className="w-48 text-gray-500">Capacity</h5>
                              <p className="w-full">{product.extraFields.find(field => field.meta_name === "capacity")?.meta_value}</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-sm md:text-base">
                          {product?.extraFields?.find(field => field.meta_name === "product_short_description")?.meta_value?.slice(0, 150) || ""}
                        </p>
                      )}
                      <div className="flex flex-row space-x-4 items-center mt-2"> {/* Add items-center for vertical alignment */}
                        <div className="">
                          <Link
                            href={`/products/${product.slug}`}
                            className="capitalize text-sm bg-navHoverColor text-white p-2 px-4 rounded-sm hover:navBg duration-200 ease-in-out w-fit text-center font-semibold"
                          >
                            Read more
                          </Link>
                        </div>
                        <div className="flex-1">
                          <button
                            onClick={openPopUp}
                            className="capitalize text-sm bg-navBg text-white p-2 px-4 rounded-sm hover:bg-blue-700 duration-200 ease-in-out w-fit text-center font-semibold"
                          >
                            Get a quote
                          </button>
                          <GetAQuote
                            visible={isFormVisible}
                            onClose={handleCloseForm}
                            productId={product.id}
                            productName={product.name}
                          />
                        </div>
                      </div>


                    </div>
                  </div>
                ))}
              </div>

              <div>
                {filterProducts.length > 0 ? ( // Check if products are available
                  <>
                    {/* Render your product items here */}
                    {/* Example: products.map(product => <ProductItem key={product.id} product={product} />) */}

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                ) : (
                  <div className="text-center text-gray-500 py-4">No products available</div> // Message when no products are available
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
