import Footer from '@/components/Footer'
import LandingHeaderPage from '@/components/Landing/LandingHeaderPage'
import RegisterGuide from '@/components/Landing/RegisterGuide'
import RequiredDocuments from '@/components/Landing/RequiredDocuments'
import StepsBuying from '@/components/Landing/StepsBuying'

export const metadata = {
  title: 'کرمان کارتخوان | راهنمای دریافت کارتخوان',
  description:
    'مراحل ثبت درخواست و فعال‌سازی کارتخوان در کرمان کارتخوان، استفاده از کارتخوان‌های سریع و تراکنش‌های کش‌لس امن.',
}

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
