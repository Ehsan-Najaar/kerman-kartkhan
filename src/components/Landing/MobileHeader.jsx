'use client'

import MobileDrawer from '@/components/MobileDrawer'
import Button from '@/components/ui/Button'
import { routes } from '@/constants/routes'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MobileHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isLanding = pathname === '/landing'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (e) => {
      if (!e.target.closest('.mobile-menu') && !e.target.closest('.menu-btn')) {
        setIsDrawerOpen(false)
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
            onClick={() => setIsDrawerOpen(true)}
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
            variant={isLanding ? (scrolled ? 'primary' : 'light') : ''}
            size="sm"
            customColor={isLanding && !scrolled ? 'text-secondary' : ''}
          >
            سفارش کارتخوان
          </Button>
        </Link>
      </div>

      {isDrawerOpen && (
        <MobileDrawer routes={routes} onClose={() => setIsDrawerOpen(false)} />
      )}
    </header>
  )
}
