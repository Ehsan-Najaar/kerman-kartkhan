import Footer from '@/components/Footer'
import ShopPageHeader from '@/components/shop/ShopPageHeader'
import ProductDetails from '@/components/shop/singleProductPage/ProductDetails'
import RelatedProducts from '@/components/shop/singleProductPage/RelatedProducts'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { productId } = await params
  const [brand, model] = productId.split('-')

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const res = await fetch(
    `${baseUrl}/api/products?brand=${brand}&model=${model}`,
    { cache: 'no-store' }
  )
  const data = await res.json()

  const product = data.length > 0 ? data[0] : null

  if (!product) return { title: 'کرمان کارتخوان' }

  return {
    title: `خرید ${
      product.category.title === 'کارتخوان'
        ? product.category.title
        : '' || product.category.title === 'تجهیزات فروشگاهی'
        ? product.name.toUpperCase()
        : 'تجهیزات فروشگاهی'
    } ${product.type !== 'تجهیزات فروشگاهی' ? product.type : ''} مدل ${
      product.model
    } از برند ${product.brand}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${product.brand}`,
      description: product.description,
      images: [product.images?.[0]],
    },
  }
}

export default async function SingleProductPage({ params }) {
  const { productId } = await params
  const [brand, model] = productId.split('-')

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const res = await fetch(
    `${baseUrl}/api/products?brand=${brand}&model=${model}`,
    { cache: 'no-store' }
  )
  const data = await res.json()

  const product = data.length > 0 ? data[0] : null

  if (!product) notFound()

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
