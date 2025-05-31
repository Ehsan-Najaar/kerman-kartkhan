'use client'

import { ProductCard } from '@/components/ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function ProductsByType({ products }) {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const swiperRef = useRef(null) // ذخیره رفرنس swiper
  const [selectedType, setSelectedType] = useState('همه')

  // استخراج typeهای یکتا
  const types = useMemo(() => {
    const unique = new Set(products.map((p) => p.type?.trim()).filter(Boolean))
    return ['همه', ...unique]
  }, [products])

  // فیلتر محصولات
  const filteredProducts = useMemo(() => {
    if (!selectedType || selectedType === 'همه') return products
    return products.filter(
      (p) => p.type?.trim().toLowerCase() === selectedType.trim().toLowerCase()
    )
  }, [products, selectedType])

  // بعد از رندر، دکمه‌ها رو به navigation وصل کن
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.params) {
      swiperRef.current.params.navigation.prevEl = prevRef.current
      swiperRef.current.params.navigation.nextEl = nextRef.current
      // init navigation
      swiperRef.current.navigation.destroy()
      swiperRef.current.navigation.init()
      swiperRef.current.navigation.update()
    }
  }, [selectedType]) // هر بار selectedType تغییر کرد این اتفاق بیفته

  const activeClass = 'bg-secondary text-light'
  const normalClass = 'bg-gray-100 hover:bg-gray-200'

  return (
    <div className="gap-4 px-24 py-12">
      <h3 className="text-center text-xl font-semibold mb-2">
        محصولات ما بر اساس نوع کارت‌خوان
      </h3>

      <figure className="relative">
        <Image
          src="/images/ProductsByCategories-bg.svg"
          alt="تصویر"
          width={1432}
          height={450}
          property="true"
          draggable="false"
          className="absolute left-0 top-0"
        />
      </figure>

      <section className="mt-12" dir="rtl">
        <h4 className="text-center relative z-10">
          نوع کارت‌خوان مورد نظرت رو انتخاب کن تا محصول مناسب رو پیدا کنی.
        </h4>

        {/* لیست انواع کارت‌خوان */}
        <div className="flex flex-wrap justify-center gap-4 my-4 relative z-10">
          {types.map((type) => (
            <span
              key={type}
              onClick={() => setSelectedType(type.trim())}
              className={`w-24 px-4 py-2 rounded-full text-sm text-center shadow-sm cursor-pointer transition-all duration-300 ${
                selectedType.trim().toLowerCase() === type.trim().toLowerCase()
                  ? activeClass
                  : normalClass
              }`}
              style={{ zIndex: 100 }} // اضافه کردن z-index برای اطمینان
            >
              {type}
            </span>
          ))}
        </div>

        {/* اسلایدر */}
        <div className="relative mt-12 max-w-[85%] mx-auto">
          <button
            ref={prevRef}
            className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 bg-light text-dark shadow p-2 rounded-lg cursor-pointer"
          >
            <ChevronRight />
          </button>

          <button
            ref={nextRef}
            className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 bg-light text-dark shadow p-2 rounded-lg cursor-pointer"
          >
            <ChevronLeft />
          </button>

          <Swiper
            key={selectedType}
            modules={[Navigation]}
            slidesPerView={4}
            spaceBetween={16}
            dir="rtl"
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            className="h-96"
          >
            {filteredProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  )
}
