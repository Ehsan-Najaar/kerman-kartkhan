'use client'

import { Loader3 } from '@/components/Loader'
import DocCard from '@/components/shop/checkout/DocCard'
import TomanIcon from '@/components/TomanIcon'
import Button from '@/components/ui/Button'
import StepProgressBar from '@/components/ui/StepProgressBar'
import { useAppContext } from '@/context/AppContext'
import { formatPriceToPersian } from '@/utils/formatPrice'
import { HomeIcon, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ReviewPage() {
  const { cart } = useAppContext()

  const router = useRouter()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalImage, setModalImage] = useState(null)

  const totalPrice =
    cart?.items?.reduce((sum, item) => {
      const variants = item.productId?.variants || []
      const matchedVariant = variants.find(
        (v) => v.name === item.selectedVariant
      )
      const unitPrice = matchedVariant?.price || item.productId?.price || 0

      return sum + unitPrice * item.quantity * 10
    }, 0) || 0

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

        setData(result.document)
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
        callback_url: 'http://localhost:3000/payment/verify',
        description: 'خرید از فروشگاه',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    if (data.url) {
      localStorage.setItem('zarinpal_amount', totalPrice.toString())
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
      <div className="md:w-[65%] max-w-6xl md:h-[76%] bg-light border border-lightgray/35 rounded-2xl p-4 shadow space-y-5">
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
          <section className="w-3/4 h-screen bg-lightgray/35 rounded-lg p-4 space-y-6">
            {/* اطلاعات هویتی */}
            <div className="border-b border-gray/30 pb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="text-gray">نام فروشگاه:</span>{' '}
                  {data.shopName}
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
              <p className="mt-3 text-sm">
                <span className="text-gray">آدرس سکونت:</span> {data.address}
              </p>
            </div>

            {/* تصاویر آپلود شده */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {images.map(([key, label]) => (
                <DocCard
                  key={key}
                  imageSrc={data[key]}
                  label={label}
                  name={key}
                  mode="summary"
                  setPreviewImage={setModalImage}
                />
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
                  className="relative max-w-[90vw] max-h-[90vh] bg-light rounded shadow-lg"
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

          <section className="w-2/4 min-h-screen bg-lightgray/35 p-4 rounded-lg">
            {cart?.items.length ? (
              <div className="space-y-6">
                {cart.items.map((item, idx) => {
                  const variants = item.productId?.variants || []
                  const matchedVariant = variants.find(
                    (v) => v.name === item.selectedVariant
                  )
                  const unitPrice =
                    matchedVariant?.price || item.productId?.price || 0

                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-4 not-last:border-b border-gray/30 pb-6"
                    >
                      <div className="w-22 h-22 relative flex-shrink-0 rounded-lg overflow-hidden border border-gray-300 bg-white">
                        <Image
                          src={
                            item.productId?.images?.[0] || '/placeholder.png'
                          }
                          alt={item.productId?.name || 'product'}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-dark font-semibold">
                          کارتخوان {item.productId?.name?.toUpperCase() || '-'}
                        </h3>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-gray-600">
                            رنگ:{' '}
                            <span className="font-medium">
                              {item.selectedColor}
                            </span>
                            {item.bodyColors && (
                              <span className="font-medium">
                                {item.bodyColors[0]} - {item.bodyColors[1]}
                              </span>
                            )}
                          </p>

                          <span className="text-gray">•</span>

                          <p className="text-xs text-gray-600">
                            تعداد:{' '}
                            <span className="font-medium">{item.quantity}</span>
                          </p>
                          {item.selectedVariant && (
                            <span className="text-gray">•</span>
                          )}

                          {item.selectedVariant && (
                            <p className="text-xs text-gray-600">
                              مدل:{' '}
                              <span className="font-medium">
                                {item.selectedVariant}
                              </span>
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-6">
                          <p className="flex items-center gap-px text-xs text-gray">
                            {formatPriceToPersian(unitPrice)}{' '}
                            <TomanIcon className="fill-gray" />
                          </p>
                          {item.quantity > 1 && (
                            <div className="text-gray">-</div>
                          )}
                          {item.quantity > 1 && (
                            <p className="flex items-center gap-px text-sm text-dark">
                              {formatPriceToPersian(unitPrice * item.quantity)}{' '}
                              <TomanIcon />
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-center text-gray-400 mt-12">
                سبد خرید شما خالی است.
              </p>
            )}
          </section>
        </div>

        <div className="flex justify-end gap-2 text-sm">
          <div className="flex items-center gap-2">
            <p className="text-gray">مجموع سبد خرید:</p>
            <p className="font-medium text-dark">
              {formatPriceToPersian(totalPrice)} ریال
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-lightgray pt-2">
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
