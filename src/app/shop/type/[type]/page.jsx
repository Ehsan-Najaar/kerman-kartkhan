import TypeProductsClient from '@/components/shop/TypeProductsClient'

export async function generateMetadata({ params }) {
  const { type } = await params
  const productType = decodeURIComponent(type)

  if (!productType) return { title: 'کرمان کارتخوان' }

  return {
    title: `کرمان کارتخوان | ${
      ['سیار', 'ثابت', 'اندرویدی'].includes(productType) ? 'کارتخوان های' : ''
    } ${productType}`,
  }
}

export default async function TypePage({ params }) {
  const { type } = await params
  const productType = decodeURIComponent(type)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const res = await fetch(`${baseUrl}/api/products?type=${productType}`, {
    cache: 'no-store',
  })

  const data = await res.json()
  const products = data.filter((p) => p.stock > 0)

  return (
    <div>
      <TypeProductsClient products={products} type={productType} />
    </div>
  )
}
