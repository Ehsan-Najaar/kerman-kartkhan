// app/products/type/[type]/page.js
'use client'

import Footer from '@/components/Footer'
import { ProductCard } from '@/components/ProductCard'
import FilterSidebar from '@/components/shop/FilterSidebar'
import ProductListToolbar from '@/components/shop/ProductListToolbar'
import ShopPageHeader from '@/components/shop/ShopPageHeader'
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

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/products?type=${encodeURIComponent(type)}`
        )
        const data = await res.json()
        setProducts(data)
        setFilteredProducts(data)
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
      sorted.sort((a, b) => b.soldCount - a.soldCount)
    } else if (sortValue === 'default') {
      sorted = [...products]
    }

    setFilteredProducts(sorted)
  }

  // وقتی فیلترها حذف شدن:
  const handleClearFilters = () => {
    setFilters({})
    setFilteredProducts([...products])
    setActiveSort('default')
  }

  const allBrands = [...new Set(products.map((p) => p.brand))]
  const allConditions = [...new Set(products.map((p) => p.condition))]

  return (
    <div className="min-h-screen bg-light space-y-24">
      <ShopPageHeader />

      <div className="flex gap-4 px-24">
        <aside className="w-1/4 sticky top-24 self-start h-fit">
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
          <ProductListToolbar
            title={`کارتخوان‌های ${type}`}
            onSortChange={handleSortChange}
            activeSort={activeSort}
          />
          {loading ? (
            <p>در حال بارگذاری...</p>
          ) : filteredProducts.length === 0 ? (
            <p>محصولی یافت نشد.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
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
