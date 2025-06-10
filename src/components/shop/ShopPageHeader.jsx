'use client'

import AuthModal from '@/components/shop/AuthModal'
import PopularOrSearchProducts from '@/components/shop/search/PopularOrSearchProducts'
import RecentSearches from '@/components/shop/search/RecentSearches'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Fuse from 'fuse.js'
import { Search, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function ShopPageHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(true)
  const [recentSearches, setRecentSearches] = useState([])
  const [popularProducts, setPopularProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const categories = [
    { name: 'ثابت', href: '/category/fixed' },
    { name: 'سیار', href: '/category/mobile' },
    { name: 'اندرویدی', href: '/category/android' },
    { name: 'لوازم جانبی', href: '/category/accessories' },
  ]

  const routes = [
    { name: 'اصلی', href: '/' },
    { name: 'فروشگاه', href: '/shop' },
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

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()

        // مرتب‌سازی بر اساس پرفروش‌ترین
        data.sort((a, b) => b.soldCount - a.soldCount)

        setPopularProducts(data)
      } catch (err) {
        console.error('خطا در دریافت محصولات پرفروش', err)
      }
    }

    fetchPopular()
  }, [])

  useEffect(() => {
    if (search.trim()) {
      const fuse = new Fuse(popularProducts, {
        keys: ['name', 'tags', 'model', 'brand' , "کارتخوان"],
        threshold: 0.1,
        ignoreLocation: true,
        minMatchCharLength: 2,
      })

      const results = fuse.search(search)
      setFilteredProducts(results.map((r) => r.item))
    } else {
      setFilteredProducts([])
    }
  }, [search, popularProducts])

  useEffect(() => {
    const stored = localStorage.getItem('recentSearches')
    if (stored) {
      setRecentSearches(JSON.parse(stored))
    }
  }, [])

  const handleSearchSubmit = () => {
    if (search.trim() && !recentSearches.includes(search)) {
      const updated = [search, ...recentSearches].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem('recentSearches', JSON.stringify(updated))
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      // اگر کلیک خارج از dropdownRef بود، دراپ داون رو ببندیم
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        // با تأخیر کوتاه ببند تا کلیک داخلی کامل بشه
        setTimeout(() => {
          setIsDropdownOpen(false)
        }, 100)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  return (
    <header className="w-full sticky top-0 z-50 bg-light rounded-b-lg overflow-visible">
      <div className="w-full py-4 px-24 flex items-center justify-between bg-light z-50 overflow-visible relative">
        {/* لوگو و جستجو */}
        <section className="w-2/3 flex items-center gap-10 overflow-visible">
          <figure>
            <Image src="/images/logo.png" alt="logo" width={200} height={200} />
          </figure>

          {/* باکس جستجو و منو */}
          <section className="w-full overflow-visible" ref={dropdownRef}>
            <Input
              id="search"
              name="search"
              placeholder="جستجو در محصولات..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsDropdownOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSearchSubmit()
                  setIsDropdownOpen(false)
                }
              }}
              icon={<Search size={20} className="text-gray" />}
            />

            {isDropdownOpen && (
              <div className="absolute bg-white border border-lightgray rounded-lg shadow-md w-[44%] mt-2 p-4 z-50 space-y-4">
                <RecentSearches
                  items={recentSearches}
                  onSelect={(item) => {
                    setSearch(item)
                    setIsDropdownOpen(false)
                  }}
                  onClear={clearRecentSearches}
                />

                <PopularOrSearchProducts
                  search={search}
                  products={search ? filteredProducts : popularProducts}
                />
              </div>
            )}
          </section>
        </section>

        {/* آیکون‌ها */}
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

      {/* منوی پایین: routes و دسته‌ها */}
      <nav
        className={`absolute top-full left-0 w-full bg-light -z-10 px-24 py-2 flex items-center gap-20 text-sm font-medium overflow-x-auto transition-transform duration-300 ${
          show ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
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

      {/* مودال ورود */}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  )
}
