'use client'

import Footer from '@/components/Footer'
import LandingHeaderPage from '@/components/Landing/LandingHeaderPage'
import RegisterGuide from '@/components/Landing/RegisterGuide'
import RequiredDocuments from '@/components/Landing/RequiredDocuments'
import StepsBuying from '@/components/Landing/StepsBuying'

export default function GuidePage() {
  return (
    <div className="space-y-16">
      <LandingHeaderPage />

      <RegisterGuide />

      <StepsBuying />

      <RequiredDocuments />

      <Footer />
    </div>
  )
}
