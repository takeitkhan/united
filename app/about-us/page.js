'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import axiosInstance from '@/helpers/axiosInstance'
import {
  getMetaValueByMetaName,
  getMediaLinkByMetaName,
  renderExtraFields
} from '@/helpers/metaHelpers'
import { BASE_URL } from '@/helpers/baseUrl'

export default function AboutUs () {
  const [counter, setCounter] = useState({ years: 0, clients: 0, projects: 0 })
  const [settings, setSettings] = useState(null)
  const [journey, setJourney] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const journeyRes = await axiosInstance.get('/post?slug=our-journey')
        setJourney(journeyRes?.data?.data)
        const settingsRes = await axiosInstance.get('/frontend/settings')
        setSettings(settingsRes.data)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    fetchData()

    const interval = setInterval(() => {
      setCounter(prev => ({
        years: prev.years < 10 ? prev.years + 1 : 10,
        clients: prev.clients < 500 ? prev.clients + 50 : 500,
        projects: prev.projects < 50 ? prev.projects + 1 : 50
      }))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const siteDescription =
    getMetaValueByMetaName(settings, 'site_description') || '#'
  const leftBanner =
    getMediaLinkByMetaName(settings, 'homepage_left_banner_one') || '#'

  const cleanHtml = journey?.description.replace(
    /classname="(.*?)"/g,
    'class="$1"'
  )

  // Filter out the relevant fields for Vision and Mission
  const visionField = journey?.extra_fields.find(
    field => field.meta_name === 'our_vision'
  )
  const missionField = journey?.extra_fields.find(
    field => field.meta_name === 'our_mission'
  )

  return (
    <div className='bg-gray-100 text-gray-900'>
      <div
        className='relative w-full flex items-center justify-center bg-cover bg-center py-12'
        style={{ backgroundImage: "url('/img/about-us-banner.jpg')" }}
      >
        <div className='rounded-lg text-center'>
          <h1 className='text-4xl font-bold'>
            About United Machinery Bangladesh
          </h1>
          <p className='text-lg mt-2'>
            Your trusted partner in industrial solutions.
          </p>
        </div>
      </div>
      <div className='container mx-auto px-6 py-2 pb-12'>
        <div className='grid md:grid-cols-2 gap-2 items-center'>
          <Image
            src={BASE_URL + leftBanner}
            width={500}
            height={400}
            alt='About UMB'
            className='rounded-lg shadow-lg'
          />
          <div>
            <h2 className='text-3xl font-bold'>Who We Are</h2>
            <p
              className='text-gray-700 leading-7 text-justify'
              dangerouslySetInnerHTML={{ __html: siteDescription }}
            />

            <Link
              href='/contact'
              className='inline-block mt-4 px-6 py-2 bg-navBg text-white font-semibold rounded hover:bg-blue-700'
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
      <div className='bg-navBg text-white py-12'>
        <div className='container mx-auto grid md:grid-cols-3 text-center gap-8'>
          <div>
            <motion.h3 className='text-4xl font-bold'>
              {counter.years}+
            </motion.h3>
            <p className='text-lg'>Years in Business</p>
          </div>
          <div>
            <motion.h3 className='text-4xl font-bold'>
              {counter.clients}+
            </motion.h3>
            <p className='text-lg'>Happy Clients</p>
          </div>
          <div>
            <motion.h3 className='text-4xl font-bold'>
              {counter.projects}+
            </motion.h3>
            <p className='text-lg'>Partners</p>
          </div>
        </div>
      </div>
      <div className='container mx-auto px-6 py-12'>
        {visionField && (
          <div>
            <h2 className='text-3xl font-bold text-center'>Our Vision</h2>
            <div
              className='my-6 space-y-6 border-l-4 border-gray-600 pl-6'
              dangerouslySetInnerHTML={{ __html: visionField.meta_value }}
            />
          </div>
        )}

        {missionField && (
          <div>
            <h2 className='text-3xl font-bold text-center'>Our Mission</h2>
            <div
              className='my-6 space-y-6 border-l-4 border-gray-600 pl-6'
              dangerouslySetInnerHTML={{ __html: missionField.meta_value }}
            />
          </div>
        )}
        <h2 className='text-3xl font-bold text-center '>Our Journey</h2>
        <div
          className='mt-6 space-y-6 border-l-4 border-gray-600 pl-6'
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
      </div>
      {/* <div className='bg-gray-200 py-12'>
        <div className='container mx-auto text-center'>
          <h2 className='text-3xl font-bold'>Meet Our Team</h2>
          <div className='grid md:grid-cols-3 gap-6 mt-8'>
            <div className='bg-white p-6 rounded shadow-md hover:shadow-lg transition'>
              <Image
                src='/img/team1.jpg'
                width={150}
                height={150}
                alt='CEO'
                className='rounded-full mx-auto'
              />
              <h3 className='mt-4 font-semibold'>John Doe</h3>
              <p className='text-gray-600'>CEO & Founder</p>
            </div>
            <div className='bg-white p-6 rounded shadow-md hover:shadow-lg transition'>
              <Image
                src='/img/team2.jpg'
                width={150}
                height={150}
                alt='CTO'
                className='rounded-full mx-auto'
              />
              <h3 className='mt-4 font-semibold'>Jane Smith</h3>
              <p className='text-gray-600'>Chief Technical Officer</p>
            </div>
            <div className='bg-white p-6 rounded shadow-md hover:shadow-lg transition'>
              <Image
                src='/img/team3.jpg'
                width={150}
                height={150}
                alt='Marketing Head'
                className='rounded-full mx-auto'
              />
              <h3 className='mt-4 font-semibold'>David Lee</h3>
              <p className='text-gray-600'>Marketing Head</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* CTA Section */}
      <div className='bg-navBg text-white text-center py-12'>
        <h2 className='text-3xl font-bold'>Let's Build the Future Together</h2>
        <p className='text-lg mt-2'>
          Join us in transforming industrial solutions with innovation and
          expertise.
        </p>
        <Link
          href='/contact'
          className='mt-4 px-6 py-3 bg-white text-blue-600 font-semibold rounded inline-block hover:bg-gray-100'
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}
