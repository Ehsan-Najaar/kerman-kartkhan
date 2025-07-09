'use client'

import { useAppContext } from '@/context/AppContext'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function CheckoutGuard({ children }) {
  const { cart, loadingCart } = useAppContext()
  const router = useRouter()
  const pathname = usePathname()

  // مسیرهایی که گارد باید فعال باشد
  const guardedPaths = [
    '/shop/checkout/identity',
    '/shop/checkout/documents',
    '/shop/checkout/review',
  ]

  const isGuardedRoute = guardedPaths.includes(pathname)

  useEffect(() => {
    if (
      isGuardedRoute &&
      !loadingCart &&
      (!cart?.items || cart.items.length === 0)
    ) {
      router.replace('/shop/cart')
    }
  }, [loadingCart, cart, router, isGuardedRoute])

  if (isGuardedRoute && loadingCart) {
    return (
      <div className="min-h-screen grid place-items-center">
        در حال بررسی سبد خرید...
      </div>
    )
  }

  return <>{children}</>
}
