'use client'

import Footer from '@/components/Footer'
import { ProductCard } from '@/components/ProductCard'
import FilterSidebar from '@/components/shop/FilterSidebar'
import ProductListToolbar from '@/components/shop/ProductListToolbar'
import ShopPageHeader from '@/components/shop/ShopPageHeader'
import ProductCardSkeleton from '@/components/ui/Skeleton'
import { motion } from 'framer-motion'
import {
  SlidersHorizontal as FilterIcon,
  SortAsc as SortIcon,
  X,
} from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function TypePage() {
  const { type: rawType } = useParams()
  const type = decodeURIComponent(rawType)

  const [activeSort, setActiveSort] = useState('default')
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filters, setFilters] = useState({})
  const [loading, setLoading] = useState(true)
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/products?type=${encodeURIComponent(type)}`
        )
        const data = await res.json()

        // فقط محصولاتی که stock > 0 دارن
        const inStockProducts = data.filter((p) => p.stock > 0)

        setProducts(inStockProducts)
        setFilteredProducts(inStockProducts)
      } catch (error) {
        console.error('خطا در واکشی محصولات:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [type])

  const handleApplyFilters = (activeFilters) => {
    const filtered = products.filter((product) => {
      const matchBrand =
        activeFilters.selectedBrand?.length === 0 ||
        activeFilters.selectedBrand.includes(product.brand)

      const matchCondition =
        activeFilters.selectedCondition?.length === 0 ||
        activeFilters.selectedCondition.includes(product.condition)

      const matchPrice =
        product.price >= activeFilters.priceRange[0] &&
        product.price <= activeFilters.priceRange[1]

      return matchBrand && matchCondition && matchPrice
    })

    setFilteredProducts(filtered)
  }

  const handleSortChange = (sortValue) => {
    setActiveSort(sortValue)

    let sorted = [...filteredProducts]

    if (sortValue === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price)
    } else if (sortValue === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price)
    } else if (sortValue === 'mostSold') {
      sorted.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
    } else if (sortValue === 'default') {
      sorted = [...products]
    }

    setFilteredProducts(sorted)
  }

  const handleClearFilters = () => {
    setFilters({})
    setFilteredProducts([...products])
    setActiveSort('default')
  }

  const allBrands = [...new Set(products.map((p) => p.brand))]
  const allConditions = [...new Set(products.map((p) => p.condition))]

  return (
    <div className="min-h-screen bg-light lg:space-y-24">
      <ShopPageHeader />

      <div className="flex gap-4 lg:px-24 px-4">
        <aside className="hidden lg:block w-1/4 sticky top-24 self-start h-fit">
          <FilterSidebar
            brands={allBrands}
            conditions={allConditions}
            priceMin={0}
            priceMax={20000000}
            filters={filters}
            setFilters={setFilters}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
        </aside>

        <section className="flex-1">
          <div className="flex lg:hidden items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center gap-2 p-2 rounded border border-lightgray/35 text-gray
               justify-center"
              >
                <FilterIcon size={20} />
                <span className="text-sm">فیلترها</span>
              </button>
              <button
                onClick={() => setIsMobileSortOpen(true)}
                className="flex items-center gap-2 p-2 rounded border border-lightgray/35 text-gray justify-center"
              >
                <SortIcon size={20} />
                <span className="text-sm">مرتب‌سازی</span>
              </button>
            </div>

            <p className="text-sm text-gray">{filteredProducts.length} محصول</p>
          </div>

          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-[999] lg:hidden bg-black/40">
              {/* کلیک روی نیمه بالا برای بستن */}
              <div
                className="w-full h-1/2"
                onClick={() => setIsMobileFilterOpen(false)}
              ></div>

              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="fixed bottom-0 left-0 right-0 h-1/2 bg-white rounded-t-2xl border-t border-lightgray/35 overflow-y-auto p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-gray-800">
                    فیلتر محصولات
                  </span>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-2 border border-lightgray/35 rounded text-gray"
                  >
                    <X />
                  </button>
                </div>

                {/* محتوای FilterSidebar موبایل */}
                <FilterSidebar
                  brands={allBrands}
                  conditions={allConditions}
                  priceMin={0}
                  priceMax={20000000}
                  filters={filters}
                  setFilters={setFilters}
                  onApplyFilters={(activeFilters) => {
                    handleApplyFilters(activeFilters)
                    setIsMobileFilterOpen(false)
                  }}
                  onClearFilters={handleClearFilters}
                />
              </motion.div>
            </div>
          )}

          {isMobileSortOpen && (
            <div className="fixed inset-0 z-[999] lg:hidden bg-black/40">
              {/* کلیک روی نیمه بالا برای بستن */}
              <div
                className="w-full h-1/2"
                onClick={() => setIsMobileSortOpen(false)}
              ></div>

              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="fixed bottom-0 left-0 right-0 h-1/2 bg-white rounded-t-2xl border-t border-lightgray/35 p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-gray-800">
                    مرتب‌سازی محصولات
                  </span>
                  <button
                    onClick={() => setIsMobileSortOpen(false)}
                    className="p-2 border border-lightgray/35 rounded text-gray"
                  >
                    <X />
                  </button>
                </div>

                <ul className="space-y-4">
                  <li>
                    <button
                      className={`w-full text-right py-3 px-4 rounded-lg border border-lightgray/35 hover:bg-bg transition-colors ${
                        activeSort === 'default'
                          ? 'bg-secondary text-light'
                          : ''
                      }`}
                      onClick={() => {
                        handleSortChange('default')
                        setIsMobileSortOpen(false)
                      }}
                    >
                      پیش‌فرض
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-right py-3 px-4 rounded-lg border border-lightgray/35 hover:bg-bg transition-colors ${
                        activeSort === 'price-asc'
                          ? 'bg-secondary text-light'
                          : ''
                      }`}
                      onClick={() => {
                        handleSortChange('price-asc')
                        setIsMobileSortOpen(false)
                      }}
                    >
                      ارزان‌ترین
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-right py-3 px-4 rounded-lg border border-lightgray/35 hover:bg-bg transition-colors ${
                        activeSort === 'price-desc'
                          ? 'bg-secondary text-light'
                          : ''
                      }`}
                      onClick={() => {
                        handleSortChange('price-desc')
                        setIsMobileSortOpen(false)
                      }}
                    >
                      گران‌ترین
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-right py-3 px-4 rounded-lg border border-lightgray/35 hover:bg-bg transition-colors ${
                        activeSort === 'mostSold'
                          ? 'bg-secondary text-light'
                          : ''
                      }`}
                      onClick={() => {
                        handleSortChange('mostSold')
                        setIsMobileSortOpen(false)
                      }}
                    >
                      پرفروش‌ترین
                    </button>
                  </li>
                </ul>
              </motion.div>
            </div>
          )}

          <ProductListToolbar
            title={`کارتخوان‌های ${type}`}
            onSortChange={handleSortChange}
            activeSort={activeSort}
          />

          {loading ? (
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </ul>
          ) : filteredProducts.length === 0 ? (
            <p>محصولی یافت نشد.</p>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="max-w-7xl mx-auto mt-24">
        <Footer />
      </div>
    </div>
  )
}
