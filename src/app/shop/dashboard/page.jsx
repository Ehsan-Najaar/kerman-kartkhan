'use client'

import Footer from '@/components/Footer'
import ShopPageHeader from '@/components/shop/ShopPageHeader'
import DashboardPanelNavbar from '@/components/shop/userDashboard/DashboardPanelNavbar'

export default function dashboardPage() {
  return (
    <div className="min-h-screen space-y-24">
      <ShopPageHeader />

      <DashboardPanelNavbar />

      <div className="max-w-7xl mx-auto mt-24">
        <Footer />
      </div>
    </div>
  )
}
