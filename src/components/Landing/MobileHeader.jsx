'use client'

import Button from '@/components/UI/Button'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const routes = [
  { name: 'صفحه اصلی', path: '/landing' },
  { name: 'فروشگاه کرمان کارتخوان', path: '/shop' },
  { name: 'راهنمای دریافت کارتخوان', path: '/guide' },
  { name: 'ارتباط با ما', path: '/contact-us' },
]

export default function MobileHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // استفاده از effect برای تغییر پس‌زمینه با اسکرول
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // بسته شدن منو با کلیک خارج از آن
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        e.target.closest('.mobile-menu') === null &&
        e.target.closest('.menu-btn') === null
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className="lg:hidden z-50">
      <div
        className={`mx-auto px-3 py-3 max-w-6xl z-50 ${
          scrolled ? 'bg-light shadow-md backdrop-blur-md' : 'bg-primary'
        } transition-all duration-300 flex items-center justify-between fixed w-full top-0`}
      >
        <div className="flex items-center gap-1">
          {/* همبرگر منو */}
          <Menu
            size={28}
            className={`cursor-pointer menu-btn ${
              scrolled ? 'text-gray' : 'text-light'
            }`}
            onClick={() => setOpen(true)}
          />
          <Image
            src="/images/logo.png"
            alt="لوگو"
            width={120}
            height={40}
            draggable={false}
            className={`${scrolled ? 'grayscale-0' : 'grayscale-100'}`}
          />
        </div>
        <Link href={'/order-steps'}>
          <Button
            variant={scrolled ? 'secondary' : 'light'}
            size="sm"
            customColor={!scrolled ? 'text-secondary' : ''}
          >
            سفارش کارتخوان
          </Button>
        </Link>
      </div>

      {open && (
        <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm">
          <motion.div
            className="mobile-menu fixed top-0 right-0 h-full w-64 bg-white shadow-xl"
            initial={{ x: '100%' }} // شروع از سمت راست
            animate={{ x: 0 }} // حرکت به سمت چپ
            exit={{ x: '100%' }} // برگشت به سمت راست
            transition={{ duration: 0.3 }} // زمان انیمیشن
          >
            {/* لوگو و دکمه بستن */}
            <div className="relative mb-4">
              <figure className="w-full p-4 border-b border-lightgray/40">
                <Image
                  src="/images/logo.png"
                  alt="لوگو"
                  width={190}
                  height={30}
                  draggable={false}
                />
              </figure>
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 -left-24 p-2 bg-light text-gray rounded-md cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* لینک‌ها */}
            <div className="flex flex-col gap-4">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  onClick={() => setOpen(false)}
                  className="body-text px-2 py-4 border-b border-lightgray/40"
                >
                  {route.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
