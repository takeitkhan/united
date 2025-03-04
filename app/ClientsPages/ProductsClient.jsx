'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axiosInstance from '@/helpers/axiosInstance'
import { FaArrowRight, FaAnglesRight } from 'react-icons/fa6'
import CategorySection from '@/components/CategorySection'
import Pagination from '@/components/Pagination' // Import the Pagination component

const ProductsClient = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categoryData, setCategoryData] = useState([])
  const [currentPage, setCurrentPage] = useState(1) // Current page state
  const [totalPages, setTotalPages] = useState(1) // Total pages state

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get(
          `/posts?term_type=product&per_page=10&page=${currentPage}`
        ) // Change per_page as needed
        setProducts(res.data.data)
        setTotalPages(res.data.meta.last_page) // Assuming the API returns total pages in meta
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    // Fetch categories
    const fetchCategory = async () => {
      try {
        const response = await axiosInstance.get(
          '/categories?taxonomy_type=categories&limit=40'
        )
        setCategoryData(response.data.data)
      } catch (error) {
        setError('Failed to fetch categories')
      }
    }

    fetchProducts()
    fetchCategory()
  }, [currentPage]) // Fetch products whenever currentPage changes

  if (loading) {
    return <div>Loading...</div> // Replace with your loading component
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <div className='py-12 md:py-28 productImageCover'>
        <div className='mx-auto px-3 md:px-0 container'>
          <h2 className='font-semibold text-white text-4xl'>Forklift</h2>
          <div className='mt-3 text-white'>
            <Link href={'/'}>Home / </Link>
            <span>Forklift</span>
          </div>
        </div>
      </div>      
      <div className='mx-auto px-3 md:px-0 py-10 container'>
        <div className='flex flex-wrap justify-center items-start gap-2 md:gap-6'>
          <Link
            href={'#'}
            className='bg-bgYellow p-1 px-3 rounded-full text-sm md:text-base'
          >
            Diesel Forklift
          </Link>
          <Link
            href={'#'}
            className='bg-bgYellow p-1 px-3 rounded-full text-sm md:text-base'
          >
            Electric Forklift
          </Link>
          <Link
            href={'#'}
            className='bg-bgYellow p-1 px-3 rounded-full text-sm md:text-base'
          >
            Lithium Powered Forklift
          </Link>
          <Link
            href={'#'}
            className='bg-bgYellow p-1 px-3 rounded-full text-sm md:text-base'
          >
            LPG Forklift
          </Link>
          <Link
            href={'#'}
            className='bg-bgYellow p-1 px-3 rounded-full text-sm md:text-base'
          >
            Specialized Forklift
          </Link>
        </div>

        <div className='mt-3'>
          <p className='my-4 md:text-lg'>
            Forklift is a small industrial vehicle, having a power-operated
            forked platform attached at the front that can be raised and lowered
            for insertion under a cargo to lift or move it. Forklifts serve the
            needs of various industries including warehouses and other large
            storage facilities.
          </p>
          <p className='my-4 md:text-lg'>
            Forklifts are powered by electric battery or combustion engines.
            Some Forklifts allow the operators to sit while driving and
            operating the machine while others require the operator to stand. It
            is being extensively used throughout the industry for transporting
            materials and goods.
          </p>
        </div>

        {/* product list */}
        <div className='md:flex gap-10'>
          {/* category section */}
          <CategorySection categories={categoryData} height='500px' />

          {/* products */}
          <div className='md:w-[70%]'>
            <div className='flex flex-col justify-center items-start gap-10 md:py-0'>
              {products.map((product, index) => (
                <div
                  key={index}
                  className='md:flex md:justify-center md:items-center md:gap-10'
                >
                  <Image
                    width={300}
                    height={300}
                    src={product.featured_image}
                    className='md:w-80 md:h-80 object-cover'
                    alt={product.name}
                    priority
                  />
                  <div>
                    <h2 className='mt-4 font-semibold text-2xl md:text-3xl'>
                      {product.name}
                    </h2>
                    <p className='mt-3 md:text-lg'>
                      {
                        product.extraFields.find(
                          field =>
                            field.meta_name === 'product_short_description'
                        )?.meta_value
                      }
                    </p>
                    <button className='before:-right-full before:hover:right-0 z-10 before:-z-10 isolation-auto before:absolute relative flex items-center gap-2 bg-white before:bg-navBg mt-4 px-8 py-2 border border-gray-500 rounded-md before:rounded-full before:w-full before:hover:w-full before:aspect-square overflow-hidden font-semibold hover:text-white text-sm uppercase before:hover:scale-150 before:transition-all before:duration-700 before:hover:duration-700 hover:duration-1000'>
                      more <FaArrowRight />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductsClient
