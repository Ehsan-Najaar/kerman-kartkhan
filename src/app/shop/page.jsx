'use client'

import Footer from '@/components/Footer'
import BannersSection from '@/components/shop/BannersSection'
import BestSellingProducts from '@/components/shop/BestSellingProducts'
import CustomersComments from '@/components/shop/CustomersComments'
import ProductsByCategories from '@/components/shop/ProductsByCategories'
import Question from '@/components/shop/Question'
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

      <section className="space-y-12">
        <BannersSection />
        <ProductsByCategories products={products} />
        <SuggestedProducts products={products} />
        <Question />
        <BestSellingProducts products={products} />
        <CustomersComments />
      </section>

      <div className="max-w-7xl mx-auto mt-24">
        <Footer />
      </div>
    </div>
  )
}
