'use client'

import TomanIcon from '@/components/TomanIcon'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

function formatPriceToPersian(price) {
  if (!price) return '-'
  return price.toLocaleString('fa-IR')
}

export default function OrderItem({ order }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef(null)
  const [maxHeight, setMaxHeight] = useState('0px')

  useEffect(() => {
    console.log('order', order.items)
    if (open) {
      setMaxHeight(contentRef.current.scrollHeight + 'px')
    } else {
      setMaxHeight('0px')
    }
  }, [open, order])

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div
        onClick={() => setOpen(!open)}
        className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 cursor-pointer"
      >
        {/* وضعیت سفارش */}
        <div
          className={`flex items-center justify-center w-1/5 gap-2 text-xs font-medium px-2 py-1 rounded-full ${
            {
              processing: 'bg-orange-100 text-orange-800',
              registration: 'bg-purple-100 text-purple-800',
              shipped: 'bg-blue-100 text-blue-800',
              cancelled: 'bg-red-100 text-red-800',
              completed: 'bg-green-100 text-green-800',
            }[order.orderStatus] || 'bg-gray-100 text-gray-800'
          }`}
        >
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{
              backgroundColor:
                {
                  processing: '#f97316',
                  registration: '#a855f7',
                  shipped: '#3b82f6',
                  cancelled: '#dc2626',
                  completed: '#22c55e',
                }[order?.orderStatus] || '#9ca3af',
            }}
          ></span>
          {{
            processing: 'در حال آماده‌سازی',
            registration: 'در انتظار تأیید سیستم',
            shipped: 'ارسال شد',
            completed: 'تحویل شده',
            cancelled: 'لغو شده',
          }[order.orderStatus] || '-'}
        </div>

        {/* تاریخ */}
        <div className="w-1/5 text-gray text-xs text-center">
          {order.createdAt
            ? new Date(order.createdAt).toLocaleDateString('fa-IR')
            : '-'}
        </div>

        {/* کد سفارش */}
        <div className="w-1/5 text-xs">
          <span className="text-gray">کد سفارش</span>{' '}
          <span>{order.paymentRefId || '-'}</span>
        </div>

        {/* مبلغ کل */}
        <div className="flex items-center gap-px w-1/5 text-xs">
          <span className="text-gray">مبلغ کل</span>{' '}
          <span className="flex items-center gap-1">
            {formatPriceToPersian(order.totalAmount)}
            <TomanIcon className="fill-dark" />
          </span>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="w-1/5 flex items-center justify-center gap-1 text-gray cursor-pointer"
        >
          <span className="text-xs">مشاهده جزئیات</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* جزئیات */}
      <div
        ref={contentRef}
        style={{
          maxHeight,
          transition: 'max-height 0.3s ease',
        }}
        className="overflow-hidden"
      >
        <div className="p-6 space-y-4 text-sm text-gray-700">
          <div>
            <span className="text-gray/70">آدرس:</span>{' '}
            {order.shippingAddress?.address || '-'}
          </div>
          <div>
            <span className="text-gray/70">تلفن:</span>{' '}
            {order.shippingAddress?.phone || '-'}
          </div>
          <div>
            <span className="text-gray/70">تحویل گیرنده:</span>{' '}
            {order?.userName || '-'}
          </div>
          <div>
            <span className="text-gray/70">کد ملی:</span>{' '}
            {order.shippingAddress?.nationalCode || '-'}
          </div>
          <div>
            <span className="text-gray/70">کد پستی:</span>{' '}
            {order.shippingAddress?.postalCode || '-'}
          </div>
          <div>
            <span className="text-gray/70">نام فروشگاه:</span>{' '}
            {order.shippingAddress?.shopName || '-'}
          </div>

          {/* محصولات */}
          {order.items?.length > 0 && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {order.items.map((item, idx) => {
                // اگر productId فقط ID است
                const isIdOnly =
                  typeof item.productId === 'object' && '$oid' in item.productId

                const productId = isIdOnly
                  ? item.productId.$oid
                  : item.productId?._id || '-'

                const productName = isIdOnly
                  ? `محصول شماره ${productId}`
                  : item.productId?.name || '-'

                const productImage = isIdOnly
                  ? null
                  : item.productId?.images?.[0]

                return (
                  <div
                    key={idx}
                    className="border border-lightgray p-3 rounded flex gap-4"
                  >
                    {productImage ? (
                      <img
                        src={productImage}
                        alt={productName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                        بدون تصویر
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-800 text-sm font-medium">
                        کارتخوان {productName}
                      </span>
                      <span className="text-xs text-gray-500">
                        تعداد: {item.quantity || '-'}
                      </span>
                      <span className="text-xs text-gray-500">
                        رنگ:{' '}
                        {item.selectedColor
                          ? item.selectedColor +
                            (item.bodyColors?.length
                              ? ' / ' + item.bodyColors.join(' - ')
                              : '')
                          : item.bodyColors?.length
                          ? item.bodyColors.join(' - ')
                          : '-'}
                      </span>
                      {item.selectedVariant && (
                        <span className="text-xs text-gray-500">
                          مدل: {item.selectedVariant}
                        </span>
                      )}
                      <span className="text-xs text-gray-700 mt-1">
                        قیمت: {formatPriceToPersian(item.price)} تومان
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
