// app/components/Landing/HeroSection.jsx
import ProductsSection from '@/components/Landing/ProductsSection'
import ScrollDownArrow from '@/components/Landing/ScrollDownArrow'
import TopSection from '@/components/Landing/TopSection'
import Category from '@/models/Category'

export default async function HeroSection() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const res = await fetch(`${baseUrl}/api/products`, {
    cache: 'no-store',
  })

  const data = await res.json()
  const products = Array.isArray(data) ? data : data.products

  const category = await Category.findOne({ title: 'کارتخوان' })

  const cardReaderProducts = products.filter(
    (product) => product.category?._id.toString() === category._id.toString()
  )

  return (
    <div className="bg-primary h-[950px] max-w-6xl mx-auto rounded-b-4xl lg:rounded-[48px] -mt-16 lg:-mt-24 p-4 lg:p-0 text-light">
      <TopSection />
      <ScrollDownArrow />
      <ProductsSection products={cardReaderProducts} />
    </div>
  )
}
