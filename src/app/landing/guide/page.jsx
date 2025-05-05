'use client'

import Footer from '@/components/Footer'
import LandingHeaderPage from '@/components/Landing/LandingHeaderPage'
import RegisterGuide from '@/components/Landing/RegisterGuide'

export default function page() {
  return (
    <div className="space-y-24">
      <LandingHeaderPage />

      <RegisterGuide />

      <Footer />
    </div>
  )
}
