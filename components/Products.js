"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import axiosInstance from "@/helpers/axiosInstance";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetch product
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get("/posts?term_type=product");
        setProducts(res.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="py-5 px-3 md:px-0 mt-20 bg-productBg">
      <div className="container mx-auto">
        <div>
          <h2 className="text-center md:text-3xl text-xl font-semibold text-textHeadingColor">
            Featured Products
          </h2>
          {/* <p className='text-center text-textNavColor font-semibold text-sm md:text-lg mt-3'>Our service covers the below segments as shown below -</p> */}
        </div>

        <div className="md:grid md:grid-cols-4 grid-cols-2 grid gap-3 mt-10">
          {products.map((product, productIndex) => (
            <Link
              href={`/products/${product.slug}`}
              key={productIndex}
              className="bg-white  py-4 p-2 rounded-md text-center hover:shadow-md duration-200 ease-in-out w-full border-b-2 hover:border-hoverborder inline-block"
            >
              <Image
                src={product?.featured_image}
                width={800}
                height={800}
                alt={product.name}
                priority
                className="mx-auto"
              ></Image>
              <h2 className="text-base md:text-lg font-semibold mt-2">
                {" "}
                {product?.name}{" "}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
