'use client'

import BannersSection from '@/components/shop/BannersSection'
import BestSellingProducts from '@/components/shop/BestSellingProducts'
import ProductsByCategories from '@/components/shop/ProductsByCategories'
import ShopPageHeader from '@/components/shop/ShopPageHeader'
import SuggestedProducts from '@/components/shop/SuggestedProducts'
import { useEffect, useState } from 'react'

export default function ShopPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error('خطا در گرفتن محصولات:', err)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-light">
      <ShopPageHeader />
      <BannersSection />
      <ProductsByCategories products={products} />
      <SuggestedProducts products={products} />
      <BestSellingProducts products={products} />
    </div>
  )
}
