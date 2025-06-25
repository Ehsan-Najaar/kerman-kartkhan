'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'

export default function CartItemCard({ product, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex rounded-lg overflow-hidden bg-light">
      <div className="w-full md:w-[90%] lg:w-[95%] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral rounded-lg shadow-md p-4">
        <div className="flex items-center gap-4 sm:gap-6 w-full">
          <Link
            href={`/products/${product.productId.slug || '#'}`}
            className="relative w-20 h-20 sm:w-32 sm:h-32 md:w-32 md:h-32"
          >
            <figure className="relative w-20 h-20 lg:w-32 lg:h-32 flex items-center justify-center rounded-2xl overflow-hidden">
              <Image
                src={product?.productId?.images?.[0] || '/default-image.jpg'}
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
              href={`/shop/${`${product.productId.brand}-${product.productId.name}`.toLowerCase()}`}
              className="block lg:w-64 text-sm sm:text-base font-semibold"
            >
              {product.productId.name}
            </Link>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-2">
              <span className="text-dark text-xs sm:text-sm">
                {product.productId.price.toLocaleString('en-US')} تومان
              </span>

              <div className="w-max flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() =>
                    onUpdateQuantity(
                      product.productId._id,
                      product.quantity - 1
                    )
                  }
                  className="px-2 py-2 text-gray-600"
                >
                  <FiMinus />
                </button>
                <span className="w-10 text-center text-gray-700">
                  {product.quantity}
                </span>
                <button
                  onClick={() =>
                    onUpdateQuantity(
                      product.productId._id,
                      product.quantity + 1
                    )
                  }
                  className="px-2 py-2 text-gray-600"
                >
                  <FiPlus />
                </button>
              </div>

              <span className="text-primary text-xs sm:text-base font-semibold sm:ml-4">
                {(product.productId.price * product.quantity).toLocaleString(
                  'en-US'
                )}{' '}
                تومان
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => onRemove(product)}
        className="md:w-[5%] w-[15%] grid place-items-center text-neutral bg-lightGray hover:bg-red-600 hover:text-light transition-all duration-300"
      >
        <FiTrash2 size={24} />
      </button>
    </div>
  )
}
