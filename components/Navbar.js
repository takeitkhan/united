'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaAngleDown } from 'react-icons/fa6'
import {
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaBars,
  FaTimes
} from 'react-icons/fa'
import axiosInstance from '@/helpers/axiosInstance'
import {
  getMetaValueByMetaName,
  getMediaLinkByMetaName
} from '@/helpers/metaHelpers'
import { BASE_URL } from '@/helpers/baseUrl'
import LogoComponent from './LogoComponent'

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState({})
  const [menus, setMenus] = useState([])
  const [settings, setSettings] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const searchRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuRes = await axiosInstance.get('/menus?menu=1')
        setMenus(menuRes.data.data.items)
        const settingsRes = await axiosInstance.get('/frontend/settings')
        setSettings(settingsRes.data)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    fetchData()
  }, [])

  const facebookLink = getMetaValueByMetaName(settings, 'facebook_url') || '#'
  const instagramLink = getMetaValueByMetaName(settings, 'instagram_url') || '#'
  const linkedinLink = getMetaValueByMetaName(settings, 'linkedin_url') || '#'
  const youtubeLink = getMetaValueByMetaName(settings, 'youtube_url') || '#'
  const logo = getMediaLinkByMetaName(settings, 'site_logoimg_id') || '#'

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length > 0) {
        try {
          const res = await axiosInstance.get(
            `/posts?term_type=product&s=${searchTerm}`
          )
          setSuggestions(res.data.data)
        } catch (error) {
          console.error('Failed to fetch suggestions:', error)
        }
      } else {
        setSuggestions([])
      }
    }

    fetchSuggestions()
  }, [searchTerm])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target )
      ) {
        setSuggestions([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleSubMenu = (id) => {
    setExpandedMenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <>
      <div className='container mx-auto w-full py-3 px-3 md:px-0 z-10'>
        <div className='flex items-center justify-between gap-3'>
          <div className='flex items-center justify-between w-full'>
            <Link href={'/'}>
              <Image
                src={BASE_URL + logo}
                width={150}
                height={70}
                priority
                alt='united'
                className='w-36 md:w-48'
              />
            </Link>

            <div className='flex items-center gap-2 w-full justify-end'>
              <div
                ref={searchRef}
                className='relative w-full max-w-xs hidden md:block'
              >
                <input
                  type='text'
                  placeholder='Search...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  onBlur={() => {
                    setTimeout(() => setSuggestions([]), 100)
                  }}
                  className='border border-gray-300 py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-50'
                />
                {suggestions.length > 0 && (
                  <div className='absolute top-10 left-0 right-0 bg-white border border-gray-300 mt-1 z-20'>
                    {suggestions.map(suggestion => (
                      <Link
                        key={suggestion.id}
                        href={`/products/${suggestion?.slug}`}
                        className='block px-3 py-2 hover:bg-gray-200'
                        onClick={() => setSearchTerm('')}
                      >
                        {suggestion.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div
                onClick={() => setIsNavOpen(!isNavOpen)}
                className='text-2xl cursor-pointer text-gray-700 block xl:hidden'
              >
                {isNavOpen ? <FaTimes /> : <FaBars />}
              </div>
            </div>
          </div>

          <div className='xl:flex flex-col hidden w-full'>
            <div className='flex items-center justify-end gap-3'>
              <Link href={facebookLink} className='social-icon bg-facebookBg'>
                <FaFacebook />
              </Link>
              <Link href={youtubeLink} className='social-icon bg-youtubeBg'>
                <FaYoutube />
              </Link>
              <Link href={linkedinLink} className='social-icon bg-linkedinBg'>
                <FaLinkedin />
              </Link>
              <Link href={instagramLink} className='social-icon bg-instagramBg'>
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className='bg-navBg text-white top-0'>
        <div className='container mx-auto hidden xl:flex items-center justify-between gap-14'>
          <ul className='flex items-center justify-between w-full'>
            {menus.map(item => (
              <li key={item.id} className='relative group py-5'>
                <Link
                  href={item.link}
                  className='flex items-center gap-1 text-base capitalize'
                >
                  {item.label}
                  {item.child?.length > 0 && <FaAngleDown />}
                </Link>

                {item.child?.length > 0 && (
                  <ul className='absolute top-full hidden group-hover:block bg-white text-black shadow-md border-hoverborder w-60 z-10'>
                    {item.child.map(childItem => (
                      <li key={childItem.id}>
                        <Link
                          href={`/category${childItem.link}`}
                          className='block hover:bg-gray-200 p-1 px-2'
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className='bg-white fixed top-0 left-0 h-screen w-full z-30 flex flex-col px-4 pt-4 overflow-y-auto'
          >
            <div className='flex items-center justify-between border-b pb-4 mb-4'>
              <LogoComponent logoData={logo} />
              <div
                onClick={() => setIsNavOpen(false)}
                className='text-2xl cursor-pointer text-gray-700'
              >
                <FaTimes />
              </div>
            </div>

            <ul className='flex flex-col gap-1'>
              {menus.map(item => (
                <li key={item.id}>
                  <div className='flex items-center justify-between'>
                    <Link
                      href={item.link}
                      className='text-lg py-2 block'
                      onClick={() => {
                        if (!item.child?.length) setIsNavOpen(false)
                      }}
                    >
                      {item.label}
                    </Link>
                    {item.child?.length > 0 && (
                      <button
                        className='text-sm'
                        onClick={() => toggleSubMenu(item.id)}
                      >
                        <FaAngleDown
                          className={`transition-transform duration-200 ${
                            expandedMenus[item.id] ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {item.child?.length > 0 && expandedMenus[item.id] && (
                    <ul className='pl-4'>
                      {item.child.map(child => (
                        <li key={child.id}>
                          <Link
                            href={`/category${child.link}`}
                            className='block py-1 text-sm'
                            onClick={() => setIsNavOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
