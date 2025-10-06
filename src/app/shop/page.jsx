import Footer from '@/components/Footer'
import BannersSection from '@/components/shop/BannersSection'
import BestSellingProducts from '@/components/shop/BestSellingProducts'
import CustomersComments from '@/components/shop/CustomersComments'
import ProductsByType from '@/components/shop/ProductsByType'
import Question from '@/components/shop/Question'
import ShopPageHeader from '@/components/shop/ShopPageHeader'
import SuggestedProducts from '@/components/shop/SuggestedProducts'

export const metadata = {
  title: 'کرمان کارتخوان | فروشگاه',
  description:
    'خرید انواع کارتخوان‌های آکبند و استوک، فعال‌سازی سریع و تراکنش‌های کش‌لس امن، با پشتیبانی مطمئن کرمان کارتخوان.',
}

export default async function ShopPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' })
  const products = await res.json()

  return (
    <div className="min-h-screen bg-light">
      <ShopPageHeader />

      <section className="space-y-12">
        <BannersSection />
        <BestSellingProducts products={products} />
        <SuggestedProducts products={products} />
        <Question />
        <ProductsByType products={products} />
        <CustomersComments />
      </section>

      <div className="max-w-7xl mx-auto mt-24">
        <Footer />
      </div>
    </div>
  )
}
