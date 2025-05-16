'use client' // Indicate that this component is a client component
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Loading from '@/components/Loading'
import axiosInstance from '@/helpers/axiosInstance'
import { stripHtmlTags } from '@/helpers/truncate'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import RelatedProduct from '@/components/RelatedProduct'
import ProductDetails from '@/components/ProductDetails'
import GetAQuote from '@/components/GetAQuote'
import { FaFileInvoice } from 'react-icons/fa6'
import { MdDetails, MdPictureAsPdf } from 'react-icons/md'
import ProductImage from '@/components/ProductImage'
import {  getMetaValueFromExtra_Fields } from '@/helpers/metaHelpers'

function ProductSingleClient ({ slug }) {
  const [product, setProduct] = useState([]) // set product data

  const [loading, setLoading] = useState(true) // set loading
  const [error, setError] = useState(false) // set error
  const [activeSection, setActiveSection] = useState('details') // Default to 'details'

  // State to manage the visibility of the Get A Quote form
  const [isFormVisible, setIsFormVisible] = useState(false)

  const showDetails = () => {
    setActiveSection('details') // Set to 'details' on button click
  }

  const showContactForm = () => {
    setActiveSection('contact') // Set to 'contact' on button click
  }

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const res = await axiosInstance.get(`/post?slug=${slug}`) // Use axiosInstance
        setProduct(res.data.data)
      } catch (error) {
        setError('Error', error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchSingleProduct()
  }, [])

  if (loading) return <Loading />
  if (error) return <div>{error}</div>

 const images =getMetaValueFromExtra_Fields(product,"product_extra_images")
    

  //const shortDesciption = stripHtmlTags();

  const openPopUp = () => {
    setIsFormVisible(true)
  }

  const handleCloseForm = () => {
    setIsFormVisible(false)
  }

  return (
    <>
      <section>
        <div className='py-12 md:py-12 productImageCover'>
          <div className='mx-auto px-3 md:px-0 container'>
            <h2 className='font-semibold text-white text-4xl uppercase'>
              {product?.name}
            </h2>
            <div className='mt-3 text-white'>
              <Link href={'/'}>Home / </Link>
              <span> {product?.name} </span>
            </div>
          </div>
        </div>

        {/* product review  */}
        <div className='mx-auto px-3 md:px-0 py-2 container'>
          <div className='md:flex md:gap-10 mt-5'>
            <div className='md:w-full'>
              <div className='md:flex md:justify-between gap-5'>
                <div className='mx-auto p-5 border border-gray-200 w-full md:h-1/3'>
                  <ProductImage product={product} images={images} />
                </div>

                <div className='md:w-2/3'>
                  <h1 className='mt-5 md:mt-0 mb-5 font-semibold text-2xl'>
                    {product.name}
                  </h1>
                  <p className='text-paraColor text-sm md:text-base leading-7 md:leading-7'>
                    {product?.extra_fields.find(
                      field => field.meta_name === 'product_short_description'
                    )?.meta_value && (
                      <span className='block py-2 w-full'>
                        {
                          product?.extra_fields.find(
                            field =>
                              field.meta_name === 'product_short_description'
                          )?.meta_value
                        }
                      </span>
                    )}
                  </p>

                  <p className='mt-3'>
                    <button
                      onClick={openPopUp}
                      className='bg-navBg hover:bg-blue-700 p-2 px-4 rounded-sm w-fit font-semibold text-white text-sm text-center capitalize duration-200 ease-in-out'
                    >
                      Get a quote
                    </button>
                  </p>
                </div>
              </div>

              <div>
                <div className='mt-10 product-page'>
                  {/* Buttons to switch between sections */}
                  <div className='button-group flex gap-5'>
                    <button
                      className={`px-4 flex items-center gap-1 py-2 ${
                        activeSection === 'details'
                          ? 'bg-navBg text-white'
                          : 'bg-productBg border border-hoverborder'
                      }`}
                      onClick={showDetails}
                    >
                      <MdDetails /> Product Details
                    </button>
                    <button
                      className={`px-4 py-2 flex items-center gap-1 ${
                        activeSection === 'contact'
                          ? 'bg-navBg text-white'
                          : 'bg-gray-300 border border-hoverborder'
                      }`}
                      onClick={openPopUp} // Open Get A Quote popup
                    >
                      <FaFileInvoice /> Get A Quote
                    </button>

                    {product?.extra_fields.find(
                      field => field.meta_name === 'catalogue_pdf_link'
                    )?.meta_value && (
                      <button
                        className={`px-4 flex items-center gap-1 py-2 ${
                          activeSection === 'details'
                            ? 'bg-navBg text-white'
                            : 'bg-productBg border border-hoverborder'
                        }`}
                      >
                        <a
                          href={
                            product?.extra_fields.find(
                              field => field.meta_name === 'catalogue_pdf_link'
                            )?.meta_value
                          }
                          download
                          className='flex items-center gap-1'
                        >
                          <MdPictureAsPdf /> Download PDF Catalogue
                        </a>
                      </button>
                    )}
                  </div>

                  {/* Conditionally render content based on active section */}
                  <div className='mt-4 content'>
                    {activeSection === 'details' ? (
                      <ProductDetails product={product} />
                    ) : (
                      <div className='bg-navBg contact-form-section mt-10 p-5 rounded-md md:w-full'></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* explore product  */}
        <div className='mx-auto px-3 md:px-0 py-20 container'>
          <div className='opacity-100 mt-3'>
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
  )
}

export default ProductSingleClient
