'use client'

import AuthModal from '@/components/shop/AuthModal'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Search, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ShopPageHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(true)

  const categories = [
    { name: 'ثابت', href: '/category/fixed' },
    { name: 'سیار', href: '/category/mobile' },
    { name: 'اندرویدی', href: '/category/android' },
    { name: 'لوازم جانبی', href: '/category/accessories' },
  ]

  const routes = [
    { name: 'اصلی', href: '/' },
    { name: 'محصولات', href: '/products' },
    { name: 'درباره ما', href: '/about-us' },
    { name: 'ارتباط با ما', href: '/contact-us' },
    { name: 'راهنمای دریافت کارتخوان', href: '/guide' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY < 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="w-full sticky top-0 z-50 bg-light rounded-b-lg">
      {/* هدر بالا */}
      <div className="w-full py-4 px-24 flex items-center justify-between bg-light z-50">
        <section className="w-2/3 flex items-center gap-10">
          <figure>
            <Image src="/images/logo.png" alt="logo" width={200} height={200} />
          </figure>

          <section className="w-full">
            <Input
              id="search"
              name="search"
              placeholder="جستجو در محصولات..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search size={20} className="text-gray" />}
            />
          </section>
        </section>

        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            outline
            fontWeight="medium"
            size="sm"
            onClick={() => setIsModalOpen(true)}
          >
            <User />
            ورود | ثبت نام
          </Button>

          <button className="p-3 text-gray border border-lightgray/35 rounded-lg cursor-pointer">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* ساب‌هدر: فقط وقتی در بالای صفحه هست نمایش داده میشه */}
      <nav
        className={`absolute top-full left-0 w-full bg-light -z-10 px-24 py-2 flex items-center gap-20 text-sm font-medium overflow-x-auto transition-transform duration-300 ${
          show ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* محتوا مثل قبل: routes + categories */}
        <section className="flex items-center gap-4">
          <span className="bg-section/50 text-secondary/80 rounded-full px-4 py-1 text-sm whitespace-nowrap">
            صفحات
          </span>
          <div className="h-6 w-px bg-lightgray rounded-full"></div>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-gray/70 hover:text-primary transition-colors whitespace-nowrap"
            >
              {route.name}
            </Link>
          ))}
        </section>

        <section className="flex items-center gap-4">
          <span className="bg-section/50 text-secondary/80 rounded-full px-4 py-1 text-sm whitespace-nowrap">
            کارتخوان‌ها
          </span>
          <div className="h-6 w-px bg-lightgray rounded-full"></div>
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="text-gray/70 hover:text-primary transition-colors whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
        </section>
      </nav>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  )
}
