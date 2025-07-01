'use client'

import Button from '@/components/ui/Button'
import { formatPriceToPersian } from '@/utils/formatPrice'
import Image from 'next/image'
import Link from 'next/link'

export default function CartSummary({ totalItems, totalPrice }) {
  return (
    <div
      className="
        lg:sticky lg:top-24
        lg:w-[30%] h-full bg-light p-4 border border-lightgray/35 shadow rounded-lg space-y-6
      "
    >
      <div className="flex items-center justify-center gap-2">
        <h3 className="text-lg text-center font-bold text-dark">سبد خرید</h3>
        <Image
          src={'/icons/Basket_alt_3_duotone.svg'}
          alt="سبد خرید"
          width={32}
          height={32}
        />
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
  )
}
