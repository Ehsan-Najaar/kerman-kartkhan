'use client'

import Footer from '@/components/Footer'
import Faq from '@/components/Landing/Faq'
import LandingHeaderPage from '@/components/Landing/LandingHeaderPage'
import Image from 'next/image'

export default function page() {
  return (
    <div>
      <LandingHeaderPage />
      <div className="space-y-12">
        <Image
          src={'/images/undraw/undraw_faq_h01d.svg'}
          alt="faq"
          width={500}
          height={500}
          property="true"
          className="mx-auto object-contain"
        />
        <Faq />
      </div>
      <Footer />
    </div>
  )
}
