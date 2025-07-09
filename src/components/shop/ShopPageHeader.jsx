'use client'

import AuthModal from '@/components/shop/AuthModal'
import PopularOrSearchProducts from '@/components/shop/search/PopularOrSearchProducts'
import RecentSearches from '@/components/shop/search/RecentSearches'
import UserDropdown from '@/components/shop/UserDropdown'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAppContext } from '@/context/AppContext'
import { formatPriceToPersian } from '@/utils/formatPrice'
import Fuse from 'fuse.js'
import { Search, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function ShopPageHeader() {
  const { user, setUser, cart, logout } = useAppContext()
  const cartCount = cart?.items?.length || 0
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(true)
  const [recentSearches, setRecentSearches] = useState([])
  const [popularProducts, setPopularProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const categories = [
    { name: 'ثابت', href: '/shop/type/ثابت' },
    { name: 'سیار', href: '/shop/type/سیار' },
    { name: 'اندرویدی', href: '/shop/type/اندرویدی' },
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
        keys: ['name', 'tags', 'model', 'brand', 'کارتخوان'],
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setTimeout(() => {
          setIsDropdownOpen(false)
        }, 100)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleSearchSubmit = () => {
    if (search.trim() && !recentSearches.includes(search)) {
      const updated = [search, ...recentSearches].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem('recentSearches', JSON.stringify(updated))
    }
  }

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
            <Link href={'/shop'}>
              <Image
                src="/images/logo.png"
                alt="logo"
                width={200}
                height={200}
              />
            </Link>
          </figure>

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
          {user ? (
            <UserDropdown user={user} onLogout={logout} />
          ) : (
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
          )}

          <a href={'/shop/cart'} className="relative">
            <button className="p-3 text-gray border border-lightgray/35 rounded-lg cursor-pointer relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
                  {formatPriceToPersian(cartCount)}
                </span>
              )}
            </button>
          </a>
        </div>
      </div>

      {/* منوی پایین: routes و دسته‌ها */}
      <nav
        className={`absolute top-full left-0 w-full bg-light -z-10 px-24 py-2 flex items-center gap-20 text-sm font-medium overflow-x-auto transition-transform duration-300 ${
          show ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <section className="flex items-center gap-4">
          <span className="bg-section/25 text-secondary/80 rounded-full px-4 py-1 text-sm whitespace-nowrap">
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
          <span className="bg-section/25 text-secondary/80 rounded-full px-4 py-1 text-sm whitespace-nowrap">
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
