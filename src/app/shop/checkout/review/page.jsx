'use client'

import { Loader3 } from '@/components/Loader'
import Button from '@/components/ui/Button'
import StepProgressBar from '@/components/ui/StepProgressBar'
import { Eye, HomeIcon, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../../../../context/AppContext'

export default function ReviewPage() {
  const { cart, removeFromCart, updateCartQuantity, loadingCart } =
    useAppContext()

  const router = useRouter()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalImage, setModalImage] = useState(null)

  const totalPrice = cart?.items?.reduce((sum, item) => {
    const price = item.productId?.price || 0
    return sum + price * item.quantity * 10
  }, 0)

  const images = [
    ['birthCertificate', 'تصویر شناسنامه'],
    ['nationalCardFront', 'کارت ملی (رو)'],
    ['nationalCardBack', 'کارت ملی (پشت)'],
    ['bankCard', 'کارت بانکی'],
    ['license', 'جواز'],
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/user-documents', {
          method: 'GET',
          credentials: 'include',
        })
        if (!res.ok) {
          const errorData = await res.json()
          setError(errorData.error || 'خطا در دریافت اطلاعات')
          setLoading(false)
          return
        }
        const result = await res.json()
        setData(result)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError('خطا در ارتباط با سرور')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  async function handlePayment() {
    const res = await fetch('/api/payment', {
      method: 'POST',
      body: JSON.stringify({
        amount: totalPrice,
        callback_url: 'https://localhost:3000/payment/verify',
        description: 'خرید از فروشگاه',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      alert('خطا در پرداخت')
    }
  }

  if (loading) {
    return <Loader3 />
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen min-w-screen grid place-items-center">
      <div className="md:w-[65%] md:h-[76%] bg-light border border-lightgray/35 rounded-2xl p-4 shadow space-y-6">
        <StepProgressBar
          currentStep={3}
          steps={[
            { id: 1, label: 'اطلاعات هویتی' },
            { id: 2, label: 'آپلود مدارک' },
            { id: 3, label: 'خلاصه و تایید' },
          ]}
          activeColor="bg-secondary"
          pendingColor="bg-gray-300"
          height="h-1"
          className="mb-8"
        />

        <div className="flex gap-8 h-96 max-h-96 overflow-auto p-4">
          <section className="w-3/4 h-screen bg-lightgray/35 rounded-lg p-4">
            {/* اطلاعات هویتی */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <span className="text-gray">نام فروشگاه:</span> {data.shopName}
              </p>
              <p>
                <span className="text-gray">شماره موبایل:</span> {data.phone}
              </p>
              <p>
                <span className="text-gray">کد ملی:</span> {data.nationalCode}
              </p>
              <p>
                <span className="text-gray">کد پستی:</span> {data.postalCode}
              </p>
            </div>
            <p className="mt-2">
              <span className="text-gray">آدرس تحویل دستگاه:</span>{' '}
              {data.address}
            </p>

            {/* تصاویر آپلود شده */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {images.map(([key, label]) => (
                <div key={key} className="text-center">
                  {data[key] ? (
                    <figure className="relative w-40 h-40 border border-lightgray rounded p-2 overflow-hidden flex items-center justify-center">
                      <Image
                        src={data[key]}
                        alt={label}
                        width={160}
                        height={160}
                        className="rounded object-cover max-w-full max-h-full"
                      />
                      {/* دکمه نمایش بزرگ */}
                      <button
                        onClick={() => setModalImage(data[key])}
                        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded hover:bg-opacity-75"
                        aria-label={`نمایش بزرگ ${label}`}
                        type="button"
                      >
                        <Eye size={20} />
                      </button>
                    </figure>
                  ) : (
                    <div className="w-40 h-40 border border-lightgray rounded flex items-center justify-center text-gray-400 text-xs">
                      بدون تصویر
                    </div>
                  )}
                  <span className="block text-xs mt-2 text-gray-600">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* مودال نمایش عکس بزرگ */}
            {modalImage && (
              <div
                className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
                onClick={() => setModalImage(null)}
                role="dialog"
                aria-modal="true"
              >
                <div
                  className="relative max-w-[90vw] max-h-[90vh] bg-lightgray rounded shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-2 left-2 bg-light text-dark rounded-lg p-2 hover:bg-lightgray cursor-pointer"
                    onClick={() => setModalImage(null)}
                  >
                    <X size={24} />
                  </button>
                  <Image
                    src={modalImage}
                    alt="عکس بزرگ"
                    width={800}
                    height={800}
                    className="max-w-full max-h-[90vh] rounded object-contain"
                  />
                </div>
              </div>
            )}
          </section>

          <section className="w-1/4">
            {cart?.items.length ? (
              <div className="space-y-6 pr-2">
                {cart.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items- gap-4 bg-lightgray/35 rounded-lg p-3"
                  >
                    <div className="w-24 h-24 relative flex-shrink-0 rounded-lg overflow-hidden border border-gray-300 bg-white">
                      <Image
                        src={item.productId?.images?.[0] || '/placeholder.png'}
                        alt={item.productId?.name || 'product'}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">
                        کارتخوان {item.productId?.name.toUpperCase() || '-'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        برند: {item.productId?.brand || '-'}
                      </p>
                      <p className="text-sm text-gray-600">
                        رنگ:{' '}
                        <span className="font-medium">
                          {item.selectedColor}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        ورژن:{' '}
                        <span className="font-medium">
                          {item.selectedVariant}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        تعداد:{' '}
                        <span className="font-medium">{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 mt-12">
                سبد خرید شما خالی است.
              </p>
            )}
          </section>
        </div>

        <div className="flex items-center justify-between border-t border-lightgray pt-2 mt-16">
          <Link href={'/shop'}>
            <HomeIcon className="text-gray cursor-pointer" />
          </Link>
          <section className="space-x-4">
            <Button
              variant="ghost"
              outline
              type="button"
              onClick={() => router.back()}
            >
              بازگشت
            </Button>
            <Button variant="primary" type="button" onClick={handlePayment}>
              تایید و پرداخت
            </Button>
          </section>
        </div>
      </div>
    </div>
  )
}
