'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const price = Number(localStorage.getItem('zarinpal_amount')) || 0

    if (price <= 0) {
      router.push('/shop/checkout/failure')
      return
    }

    const verify = async () => {
      try {
        const res = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Authority: searchParams.get('Authority'),
            Status: searchParams.get('Status'),
            Amount: price,
          }),
        })

        const result = await res.json()

        if (!res.ok || !result.success) {
          router.push('/shop/checkout/failure')
          return
        }

        localStorage.setItem('refId', result.refId)
        router.push('/shop/checkout/success')
      } catch (error) {
        console.error('Error verifying payment:', error)
        router.push('/shop/checkout/failure')
      }
    }

    verify()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray text-lg">در حال بررسی پرداخت...</p>
    </div>
  )
}
