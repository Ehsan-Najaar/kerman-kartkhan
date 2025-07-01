'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useAppContext } from '../../../../context/AppContext'

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { cart } = useAppContext()

  const totalPrice = cart?.items?.reduce((sum, item) => {
    const price = item.productId?.price || 0
    return sum + price * item.quantity
  }, 0)

  const totalPriceInRial = totalPrice * 10

  useEffect(() => {
    const verify = async () => {
      const authority = searchParams.get('Authority')
      const status = searchParams.get('Status')

      const res = await fetch('/api/payment/verify', {
        method: 'POST',
        body: JSON.stringify({
          Authority: authority,
          Status: status,
          Amount: totalPriceInRial,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()

      if (data.success) {
        router.push('/shop/checkout/success')
      } else {
        router.push('/shop/checkout/failure')
      }
    }

    verify()
  }, [searchParams, router, totalPriceInRial])

  return (
    <div className="min-h-screen grid place-items-center text-center p-4">
      <p className="text-lg font-semibold">در حال بررسی پرداخت...</p>
    </div>
  )
}
