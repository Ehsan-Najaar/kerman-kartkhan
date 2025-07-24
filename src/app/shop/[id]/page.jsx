'use client'

import Footer from '@/components/Footer'
import { Loader3 } from '@/components/Loader'
import ShopPageHeader from '@/components/shop/ShopPageHeader'
import ProductDetails from '@/components/shop/singleProductPage/ProductDetails'
import RelatedProducts from '@/components/shop/singleProductPage/RelatedProducts'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SingleProductPage() {
  const params = useParams()
  const id = params?.id || ''

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()

        const matchedProduct = data.find(
          (item) => `${item.brand}-${item.model}`.toLowerCase() === id
        )

        setProduct(matchedProduct || null)
      } catch (err) {
        console.error('Error loading product:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProduct()
  }, [id])

  if (loading) return <Loader3 />
  if (!product) return <div className="p-4 text-red-600">محصول یافت نشد.</div>

  return (
    <div className="bg-light space-y-16 -mt-20 lg:-mt-0">
      <ShopPageHeader />

      <ProductDetails product={product} />
      <RelatedProducts type={product.type} excludeId={product._id} />

      <div className="max-w-7xl mx-auto mt-24">
        <Footer />
      </div>
    </div>
  )
}
// H@ojj#tZa^h*edi8
