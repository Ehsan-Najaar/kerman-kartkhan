'use client'

import AdminPanelBottomNavbar from '@/components/AdminPanelBottomNavbar'
import BottomNavbar from '@/components/BottomNavbar'
import Fab from '@/components/Fab'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

export default function Layout({ children }) {
  const pathname = usePathname()
  const [isNotFoundPage, setIsNotFoundPage] = useState(false)

  useEffect(() => {
    // چک کنیم آیا DOM عنصر not-found-page رو داره یا نه
    if (document.querySelector('.not-found-page')) {
      setIsNotFoundPage(true)
    } else {
      setIsNotFoundPage(false)
    }
  }, [pathname])

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
  const isBlogPage = pathname.startsWith('/blog')

  const shouldApplyContainer =
    !isShopRoute && !isAdminPanel && !isLoginPage && !isBlogPage

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
          isFaqPage ||
          isNotFoundPage
            ? 'bg-transparent'
            : ''
        }
        ${isShopRoute ? 'max-w-[1640px] mx-auto' : ''}
        ${isAdminPanel ? 'max-w-[1640px] mx-auto' : ''}
      `}
    >
      {!isAdminPanel ? <BottomNavbar /> : <AdminPanelBottomNavbar />}
      {children}
      <Toaster />
      {isLandingPage ||
      isAboutPage ||
      isContactPage ||
      isGuidePage ||
      isTermsPage ? (
        <Fab />
      ) : (
        ''
      )}
    </main>
  )
}
