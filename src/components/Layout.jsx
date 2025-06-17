'use client'

import { usePathname } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

export default function Layout({ children }) {
  const pathname = usePathname()
  const isShopRoute = pathname.startsWith('/shop')
  const isAdminPanel = pathname.startsWith('/admin')

  const shouldApplyContainer = !isShopRoute && !isAdminPanel

  return (
    <main className={shouldApplyContainer ? 'max-w-6xl mx-auto' : ''}>
      {children}
      <Toaster />
    </main>
  )
}
