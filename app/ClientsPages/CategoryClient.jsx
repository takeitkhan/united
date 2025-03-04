'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axiosInstance from '@/helpers/axiosInstance'
import Loading from '@/components/Loading'
import GetAQuote from '@/components/GetAQuote'
import CategorySection from '@/components/CategorySection'
import Pagination from '@/components/Pagination'

const CategoryClient = ({ slug }) => {
  const slugName = slug
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectCategory, setSelectCategory] = useState(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchData = async (page = 1) => {
      setLoading(true)
      try {
        const [categoriesRes, categoryRes, productsRes] = await Promise.all([
          axiosInstance.get('/categories?taxonomy_type=categories&limit=60'),
          axiosInstance.get(`/category?slug=${slugName}`),
          axiosInstance.get(
            `/posts?term_type=product&per_page=10&page=${page}&category_slug=${slugName}`
          ) // Added category_slug here
        ])

        setCategories(categoriesRes.data.data)
        setCategory(categoryRes?.data?.data)
        setProducts(productsRes.data.data)
        setTotalPages(productsRes.data.meta.last_page)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData(currentPage)
  }, [slugName, currentPage])

  const handleCategoryClick = slug => {
    setSelectCategory(slug) // Set selected category
    setCurrentPage(1) // Reset to the first page for the selected category
  }

  const openPopUp = () => {
    setIsFormVisible(!isFormVisible)
  }

  const handleCloseForm = () => {
    setIsFormVisible(false)
  }

  const toggleCategories = () => {
    setIsOpen(!isOpen)
  }

  // Handle page change
  const handlePageChange = page => {
    setCurrentPage(page)
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <div className='py-12 md:py-12 productImageCover'>
        <div className='mx-auto px-3 md:px-0 container'>
          <h2 className='font-semibold text-white text-4xl uppercase'>
            {category?.name}
          </h2>
          <div className='mt-3 text-white'>
            <Link href='/'>Home / </Link>
            <span>{category?.name}</span>
          </div>

          <div className='flex flex-wrap items-start gap-2 md:gap-4 pt-5'>
            {categories
              ?.find(item => item.slug === slugName)
              ?.child?.map(child => (
                <Link
                  key={child.id}
                  href={`/category/${child.slug}`}
                  className='bg-bgYellow p-1 px-3 rounded-full text-sm md:text-base'
                >
                  {child.name}
                </Link>
              ))}
          </div>
        </div>
      </div>

      <div className='mx-auto px-3 md:px-0 pt-3 pb-10 container'>
        <div className='md:flex md:justify-between gap-5 mt-5'>
          <div className='xl:w-1/3'>
            <CategorySection
              categories={categories}
              isOpen={isOpen}
              toggleCategories={toggleCategories}
              height='500px'
            />
          </div>
          <div className='xl:w-full overflow-hidden'>
            <div className='pt-5 md:pt-0 md:basis-[80%]'>
              {category?.description && (
                <div
                  className='mb-5 text-sm md:text-base'
                  dangerouslySetInnerHTML={{ __html: category?.description }}
                />
              )}

              {selectCategory && products.length === 0 && (
                <div className='text-red-500'>No related products found</div>
              )}
              <div className='flex flex-col gap-5 mx-auto md:w-full'>
                {products.map((product, index) => (
                  <div
                    key={index}
                    className='flex md:flex-row flex-col gap-4 hover:bg-slate-50 p-2 border hover:border-slate-300 rounded-md'
                  >
                    <div className='flex-shrink-0 w-full md:w-1/3'>
                      <Link
                        href={`/products/${product.slug}`}
                        className='flex justify-center items-center p-2 duration-200 ease-in-out'
                      >
                        <Image
                          src={product.featured_image}
                          width={300}
                          height={300}
                          alt={product.name}
                          priority={false}
                          className='rounded-md w-full h-auto object-cover'
                        />
                      </Link>
                    </div>

                    <div className='flex flex-col flex-1 gap-1'>
                      <div className='flex sm:flex-row flex-col items-start sm:items-center gap-2'>
                        {product.categories
                          .filter(
                            category =>
                              category.taxonomy_type === 'product_brands'
                          )
                          .map(category => (
                            <div
                              key={category?.id}
                              className='flex sm:flex-row flex-col items-start sm:items-center gap-2'
                            >
                              <Link href={`/category/${category?.slug}`}>
                                <Image
                                  src={category?.media_url}
                                  width={100}
                                  height={100}
                                  alt={category?.name}
                                  className='rounded-md object-cover'
                                />
                              </Link>
                              <Link href={`/category/${category?.slug}`}>
                                <h2 className='text-lg'>{category?.name}</h2>
                              </Link>
                            </div>
                          ))}
                      </div>
                      <h2 className='mb-2 font-medium hover:text-blue-700 text-base'>
                        <Link href={`/products/${product.slug}`}>
                          {product?.name}
                        </Link>
                      </h2>

                      {product.extraFields.find(
                        field => field.meta_name === 'battery_type'
                      )?.meta_value ||
                      product.extraFields.find(
                        field => field.meta_name === 'length'
                      )?.meta_value ||
                      product.extraFields.find(
                        field => field.meta_name === 'capacity'
                      )?.meta_value ? (
                        <>
                          {product.extraFields.find(
                            field => field.meta_name === 'battery_type'
                          )?.meta_value && (
                            <div className='flex'>
                              <h5 className='w-48 text-gray-500'>
                                Battery Type
                              </h5>
                              <p className='w-full'>
                                {
                                  product.extraFields.find(
                                    field => field.meta_name === 'battery_type'
                                  )?.meta_value
                                }
                              </p>
                            </div>
                          )}
                          {product.extraFields.find(
                            field => field.meta_name === 'length'
                          )?.meta_value && (
                            <div className='flex'>
                              <h5 className='w-48 text-gray-500'>Length</h5>
                              <p className='w-full'>
                                {
                                  product.extraFields.find(
                                    field => field.meta_name === 'length'
                                  )?.meta_value
                                }
                              </p>
                            </div>
                          )}
                          {product.extraFields.find(
                            field => field.meta_name === 'capacity'
                          )?.meta_value && (
                            <div className='flex'>
                              <h5 className='w-48 text-gray-500'>Capacity</h5>
                              <p className='w-full'>
                                {
                                  product.extraFields.find(
                                    field => field.meta_name === 'capacity'
                                  )?.meta_value
                                }
                              </p>
                            </div>
                          )}
                        </>
                      ) : (
                        <p className='text-sm md:text-base'>
                          {product?.extraFields
                            ?.find(
                              field =>
                                field.meta_name === 'product_short_description'
                            )
                            ?.meta_value?.slice(0, 150) || ''}
                        </p>
                      )}
                      <div className='flex flex-row items-center space-x-4 mt-2'>
                        {' '}
                        {/* Add items-center for vertical alignment */}
                        <div className=''>
                          <Link
                            href={`/products/${product.slug}`}
                            className='bg-navHoverColor p-2 px-4 rounded-sm w-fit font-semibold text-white text-sm text-center capitalize duration-200 ease-in-out hover:navBg'
                          >
                            Read more
                          </Link>
                        </div>
                        <div className='flex-1'>
                          <button
                            onClick={openPopUp}
                            className='bg-navBg hover:bg-blue-700 p-2 px-4 rounded-sm w-fit font-semibold text-white text-sm text-center capitalize duration-200 ease-in-out'
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
                {products.length > 0 ? ( // Check if products are available
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
                  <div className='py-4 text-gray-500 text-center'>
                    No products available
                  </div> // Message when no products are available
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryClient
