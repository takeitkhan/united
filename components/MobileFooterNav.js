'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Home,
  Phone,
  FileText,
  Mail,
  NotebookTabs,
  ChevronDown
} from 'lucide-react'
import axiosInstance from '@/helpers/axiosInstance'
import { FaAngleDown } from 'react-icons/fa6'

export default function MobileFooterNav () {
  const [showProducts, setShowProducts] = useState(false)
  const [menus, setMenus] = useState([])
  const [settings, setSettings] = useState(null)
  const phoneNumber = '+8801988557711' // Replace with your actual phone number

  // Fetch settings and menu items dynamically
  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuRes = await axiosInstance.get('/menus?menu=1')
        setMenus(menuRes?.data?.data?.items)
        const settingsRes = await axiosInstance.get('/frontend/settings')
        setSettings(settingsRes.data)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 z-50 sm:hidden'>
      <div className='relative'>
        <div className='flex items-center justify-around max-w-md mx-auto relative'>
          <Link href='/' className='flex flex-col items-center gap-1'>
            <Home className='w-5 h-5' />
            <span className='text-xs'>Home</span>
          </Link>
          <button
            onClick={() => setShowProducts(!showProducts)}
            className='flex flex-col items-center gap-1 focus:outline-none'
          >
            <NotebookTabs className='w-5 h-5' />
            <span className='text-xs flex items-center'>
              Products
              {/* <ChevronDown className='w-3 h-3 ml-1' /> */}
            </span>
          </button>

          {showProducts && (
            <div className='absolute bottom-full left-0 w-full bg-gray-50 border-t border-gray-200 shadow-lg mb-2'>
              <div className='flex flex-col'>                
                <ul>
                  {menus.map(item => (
                    <li key={item.id} className='relative group bg-gray-100'>
                      <Link
                        href={item.link}
                        className='flex text-base capitalize items-center justify-between bg-blue-100 hover:bg-blue-300 p-2'
                      >
                        {item.label}
                        {item.child && item.child.length > 0 && <FaAngleDown />}
                      </Link>

                      {item.child && item.child.length > 0 && (
                        <ul className='top-full bg-gray-100 hidden group-hover:block  text-black  border-hoverborder space-y-0 w-80 z-10'>
                          {item.child.map(childItem => (
                            <li key={childItem.id}>
                              <Link
                                href={`/category${childItem.link}`}
                                className='block p-1 px-2'
                              >
                                {childItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <Link
            href={`tel:${phoneNumber}`}
            className='flex flex-col items-center gap-1'
          >
            <div className='bg-navBg rounded-full p-3 -mt-6'>
              <Phone className='w-5 h-5 text-white' />
            </div>
            <span className='text-xs mt-1'>Call</span>
          </Link>

          <Link href='/about-us' className='flex flex-col items-center gap-1'>
            <FileText className='w-5 h-5' />
            <span className='text-xs'>About</span>
          </Link>

          <Link href='/contact' className='flex flex-col items-center gap-1'>
            <Mail className='w-5 h-5' />
            <span className='text-xs'>Contact</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
