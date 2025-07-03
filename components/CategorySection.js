'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axiosInstance from '@/helpers/axiosInstance'

const CategorySection = () => {
  const [isOpen, setIsOpen] = useState(false) // Used for toggling categories
  const [categoryItems, setCategoryItems] = useState([])

  // Toggle category visibility on mobile
  const toggleCategories = () => {
    setIsOpen(!isOpen)
  }

  // Fetch category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axiosInstance.get(
          '/categories?taxonomy_type=categories&limit=50'
        )
        setCategoryItems(res.data.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchCategory()
  }, [])


const sortedCategories = categoryItems.sort((a, b) => a.name.localeCompare(b.name));


  return (
    <div className='basis-[30%]'>
      {/* Toggle Button for Categories on mobile */}
      <button
        onClick={toggleCategories}
        className='md:hidden text-navBgColor font-medium p-3 bg-gray-500 w-full text-white'
      >
        {isOpen ? 'Hide Categories' : 'Show Categories'}
      </button>

      {/* Category Section */}
      <div
        className={`border border-navBorder ${
          isOpen ? 'block' : 'hidden md:block'
        }`}
      >
        {/* Title */}
        <h2 className='bg-navBg text-center text-white py-2 pl-3 text-xl capitalize font-medium'>
          Categories
        </h2>

        {/* Scrollable Category List */}
        <div
          className={`flex flex-col gap-1 p-3 text-base capitalize overflow-y-auto`}
          style={{
            height: '600px', // You can adjust this height if needed
            scrollbarWidth: 'thin', // Thinner scrollbars for Firefox
            scrollbarColor: '#888 #e0e0e0' // Scrollbar color
          }}
        >
          {sortedCategories?.map(category => (
            <div
              className='border-b border-b-slate-100 hover:bg-slate-200 px-1 py-1'
              key={category.id}
            >
              <Link href={`/category/${category.slug}`}>
                <span className='hover:text-blue-500 transition-colors duration-200'>
                  {category.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        div.overflow-y-auto::-webkit-scrollbar {
          width: 8px; /* width of the scrollbar */
        }
        div.overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1; /* background of the scrollbar track */
        }
        div.overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: #888; /* scrollbar thumb color */
          border-radius: 10px; /* roundness of the scrollbar */
        }
        div.overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #555; /* darker on hover */
        }
      `}</style>
    </div>
  )
}

export default CategorySection
