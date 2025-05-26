'use client'

import Footer from '@/components/Footer'
import Banks from '@/components/Landing/Banks'
import Faq from '@/components/Landing/Faq'
import HeroSection from '@/components/Landing/HeroSectoin'
import LandingHeaderPage from '@/components/Landing/LandingHeaderPage'
import RegisterGuide from '@/components/Landing/RegisterGuide'
import RequiredDocuments from '@/components/Landing/RequiredDocuments'
import Services from '@/components/Landing/Services'
import StepsBuying from '@/components/Landing/StepsBuying'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="space-y-32">
      {/* Top background image */}
      <div className="absolute -top-4 left-0 right-0 -z-10">
        <Image
          src={'/images/top-rectangle.png'}
          alt="Background image"
          width={1500}
          height={1000}
          className="w-full"
        />
      </div>

      {/* Header Section */}
      <LandingHeaderPage />

      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <section className="mt-[384px] sm:mt-[450px] lg:mt-[350px]">
        <Services />
      </section>

      {/* Register Guide Section */}
      <RegisterGuide />

      {/* Steps for Buying Section */}
      <StepsBuying />

      {/* Required Documents Section */}
      <RequiredDocuments />

      {/* Banks Section */}
      <Banks />

      {/* FAQ Section */}
      <Faq />

      {/* Footer Section */}
      <Footer />
    </div>
  )
}
