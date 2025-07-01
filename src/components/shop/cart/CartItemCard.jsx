'use client'

import { formatPriceToPersian } from '@/utils/formatPrice'
import Image from 'next/image'
import Link from 'next/link'
import { FiImage, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'

export default function CartItemCard({ product, onUpdateQuantity, onRemove }) {
  // نقشه رنگ‌ها
  const colorMap = {
    قرمز: '#ff0000',
    آبی: '#2196f3',
    نارنجی: '#ff9800',
    زرد: '#ffeb3b',
    مشکی: '#000000',
    سفید: '#ffffff',
    'طوسی روشن': '#d3d3d3',
    سورمه‌ای: '#1b1f5e',
    'آبی نفتی': '#3b6978',
    'آبی روشن': '#87cefa',
  }

  const colorHex = product.selectedColor
    ? colorMap[product.selectedColor] || '#ccc'
    : null

  return (
    <div className="flex overflow-hidden bg-light rounded-lg border border-lightgray/35 shadow">
      <div className="w-full md:w-[90%] lg:w-[95%] flex flex-col md:flex-row md:items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-4 sm:gap-6 w-full">
          <Link
            href={`/shop/${`${product.productId?.brand || ''}-${
              product.productId?.name || ''
            }`.toLowerCase()}`}
            className="relative w-20 h-20 sm:w-32 sm:h-32 md:w-32 md:h-32"
          >
            <figure className="relative w-20 h-20 lg:w-32 lg:h-32 flex items-center justify-center rounded-2xl overflow-hidden">
              <Image
                src={
                  product?.productId?.images?.[0] || (
                    <FiImage size={48} className="text-gray" />
                  )
                }
                alt={product?.productId?.name || 'بدون نام'}
                fill
                priority
                sizes="(max-width: 768px) 90px, 190px"
                className="object-center object-contain"
              />
            </figure>
          </Link>

          <div className="flex flex-col lg:gap-4 justify-between w-full">
            <Link
              href={`/shop/${`${product.productId?.brand || ''}-${
                product.productId?.name || ''
              }`.toLowerCase()}`}
              className="block lg:w-64 text-sm sm:text-lg font-medium"
            >
              کارتخوان {product.productId?.name?.toUpperCase() || 'بدون نام'}
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-2">
              {/* ✅ نمایش variant اگر وجود داشته باشه */}
              {product.selectedVariant && (
                <span className="text-gray text-xs sm:text-sm">
                  مدل:{' '}
                  <span className="font-medium text-dark">
                    {product.selectedVariant}
                  </span>
                </span>
              )}

              {/* ✅ نمایش رنگ به‌صورت دایره رنگی */}
              {colorHex && (
                <span className="flex items-center gap-1 text-gray text-xs sm:text-sm">
                  رنگ:
                  <span
                    className="w-5 h-5 rounded-full border border-gray-300"
                    style={{ backgroundColor: colorHex }}
                    title={product.selectedColor}
                  ></span>
                </span>
              )}

              {/* ✅ نمایش type اگر وجود داشته باشه */}
              {product.productId?.type && (
                <span className="text-gray text-xs sm:text-sm">
                  نوع:{' '}
                  <span className="font-medium text-dark">
                    {product.productId.type}
                  </span>
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-2">
              <span className="text-gray text-xs sm:text-sm">
                {formatPriceToPersian(product.productId?.price || 0)} تومان
              </span>

              <div className="w-max flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => onUpdateQuantity(product.quantity - 1)}
                  className="px-2 py-2 text-gray-600 cursor-pointer"
                >
                  <FiMinus />
                </button>
                <span className="w-10 text-center text-gray-700">
                  {product.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(product.quantity + 1)}
                  className="px-2 py-2 text-gray-600 cursor-pointer"
                >
                  <FiPlus />
                </button>
              </div>

              <span className="w-28 text-left text-dark text-xs sm:text-base font-semibold sm:ml-4">
                {formatPriceToPersian(
                  (product.productId?.price || 0) * product.quantity
                )}{' '}
                تومان
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => onRemove(product)}
        className="md:w-[5%] w-[15%] grid place-items-center text-gray bg-lightgray hover:bg-red-600 hover:text-light transition-all duration-300 cursor-pointer"
      >
        <FiTrash2 size={24} />
      </button>
    </div>
  )
}
