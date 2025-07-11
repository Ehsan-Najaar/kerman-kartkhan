'use client'

import TomanIcon from '@/components/TomanIcon'
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

  const imageUrl = product?.productId?.images?.[0]
  const colorHex = product.selectedColor
    ? colorMap[product.selectedColor] || '#ccc'
    : null

  // 👉 گرفتن قیمت variant انتخاب‌شده
  const selectedVariant = product.selectedVariant
  const variants = product.productId?.variants || []

  const matchedVariant = variants.find((v) => v.name === selectedVariant)
  const unitPrice = matchedVariant?.price || product.productId?.price || 0

  function getDualColorGradient(colors) {
    if (!colors || colors.length !== 2) return '#ccc'
    const [color1, color2] = colors
    const hex1 = colorMap[color1] || '#ccc'
    const hex2 = colorMap[color2] || '#ccc'
    return `linear-gradient(to right, ${hex1} 50%, ${hex2} 50%)`
  }

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
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={product.productId?.name || 'بدون نام'}
                  fill
                  priority
                  sizes="(max-width: 768px) 90px, 190px"
                  className="object-center object-contain"
                />
              ) : (
                <div className="text-gray-400 text-4xl flex justify-center items-center w-full h-full">
                  <FiImage />
                </div>
              )}
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

            <div className="flex sm:items-center gap-4 mt-2">
              {/* ✅ نمایش variant اگر وجود داشته باشه */}
              {product.selectedVariant && (
                <span className="text-gray text-xs sm:text-sm">
                  مدل:{' '}
                  <span className="font-medium text-dark">
                    {product.selectedVariant}
                  </span>
                </span>
              )}

              {product.bodyColors?.length === 2 ? (
                <>
                  <span className="flex items-center gap-1 text-gray text-xs sm:text-sm">
                    رنگ:
                  </span>
                  <span
                    className="md:w-7 md:h-7 w-4 h-4 rounded-full md:p-1 border border-lightgray flex items-center justify-center"
                    title={product.bodyColors.join(' / ')}
                  >
                    <div
                      className="w-full h-full rounded-full border"
                      style={{
                        background: getDualColorGradient(product.bodyColors),
                      }}
                    ></div>
                  </span>
                </>
              ) : colorHex ? (
                <>
                  <span className="flex items-center gap-1 text-gray text-xs sm:text-sm">
                    رنگ:
                  </span>
                  <span
                    className="md:w-7 md:h-7 w-4 h-4 rounded-full md:p-1 border border-lightgray flex items-center justify-center"
                    title={product.selectedColor}
                  >
                    <div
                      className="w-full h-full border rounded-full"
                      style={{ backgroundColor: colorHex }}
                    ></div>
                  </span>
                </>
              ) : null}

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
              <span className="flex items-center gap-1 text-gray text-xs sm:text-sm">
                {formatPriceToPersian(unitPrice)}
                <TomanIcon className="fill-gray" />
              </span>

              <div className="w-max flex items-center border border-gray-300 rounded-lg">
                {product.quantity === 1 ? (
                  <button
                    onClick={() => onRemove(product)}
                    className="px-2 py-2 text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    <FiTrash2 />
                  </button>
                ) : (
                  <button
                    onClick={() => onUpdateQuantity(product.quantity - 1)}
                    className="px-2 py-2 text-gray-600 cursor-pointer"
                  >
                    <FiMinus />
                  </button>
                )}

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

              <span className="flex items-center gap-1 w-28 text-left text-dark text-xs sm:text-base sm:ml-4">
                {formatPriceToPersian(unitPrice * product.quantity)}
                <TomanIcon width={16} height={16} className="fill-dark" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
