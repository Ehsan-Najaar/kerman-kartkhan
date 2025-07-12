'use client'

import AdminPanelBottomNavbar from '@/components/AdminPanelBottomNavbar'
import BottomNavbar from '@/components/BottomNavbar'
import { usePathname } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

export default function Layout({ children }) {
  const pathname = usePathname()
  const isLandingPage = pathname.startsWith('/landing')
  const isGuidePage = pathname.startsWith('/guide')
  const isAboutPage = pathname.startsWith('/about-us')
  const isContactPage = pathname.startsWith('/contact')
  const isTermsPage = pathname.startsWith('/terms')
  const isFaqPage = pathname.startsWith('/faq')
  const isShopRoute = pathname.startsWith('/shop')
  const isCheckoutPage = pathname.startsWith('/shop/checkout')
  const isAdminPanel = pathname.startsWith('/admin')
  const isLoginPage = pathname.startsWith('/login')
  const isPaymentPage = pathname.startsWith('/payment')

  const shouldApplyContainer = !isShopRoute && !isAdminPanel && !isLoginPage
  return (
    <main
      className={`
        ${shouldApplyContainer ? 'max-w-6xl mx-auto' : 'pb-16 md:pb-0'}
        ${
          isLandingPage ||
          isGuidePage ||
          isAboutPage ||
          isContactPage ||
          isCheckoutPage ||
          isPaymentPage ||
          isTermsPage ||
          isFaqPage
            ? 'bg-transparent'
            : 'bg-light'
        }
        ${isShopRoute ? 'max-w-[1640px] mx-auto' : ''}
        ${isAdminPanel ? 'max-w-[1640px] mx-auto' : ''}
      `}
    >
      {!isAdminPanel ? <BottomNavbar /> : <AdminPanelBottomNavbar />}
      {children}
      <Toaster />
    </main>
  )
}
