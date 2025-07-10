'use client'

import BottomNavbar from '@/components/BottomNavbar'
import { usePathname } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

export default function Layout({ children }) {
  const pathname = usePathname()
  const isShopRoute = pathname.startsWith('/shop')
  const isAdminPanel = pathname.startsWith('/admin')
  const isLoginPage = pathname.startsWith('/login')

  const shouldApplyContainer = !isShopRoute && !isAdminPanel && !isLoginPage

  return (
    <main className={shouldApplyContainer ? 'max-w-6xl mx-auto' : 'pb-16'}>
      {children}
      <Toaster />
      <BottomNavbar />
    </main>
  )
}
