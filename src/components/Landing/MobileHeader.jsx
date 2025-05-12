'use client'

import Button from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const routes = [
  { name: 'صفحه اصلی', path: '/landing' },
  { name: 'فروشگاه کرمان کارتخوان', path: '/shop' },
  { name: 'راهنمای دریافت کارتخوان', path: '/landing/guide' },
  { name: 'ارتباط با ما', path: '/landing/contact-us' },
]

export default function MobileHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isLanding = pathname === '/landing'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (e) => {
      if (!e.target.closest('.mobile-menu') && !e.target.closest('.menu-btn')) {
        setOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <header className={`lg:hidden z-50 ${!isLanding ? 'mb-28' : ''}`}>
      <div
        className={`mx-auto px-3 py-3 max-w-6xl z-50 ${
          isLanding
            ? scrolled
              ? 'bg-light shadow-md backdrop-blur-md'
              : 'bg-primary'
            : 'bg-light shadow-md backdrop-blur-md'
        } transition-all duration-300 flex items-center justify-between fixed w-full top-0`}
      >
        <div className="flex items-center gap-1">
          <button
            aria-label="باز کردن منوی موبایل"
            className="menu-btn"
            onClick={() => setOpen(true)}
          >
            <Menu
              size={28}
              className={`${
                isLanding
                  ? scrolled
                    ? 'text-gray'
                    : 'text-light'
                  : 'text-gray'
              }`}
            />
          </button>

          <Link href={'/'}>
            <Image
              src="/images/logo.png"
              alt="لوگوی کرمان کارتخوان"
              width={120}
              height={40}
              quality={80}
              priority
              loading="eager"
              draggable={false}
              className={`${
                isLanding
                  ? scrolled
                    ? 'grayscale-0'
                    : 'grayscale-100'
                  : 'grayscale-0'
              }`}
            />
          </Link>
        </div>
        <Link href="/order-steps">
          <Button
            variant={
              isLanding ? (scrolled ? 'secondary' : 'light') : 'secondary'
            }
            size="sm"
            customColor={isLanding && !scrolled ? 'text-secondary' : ''}
          >
            سفارش کارتخوان
          </Button>
        </Link>
      </div>

      {open && (
        <div className="fixed h-[clac(100vh+200px)] inset-0 z-[999] bg-black/50 backdrop-blur-sm">
          <motion.nav
            className="mobile-menu fixed top-0 bottom-0 right-0 h-full w-64 bg-light shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            aria-label="منوی موبایل"
          >
            <div className="relative mb-4">
              <figure className="w-full p-4 border-b border-lightgray/40">
                <Image
                  src="/images/logo.png"
                  alt="لوگو"
                  width={190}
                  height={30}
                  quality={70}
                  draggable={false}
                />
              </figure>
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 -left-24 p-2 bg-light text-gray rounded-md cursor-pointer"
                aria-label="بستن منو"
              >
                <X size={24} />
              </button>
            </div>

            <ul className="flex flex-col gap-4">
              {routes.map((route) => (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    onClick={() => setOpen(false)}
                    className="body-text px-2 py-4 border-b border-lightgray/40 block"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>
      )}
    </header>
  )
}
