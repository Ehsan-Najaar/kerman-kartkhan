'use client'

import BannersSection from '@/components/shop/BannersSection'
import ShopPageHeader from '@/components/shop/ShopPageHeader'

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-light">
      <ShopPageHeader />

      <BannersSection />
      <BannersSection />
    </div>
  )
}
