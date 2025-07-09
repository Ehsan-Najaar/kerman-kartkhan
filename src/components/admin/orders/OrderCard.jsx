'use client'

import TomanIcon from '@/components/TomanIcon'
import Button from '@/components/ui/Button'
import { formatPriceToPersian } from '@/utils/formatPrice'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { FiCopy, FiDownload, FiEye, FiPlus, FiTrash2 } from 'react-icons/fi'

export default function OrderCard({
  order,
  onDelete,
  deleting,
  updateOrderStatus,
  statusFlow,
  statusLabels,
}) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef(null)
  const [maxHeight, setMaxHeight] = useState('0px')
  const [opacity, setOpacity] = useState(0)
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    if (open) {
      setMaxHeight(contentRef.current.scrollHeight + 'px')
      setOpacity(1)
    } else {
      setMaxHeight('0px')
      setOpacity(0)
    }
  }, [open])

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text || '')
    toast.success('کپی شد!')
  }

  const downloadFile = (url, filename) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = blobUrl
        a.download = filename || ''
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(blobUrl)
      })
      .catch((err) => {
        console.error('خطا در دانلود فایل:', err)
        alert('دانلود فایل انجام نشد.')
      })
  }

  const handleNextStatus = async (e) => {
    e.stopPropagation()
    const nextStatus = statusFlow[order.orderStatus]
    if (!nextStatus) return
    await updateOrderStatus(nextStatus)
  }

  const handleCancel = async (e) => {
    e.stopPropagation()
    if (!confirm('آیا از لغو این سفارش مطمئن هستید؟')) return
    await updateOrderStatus('cancelled')
  }

  return (
    <div
      className={`border border-lightgray/50 overflow-hidden ${
        open ? 'border-2' : ''
      }`}
    >
      {/* هدر کشویی */}
      <div
        onClick={() => setOpen(!open)}
        className="grid grid-cols-8 text-xs sm:text-sm cursor-pointer hover:bg-gray-50"
      >
        {/* شماره ردیف */}
        <div className="px-3 py-4 flex justify-center items-center text-gray/70">
          <span>{order?.rowNumber || '-'}</span>
        </div>

        {/* کد سفارش */}
        <div className="px-3 py-4 flex justify-center items-center">
          <span>{order?.paymentRefId || '-'}</span>
        </div>

        {/* نام */}
        <div className="px-3 py-4 flex justify-center items-center">
          <span>{order?.userName || '-'}</span>
        </div>

        {/* مجموع پرداختی */}
        <div className="px-3 py-4 flex justify-center items-center text-dark gap-1">
          <span>{formatPriceToPersian(order?.totalAmount) || '-'}</span>
          <TomanIcon />
        </div>

        {/* وضعیت پرداخت */}
        <div className="px-3 py-4 flex justify-center items-center">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              order.paymentStatus === 'paid'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {order.paymentStatus === 'paid' ? 'پرداخت شده' : 'پرداخت نشده'}
          </span>
        </div>

        {/* وضعیت سفارش */}
        <div className="px-3 py-4 flex justify-center items-center">
          <span
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
              {
                processing: 'bg-orange-100 text-orange-800',
                registration: 'bg-purple-100 text-purple-800',
                shipped: 'bg-blue-100 text-blue-800',
                delivered: 'bg-green-200 text-green-900',
                cancelled: 'bg-red-100 text-red-800',
                completed: 'bg-green-100 text-green-800',
              }[order?.orderStatus] || 'bg-gray-100 text-gray-800'
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
                    delivered: '#15803d',
                    cancelled: '#dc2626',
                    completed: '#22c55e',
                  }[order?.orderStatus] || '#9ca3af',
              }}
            ></span>
            {{
              processing: 'درحال برسی',
              registration: 'ارسال به شاپرک',
              shipped: 'ارسال محصول',
              delivered: 'تحویل داده شده',
              cancelled: 'لغو شده',
              completed: 'تکمیل سفارش',
            }[order?.orderStatus] || '-'}
          </span>
        </div>

        {/* تاریخ ثبت */}
        <div className="px-3 py-4 flex justify-center items-center">
          <span>
            {order?.createdAt
              ? new Date(order.createdAt).toLocaleDateString('fa-IR')
              : '-'}
          </span>
        </div>

        {/* دکمه جزئیات */}
        <div className="px-3 py-4 flex justify-center items-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setOpen(!open)
            }}
            className="cursor-pointer"
          >
            <FiPlus
              size={20}
              className={`text-gray transition-all duration-300 ${
                open ? 'rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* جزئیات بیشتر */}
      <div
        ref={contentRef}
        style={{
          maxHeight,
          opacity,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease, opacity 0.3s ease',
        }}
      >
        <div className="pt-6 px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs sm:text-sm text-gray-700">
            {[
              {
                label: 'آدرس',
                value: order.shippingAddress?.address,
              },
              {
                label: 'کد ملی',
                value: order.shippingAddress?.nationalCode,
              },
              {
                label: 'کد پستی',
                value: order.shippingAddress?.postalCode,
              },
              {
                label: 'نام فروشگاه',
                value: order.shippingAddress?.shopName,
              },
              {
                label: 'شماره موبایل',
                value: order.shippingAddress?.phone,
              },
              {
                label: 'کد رهگیری',
                value: order.paymentRefId,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-lightgray/35 rounded-md p-2 flex justify-between items-center"
              >
                <span>
                  <span className="font-medium text-gray-500">
                    {item.label}:
                  </span>{' '}
                  <span className="text-gray-800">{item.value || '-'}</span>
                </span>
                {item.value && (
                  <button
                    onClick={() => handleCopy(item.value)}
                    className="text-gray-500 hover:text-dark cursor-pointer"
                  >
                    <FiCopy size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* نمایش مدارک */}
          {order.userDocuments && (
            <div className="mt-4">
              <span className="font-medium text-gray-500">مدارک:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.entries(order.userDocuments).map(([key, url]) => {
                  if (!url) return null

                  let label = ''
                  switch (key) {
                    case 'nationalCardFront':
                      label = 'کارت ملی (جلو)'
                      break
                    case 'nationalCardBack':
                      label = 'کارت ملی (پشت)'
                      break
                    case 'license':
                      label = 'جواز کسب'
                      break
                    case 'birthCertificate':
                      label = 'شناسنامه'
                      break
                    case 'bankCard':
                      label = 'کارت بانکی'
                      break
                    default:
                      label = key
                  }

                  return (
                    <div
                      key={key}
                      className="relative w-24 h-24 border border-gray-200 rounded-md overflow-hidden group"
                    >
                      <img
                        src={url}
                        alt={label}
                        className="w-full h-full object-cover"
                      />

                      {/* آیکون دانلود */}
                      <button
                        onClick={() => downloadFile(url, `${label}.jpg`)}
                        className="absolute bottom-1 right-1 bg-gray-700/60 text-white rounded p-1 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                      >
                        <FiDownload size={16} />
                      </button>

                      {/* آیکون چشم */}
                      <button
                        onClick={() => setPreviewImage(url)}
                        className="absolute bottom-1 left-1 bg-gray-700/60 text-white rounded p-1 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                      >
                        <FiEye size={16} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* مودال نمایش مدارک */}
          {previewImage && (
            <div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              onClick={() => setPreviewImage(null)}
            >
              <div
                className="relative max-w-3xl w-full max-h-[90vh] bg-white rounded-lg overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-2 left-2 p-2 bg-light rounded-lg text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  <X size={18} />
                </button>
                <img
                  src={previewImage}
                  alt="پیش‌نمایش"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </div>
          )}

          {/* نمایش محصولات خریداری شده */}
          {order.items?.length > 0 && (
            <div className="mt-4">
              <span className="font-medium text-gray-500">
                محصولات خریداری‌شده:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-2 items-center border border-lightgray rounded-md p-2"
                  >
                    {item.productId?.images?.[0] && (
                      <img
                        src={item.productId.images[0]}
                        alt={item.productId.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex flex-col">
                      <span className="text-gray-800 text-sm font-medium">
                        {item.productId?.name.toUpperCase() || '-'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs">
                          تعداد: {item.quantity || '-'}
                        </span>
                        <span className="text-gray-500 text-xs">
                          <span>رنگ: </span>
                          <span>
                            {item.selectedColor}
                            {item.selectedColor && item.bodyColors?.length
                              ? ' / '
                              : ''}
                            {item.bodyColors?.join(' - ')}
                          </span>
                        </span>

                        {item.selectedVariant && (
                          <span className="text-gray-500 text-xs">
                            مدل: {item.selectedVariant || '-'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 my-4 items-center justify-end">
            {/* دکمه مرحله بعدی وضعیت سفارش */}
            {order.orderStatus !== 'cancelled' &&
              order.orderStatus !== 'completed' && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    const nextStatus = statusFlow[order.orderStatus]
                    if (!nextStatus) return

                    updateOrderStatus(nextStatus)
                  }}
                  variant="primary"
                  size="sm"
                >
                  {statusLabels[statusFlow[order.orderStatus]] || 'مرحله بعد'}
                </Button>
              )}

            {/* دکمه لغو سفارش */}
            {order.orderStatus !== 'cancelled' &&
              order.orderStatus !== 'completed' && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!confirm('آیا از لغو این سفارش مطمئن هستید؟')) return

                    updateOrderStatus('cancelled')
                  }}
                  variant="ghost"
                  size="sm"
                  outline="true"
                >
                  لغو سفارش
                </Button>
              )}

            {/* دکمه حذف سفارش */}
            <button
              className="p-2 text-gray rounded-lg cursor-pointer border border-lightgray bg-lightgray/35 hover:text-red-500 hover:border-red-500 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              disabled={deleting}
            >
              <FiTrash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
