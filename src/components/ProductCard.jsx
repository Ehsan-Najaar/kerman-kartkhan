import Button from '@/components/ui/Button'
import { formatPriceToPersian } from '@/utils/formatPrice'
import {
  BatteryCharging,
  Box,
  Plug,
  Plus,
  ShoppingCart,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi'

export function ProductCard({ product }) {
  return (
    <div className="w-56 bg-light p-2 rounded-lg border border-lightgray/50 shadow-sm space-y-4">
      <section>
        <figure className="rounded-lg border-b-2 border-section p-1">
          <Image
            src={product.images?.[0] || '/images/placeholder.png'}
            alt={product.title || 'محصول بدون عنوان'}
            width={140}
            height={140}
            property="all"
            className="object-contain h-36 w-36 mx-auto"
          />
        </figure>
        <div className="flex items-center gap-1 mt-4 font-semibold text-sm text-dark">
          <span>کارتخوان</span>
          {product.model || 'D210'}
        </div>
      </section>

      <section className="text-xs text-gray mt-2 space-y-1">
        {/* نوع دستگاه (آکبند یا استوک) */}
        <article className="flex items-center gap-1">
          <Box size={14} className="text-secondary" />
          <span>{product.type}</span>
        </article>

        {/* سرعت تراکنش */}
        <article className="flex items-center gap-1">
          <Zap size={14} className="text-secondary" />
          <span>{product.specs[0]?.value}</span>
          <span>{product.specs[0]?.key}</span>
        </article>

        {/* آیکون باتری یا کارتخوان */}
        <article className="flex items-center gap-1">
          {product.type === 'ثابت' ? (
            <Plug size={14} className="text-secondary" />
          ) : (
            <BatteryCharging size={14} className="text-secondary" />
          )}
          <span>
            {product.type === 'ثابت'
              ? product.specs[1]?.value
              : product.specs[2]?.value}
          </span>
          <span>
            {product.type === 'ثابت'
              ? product.specs[1]?.key
              : product.specs[2]?.key}
          </span>
        </article>
      </section>

      <div className="text-sm font-semibold text-dark mt-2">
        {formatPriceToPersian(product.price)} تومان
      </div>

      <section className="flex items-center gap-2">
        <Link
          href={`/shop/${`${product.brand}-${product.name}`.toLowerCase()}`}
        >
          <Button variant="primary" size="xs" fontWeight="medium">
            مشاهده محصول
          </Button>
        </Link>

        <button className="p-2 rounded-lg bg-section/50 text-secondary cursor-pointer">
          <span className="relative">
            <ShoppingCart size={20} />
            <Plus
              size={12}
              className="absolute -top-1 -right-4 bg-light rounded-full text-secondary"
            />
          </span>
        </button>
      </section>
    </div>
  )
}

export default function ProductCard2({
  product,
  onDelete,
  deleting,
  categoriesMap,
}) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef(null)
  const [maxHeight, setMaxHeight] = useState('0px')
  const [opacity, setOpacity] = useState(0)

  // نگاشت نام رنگ‌ها به کد رنگ HEX
  const colorMap = {
    قرمز: '#f44336',
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

  // نام دسته‌بندی از مپ یا آیدی
  const categoryName = categoriesMap?.[product.category] || product.category

  // کنترل انیمیشن باز و بسته شدن جزئیات محصول
  useEffect(() => {
    if (open) {
      setMaxHeight(contentRef.current.scrollHeight + 'px')
      setOpacity(1)
    } else {
      setMaxHeight('0px')
      setOpacity(0)
    }
  }, [open])

  // کامپوننت دایره‌ی دو رنگ برای bodyColors
  const DualColorCircle = ({ colors }) => {
    if (colors.length !== 2) return null // فقط دو رنگ را پشتیبانی می‌کند

    const [color1, color2] = colors.map((c) => colorMap[c] || '#ccc')

    return (
      <div
        title={colors.join(' / ')}
        className="w-4 h-4 rounded-full border border-gray"
        style={{
          background: `linear-gradient(90deg, ${color1} 50%, ${color2} 50%)`,
        }}
      />
    )
  }

  return (
    <div
      className={`border border-lightgray rounded-xl py-2 px-4 space-y-2 shadow-sm ${
        open ? 'border-2 ' : ''
      }`}
    >
      {/* هدر کشویی */}
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer select-none m-0"
      >
        <section className="w-44 flex gap-2 items-center">
          {product.images?.[0] && (
            <Image
              src={product.images[0]}
              alt={product.name}
              width={80}
              height={80}
              property="all"
              className="sm:w-20 w-16 sm:h-20 h-16 object-cover rounded-md"
            />
          )}
          <div className="flex flex-col justify-between">
            <h3 className="sm:text-lg text-sm font-bold capitalize">
              {product.name}
            </h3>
          </div>
        </section>

        <p className="hidden sm:block w-44 text-sm text-gray">
          دسته‌بندی: {categoryName}
        </p>

        <p className="flex items-center gap-1 w-44 text-dark text-xs sm:text-base mr-4 sm:mr-0">
          <span className="hidden sm:block">قیمت:</span>
          {formatPriceToPersian(product.price)} تومان
        </p>

        <span
          className={`sm:w-24 flex items-center justify-center gap-2 sm:px-2 sm:py-1 text-xs rounded-full whitespace-nowrap ${
            product.stock > 3
              ? 'bg-green-100 text-green-800'
              : product.stock === 0
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              product.stock > 3
                ? 'bg-green-800'
                : product.stock === 0
                ? 'bg-red-800'
                : 'bg-yellow-200 sm:bg-yellow-800'
            }`}
          ></span>
          <span className="hidden sm:block">
            {product.stock > 3
              ? 'موجود'
              : product.stock === 0
              ? 'ناموجود'
              : `تنها ${product.stock} عدد `}
          </span>
        </span>

        {/* علامت + و - برای باز و بسته */}
        <button
          type="button"
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation()
            setOpen(!open)
          }}
          className="cursor-pointer md:pl-3 pr-4 sm:pr-0"
        >
          <FiPlus
            size={24}
            className={`text-gray transition-all duration-300 ${
              open ? 'rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* جزئیات بیشتر با انیمیشن نرم */}
      <div
        ref={contentRef}
        style={{
          maxHeight,
          opacity,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease, opacity 0.3s ease',
        }}
      >
        <div className="pt-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm px-6 text-gray-700">
            <p className="sm:hidden bg-lightgray/35 rounded-md p-2">
              <span className="font-medium text-gray-500">دسته بندی: </span>
              <span className="text-gray-800">{categoryName}</span>
            </p>
            <p className="bg-lightgray/35 rounded-md p-2">
              <span className="font-medium text-gray-500">برند: </span>
              <span className="text-gray-800">{product.brand}</span>
            </p>
            <p className="bg-lightgray/35 rounded-md p-2">
              <span className="font-medium text-gray-500">مدل: </span>
              <span className="text-gray-800">{product.model}</span>
            </p>
            <p className="bg-lightgray/35 rounded-md p-2">
              <span className="font-medium text-gray-500">نوع دستگاه: </span>
              <span className="text-gray-800">{product.type}</span>
            </p>
            <p className="bg-lightgray/35 rounded-md p-2">
              <span className="font-medium text-gray-500">وضعیت: </span>
              <span className="text-gray-800">{product.condition}</span>
            </p>
            <p className="bg-lightgray/35 rounded-md p-2">
              <span className="font-medium text-gray-500">موجودی: </span>
              <span className="text-gray-800">{product.stock}</span>
            </p>
            <p className="bg-lightgray/35 rounded-md p-2">
              <span className="font-medium text-gray-500">تعداد فروش: </span>
              <span className="text-gray-800">{product.soldCount}</span>
            </p>
            <p className="bg-lightgray/35 rounded-md p-2">
              <span className="font-medium text-gray-500">تعداد بازدید: </span>
              <span className="text-gray-800">{product.views}</span>
            </p>
            <p className="bg-lightgray/35 rounded-md p-2">
              <span className="font-medium text-gray-500">محبوب: </span>
              <span className="text-gray-800">
                {product.isBestSeller ? '✅' : '❌'}
              </span>
            </p>

            {/* نمایش رنگ‌ها */}
            {(product.colors?.length > 0 || product.bodyColors?.length > 0) && (
              <div className="bg-lightgray/35 rounded-md p-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-500">رنگ‌ها:</span>

                  {/* دایره‌های رنگ عادی */}
                  {product.colors.map((color, idx) => (
                    <span
                      key={idx}
                      title={color}
                      className="w-4 h-4 rounded-full border border-gray"
                      style={{ backgroundColor: colorMap[color] || '#ccc' }}
                    />
                  ))}

                  {/* دایره دو رنگ بدن محصول */}
                  {product.bodyColors.length === 2 && (
                    <DualColorCircle colors={product.bodyColors} />
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 my-4 items-center justify-end">
            <Link
              href={`/admin/products/edit-product/${product._id}`}
              className="p-2 text-gray rounded-lg cursor-pointer border border-lightgray bg-lightgray/35 hover:text-dark hover:border-gray transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <FiEdit size={20} />
            </Link>
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
