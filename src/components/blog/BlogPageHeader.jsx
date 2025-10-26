'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

export default function BlogPageHeader() {
  const pathname = usePathname()
  const [currentHash, setCurrentHash] = useState('')
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // mount فقط روی client
  useEffect(() => {
    setMounted(true)
    const onHashChange = () => setCurrentHash(window.location.hash || '#top')
    setCurrentHash(window.location.hash || '#top')
    window.addEventListener('hashchange', onHashChange)

    // کنترل اسکرول
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const routes = [
    { name: 'مقالات', path: '/blog#top' },
    { name: 'معرفی محصولات', path: '/blog#products' },
    { name: 'ویژگی‌ها و مزایا', path: '/blog#features' },
    { name: 'راهنمای استفاده', path: '/blog#usage' },
  ]

  return (
    <header
      className={`fixed left-0 right-0 flex items-center justify-between z-50 mx-auto transition-all duration-700 ease-in-out
        ${
          isScrolled
            ? 'bg-light/80 top-2 backdrop-blur-lg shadow-md w-3/4 rounded-full px-10 py-3'
            : 'bg-transparent top-0 backdrop-blur-md w-full px-24 py-6'
        }`}
    >
      {/* Logo */}
      <Link href="/landing" aria-label="لوگوی سایت" draggable="false">
        <Image
          src="/images/logo.png"
          alt="لوگوی کرمان کارتخوان"
          width={160}
          height={50}
          draggable="false"
          priority
          quality={90}
        />
      </Link>

      {/* Routes */}
      <ul className="flex items-center gap-2">
        {routes.map((route) => {
          const [routePath, routeHash] = route.path.split('#')
          const isActive =
            mounted && pathname === routePath && currentHash === `#${routeHash}`

          return (
            <li key={route.path}>
              <Link
                href={route.path}
                className={`relative flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-300
                  ${
                    isActive
                      ? 'text-dark border border-gray font-medium'
                      : 'text-gray-700 hover:text-dark'
                  }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {route.name}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Search Button */}
      <button className="flex items-center gap-2 rounded-full bg-dark text-light px-3 py-1 cursor-pointer font-light">
        جستجو
        <FiSearch />
      </button>
    </header>
  )
}
