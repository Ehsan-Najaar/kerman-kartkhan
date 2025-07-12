'use client'

import Footer from '@/components/Footer'
import ShopPageHeader from '@/components/shop/ShopPageHeader'
import DashboardPanelNavbar from '@/components/shop/userDashboard/DashboardPanelNavbar'
import UserAddresses from '@/components/shop/userDashboard/UserAddresses'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function MyAddresses() {
  return (
    <div className="min-h-screen bg-light space-y-24">
      <div className="hidden lg:flex">
        <ShopPageHeader />
      </div>

      <div className="lg:flex gap-12 lg:px-24">
        <div className="hidden lg:flex">
          <DashboardPanelNavbar />
        </div>

        {/* هدر موبایل */}
        <div className="lg:hidden flex items-center gap-2 bg-light text-dark border-b border-lightgray/35 py-6 px-4 mb-4">
          <Link href="/shop/dashboard">
            <ArrowRight size={24} />
          </Link>
          <h2 className="h4">آدرس های من</h2>
        </div>

        <UserAddresses />
      </div>

      <div className="max-w-7xl mx-auto mt-24">
        <Footer />
      </div>
    </div>
  )
}
