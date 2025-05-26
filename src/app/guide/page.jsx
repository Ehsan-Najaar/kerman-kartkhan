'use client'

import Footer from '@/components/Footer'
import LandingHeaderPage from '@/components/Landing/LandingHeaderPage'
import RegisterGuide from '@/components/Landing/RegisterGuide'

export default function GuidePage() {
  return (
    <div className="space-y-16">
      <LandingHeaderPage />

      <RegisterGuide />

      <Footer />
    </div>
  )
}
