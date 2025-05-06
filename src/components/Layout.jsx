'use client'

import { AppProvider } from '../../context/AppContext'

export default function Layout({ children }) {
  return (
    <AppProvider>
      <main className="max-w-6xl mx-auto">{children}</main>
    </AppProvider>
  )
}
