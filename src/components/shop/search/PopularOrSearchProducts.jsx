'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function PopularOrSearchProducts({ search, products }) {
  if (!products.length) return null

  return (
    <div>
      <div className="text-sm text-gray-500 mb-2 flex items-center gap-1">
        <Star size={18} className="text-secondary" />
        {search ? 'نتایج جستجو' : 'محصولات پرفروش'}
      </div>
      <div className="flex items-center max-h-60 overflow-y-auto">
        {products
          .filter((product) => product.stock > 0)
          .slice(0, 5)
          .map((product) => (
            <Link
              href={`/shop/${`${product.brand}-${product.model}`.toLowerCase()}`}
              key={product._id}
              className="flex flex-col gap-2 items-center hover:bg-lightgray/20 p-4 transition border-l border-lightgray/35 last:border-none"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                width={80}
                height={80}
                className="object-cover rounded-md"
              />
              <span className="text-sm text-gray-700 line-clamp-1 text-center">
                {product.name.toUpperCase()}
              </span>
            </Link>
          ))}
      </div>
    </div>
  )
}
