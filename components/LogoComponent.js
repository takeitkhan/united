import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BASE_URL } from '@/helpers/baseUrl'


export default function LogoComponent ({ logoData }) {
  const [logo, setLogo] = useState(null)

  useEffect(() => {
    if (logoData) {
      setLogo(logoData) // Set logo when data is available
    }
  }, [logoData])

  if (!logo) return null // Prevent rendering before logo is available

  return (
    <Link href={'/'}>
      <Image
        src={BASE_URL + logo}
        width={150}
        height={150}
        priority
        alt='united'
        className='w-36 md:w-48'
      />
    </Link>
  )
}
