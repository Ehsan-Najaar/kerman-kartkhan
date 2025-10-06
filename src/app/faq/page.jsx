import Footer from '@/components/Footer'
import Faq from '@/components/Landing/Faq'
import LandingHeaderPage from '@/components/Landing/LandingHeaderPage'
import Image from 'next/image'

export const metadata = {
  title: 'کرمان کارتخوان | سوالات متداول',
  description:
    'صفحه سوالات متداول کرمان کارتخوان؛ پاسخ به پرسش‌های رایج درباره خرید و نصب کارتخوان، تراکنش‌های کش‌لس، قیمت‌ها و خدمات پشتیبانی برای کسب‌وکارها.',
}

export default function FaqPage() {
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
