'use client'

import { usePathname } from 'next/navigation'
import { AppProvider } from '../../context/AppContext'

export default function Layout({ children }) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')

  return (
    <AppProvider>
      <main className={isAdminRoute ? '' : 'max-w-6xl mx-auto'}>
        {children}
      </main>
    </AppProvider>
  )
}
