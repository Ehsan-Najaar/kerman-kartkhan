'use client'

import { ProductCard } from '@/components/ProductCard'
import CustomRange from '@/components/ui/CustomRange'
import ProductCardSkeleton from '@/components/ui/Skeleton'
import { formatPriceToPersian } from '@/utils/formatPrice'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { fadeIn } from '../../../variants'

const tabs = ['آکبند', 'استوک']

export default function ProductsSection({
  products,
  activeTab,
  loading,
  setActiveTab,
  activeStep,
  setActiveStep,
  controlsRight,
}) {
  const [price, setPrice] = useState(20000000)

  // فیلتر محصولات بر اساس تب، قیمت و موجود بودن
  const filteredProducts = products
    .filter(
      (product) =>
        product.condition === activeTab &&
        product.price <= price &&
        product.stock > 0
    )
    .sort((a, b) => b.price - a.price)

  return (
    <motion.section
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      animate={controlsRight}
      className="max-w-5xl mx-auto md:px-4 lg:px-0"
    >
      <div className="bg-white rounded-3xl shadow-xl p-4 lg:p-8">
        {/* نمایش قیمت فعلی و اسلایدر */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-2 md:w-1/2">
            <span className="w-28 text-sm text-dark">۳ میلیون</span>
            <CustomRange
              min={3000000}
              max={20000000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              direction="rtl"
              isDescending={false}
            />
            <span className="w-28 text-sm text-dark">۲۰ میلیون</span>
          </div>

          <div className="text-xl lg:text-2xl font-bold text-dark">
            تا {formatPriceToPersian(price)} تومان
          </div>
        </div>

        {/* تب‌ها */}
        <div className="relative flex w-full rounded-2xl overflow-hidden shadow-sm bg-lightgray/20 border border-lightgray mb-8">
          <motion.div
            layout
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-0 bottom-0 w-1/2 bg-secondary rounded-2xl"
            style={{
              right: activeTab === 'استوک' ? '50%' : '0%',
            }}
          />
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                setActiveStep(null)
              }}
              className={`relative flex-1 p-3 main-text z-10 transition-colors duration-300 cursor-pointer ${
                activeTab === tab ? 'text-light' : 'text-dark'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* لیست محصولات */}
        <div className="h-96 max-h-96 overflow-auto lg:p-4">
          {loading ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="h-full text-center text-gray text-sm md:text-base grid place-items-center">
              محصول {activeTab} در این بازه قیمتی موجود نیست.
            </div>
          )}
        </div>
      </div>
    </motion.section>
  )
}
