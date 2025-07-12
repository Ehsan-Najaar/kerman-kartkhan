'use client'

import Button from '@/components/ui/Button'
import { useAppContext } from '@/context/AppContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'

export default function SuccessPage() {
  const { cart, setCart, userDocks, loadingUserDocks } = useAppContext()
  const [refId, setRefId] = useState(null)
  const [orderSent, setOrderSent] = useState(false)
  const [progress, setProgress] = useState(100)
  const router = useRouter()

  // مدت زمان تایمر (۵ ثانیه)
  const duration = 5000

  useEffect(() => {
    const ref = localStorage.getItem('refId')
    setRefId(ref)
  }, [])

  // تایمر را از اول شروع کن
  useEffect(() => {
    const interval = 50
    const steps = duration / interval
    let current = 0

    const timer = setInterval(() => {
      current += 1
      const newProgress = Math.max(0, 100 - (current / steps) * 100)
      setProgress(newProgress)

      if (current >= steps) {
        clearInterval(timer)
        router.push('/shop/dashboard/my-orders')
      }
    }, interval)

    return () => clearInterval(timer)
  }, [router])

  useEffect(() => {
    if (refId && !loadingUserDocks && cart?.items?.length > 0 && userDocks) {
      const items = cart.items.map((item) => {
        let unitPrice = item.productId.price || 0

        if (item.selectedVariant) {
          const variant = item.productId.variants?.find(
            (v) => v.name === item.selectedVariant
          )
          if (variant?.price) {
            unitPrice = variant.price
          }
        }

        return {
          productId: item.productId._id || item.productId,
          quantity: item.quantity,
          selectedColor: item.selectedColor || '',
          selectedVariant: item.selectedVariant || '',
          bodyColors: item.bodyColors || '',
          price: unitPrice,
        }
      })

      const totalAmount = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )

      const orderData = {
        userId: userDocks._id || null,
        items,
        totalAmount,
        paymentStatus: 'paid',
        paymentRefId: refId,
        userName: userDocks.userName || '',
        shippingAddress: {
          address: userDocks.address || '',
          phone: userDocks.phone || '',
          postalCode: userDocks.postalCode || '',
          nationalCode: userDocks.nationalCode || '',
          shopName: userDocks.shopName || '',
        },
        userDocuments: {
          nationalCardFront: userDocks.nationalCardFront || '',
          nationalCardBack: userDocks.nationalCardBack || '',
          license: userDocks.license || '',
          birthCertificate: userDocks.birthCertificate || '',
          bankCard: userDocks.bankCard || '',
        },
        orderStatus: 'processing',
        isRegistered: false,
      }

      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert('خطا در ثبت سفارش: ' + data.error)
          } else {
            console.log('سفارش ثبت شد', data)
            setOrderSent(true)

            localStorage.removeItem('refId')
            setCart({ ...cart, items: [] })
          }
        })
        .catch(() => alert('خطا در ارتباط با سرور'))
    }
  }, [refId, loadingUserDocks, cart, userDocks])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-light p-8 rounded-xl shadow max-w-md w-full text-center space-y-6">
        <h1 className="flex items-center justify-center gap-2 text-green-700 text-2xl font-bold">
          پرداخت با موفقیت انجام شد!
          <FaCheckCircle size={32} />
        </h1>
        {refId && (
          <p className="text-gray-700">
            کد رهگیری شما: <span className="font-bold">{refId}</span>
          </p>
        )}

        <div className="flex flex-col gap-4 mt-6">
          {/* دکمه تایمری */}
          <button
            className="relative overflow-hidden text-white bg-secondary rounded-lg py-3 cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(to right, #fdbbc3 ${progress}%, transparent ${progress}%)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
              transition: 'background-position 0.05s linear',
            }}
            onClick={() => router.push('/shop/dashboard/my-orders')}
          >
            رفتن به صفحه سفارشات من
          </button>

          {/* دکمه ساده */}
          <Link href="/shop">
            <Button variant="ghost" outline="true" className="w-full">
              بازگشت به فروشگاه
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
