'use client'

import Footer from '@/components/Footer'
import ShopPageHeader from '@/components/shop/ShopPageHeader'
import DashboardPanelNavbar from '@/components/shop/userDashboard/DashboardPanelNavbar'
import Link from 'next/link'
import { FiChevronLeft } from 'react-icons/fi'

export default function page() {
  return (
    <div className="min-h-screen bg-light space-y-24">
      <ShopPageHeader />
      <div className="lg:flex gap-12 px-24">
        <DashboardPanelNavbar />

        {/* هدر موبایل */}
        <div className="lg:hidden flex items-center justify-between bg-light rounded-lg shadow p-2 mb-4">
          <h2 className="h4">سفارشات من</h2>
          <Link href="/dashboard">
            <FiChevronLeft size={32} />
          </Link>
        </div>

        <div className="h-96 lg:h-auto lg:w-4/5 bg-light text-dark rounded-2xl flex flex-col items-center p-6 shadow gap-4"></div>
      </div>

      <div className="max-w-7xl mx-auto mt-24">
        <Footer />
      </div>
    </div>
  )
}
