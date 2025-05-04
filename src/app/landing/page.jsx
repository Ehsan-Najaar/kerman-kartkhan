'use client'

import Footer from '@/components/Footer'
import Banks from '@/components/Landing/Banks'
import Faq from '@/components/Landing/Faq'
import HeroSection from '@/components/Landing/HeroSectoin'
import RegisterGuide from '@/components/Landing/RegisterGuide'
import RequiredDocuments from '@/components/Landing/RequiredDocuments'
import Services from '@/components/Landing/Services'
import StepsBuying from '@/components/Landing/StepsBuying'
import LandingHeaderPage from '@/components/LandingHeaderPage'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="space-y-32">
      {/* top background */}
      <div className="absolute -top-4 left-0 right-0 -z-10">
        <Image
          src={'/images/top-rectangle.png'}
          alt=""
          width={1500}
          height={1000}
          className="w-full"
        />
      </div>

      {/* header */}
      <LandingHeaderPage />

      {/* hero section */}
      <HeroSection />

      {/* services section */}
      <div className="mt-80 sm:mt-[470px]">
        <Services />
      </div>

      {/* register guide section */}
      <RegisterGuide />

      {/* steps buying */}
      <StepsBuying />

      {/* required documents */}
      <RequiredDocuments />

      {/* banks */}
      <Banks />

      {/* Benefits buying from us */}
      {/* <BenefitsToBuy /> */}

      {/* Faq */}
      <Faq />

      {/* footer */}
      <Footer />
    </div>
  )
}
