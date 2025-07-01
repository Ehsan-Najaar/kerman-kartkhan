'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function VerifyPage() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const verify = async () => {
      const res = await fetch('/api/payment/verify', {
        method: 'POST',
        body: JSON.stringify({
          Authority: searchParams.get('Authority'),
          Status: searchParams.get('Status'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()

      if (data.success) {
        alert('پرداخت موفق بود. کد پیگیری: ' + data.refId)
      } else {
        alert('پرداخت ناموفق بود.')
      }
    }

    verify()
  }, [searchParams])

  return <p>در حال بررسی پرداخت...</p>
}
