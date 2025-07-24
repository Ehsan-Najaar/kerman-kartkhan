'use client'

import TomanIcon from '@/components/TomanIcon'
import Button from '@/components/ui/Button'
import { formatPriceToPersian } from '@/utils/formatPrice'
import Image from 'next/image'
import Link from 'next/link'

export default function CartSummary({ totalItems, totalPrice }) {
  return (
    <>
      {/* حالت دسکتاپ (lg به بالا) */}
      <div
        className="
          hidden md:block
          lg:sticky lg:top-32
          lg:w-[30%] h-full bg-light p-4 border border-lightgray/35 shadow rounded-lg space-y-6
        "
      >
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/icons/custom/Basket.svg"
            alt="سبد خرید"
            width={20}
            height={20}
            className="object-contain"
          />
          <h3 className="text-lg text-center font-bold text-gray">سبد خرید</h3>
        </div>

        <article className="flex items-center justify-between text-sm text-gray">
          <span>قیمت محصولات ({formatPriceToPersian(totalItems)})</span>
          <span>{formatPriceToPersian(totalPrice)} تومان</span>
        </article>
        <article className="flex items-center justify-between text-sm text-dark">
          <span>جمع سبد خرید</span>
          <span>{formatPriceToPersian(totalPrice)} تومان</span>
        </article>
        <Link href={'/shop/checkout/identity'}>
          <Button variant="primary" className="w-full">
            ادامه فرآیند خرید
          </Button>
        </Link>
      </div>

      {/* حالت موبایل تا md */}
      <div
        className="
          fixed bottom-16 left-0 right-0 z-20
          bg-light
          p-4 flex sm:flex-row items-center justify-between
          gap-4
          md:hidden
        "
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-gray">جمع سبد خرید</span>
          <span className="flex items-center gap-1 text-sm text-dark">
            {formatPriceToPersian(totalPrice)}
            <TomanIcon width={16} height={16} className="fill-dark" />
          </span>
        </div>
        <Link href={'/shop/checkout/identity'} className="w-full sm:w-auto">
          <Button variant="primary" className="w-full sm:w-auto" size="sm">
            ادامه فرآیند خرید
          </Button>
        </Link>
      </div>
    </>
  )
}
