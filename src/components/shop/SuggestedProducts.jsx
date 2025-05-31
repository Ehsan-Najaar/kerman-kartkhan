'use client'

import { ProductCard } from '@/components/ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useRef } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import Button from '@/components/ui/Button'
import 'swiper/css'
import 'swiper/css/navigation'

export default function SuggestedProducts({ products }) {
  const swiperRef = useRef(null)
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  // نام دقیق محصولات پیشنهادی
  const suggestions = ['T3', 'D210', 'I90', 'P3', 'D230', 'H9']

  // فیلتر محصولات پیشنهادی بر اساس تطابق دقیق نام
  const suggestedProducts = useMemo(() => {
    return products.filter((p) =>
      suggestions.some(
        (keyword) =>
          p.name?.trim().toLowerCase() === keyword.trim().toLowerCase()
      )
    )
  }, [products])

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.params) {
      swiperRef.current.params.navigation.prevEl = prevRef.current
      swiperRef.current.params.navigation.nextEl = nextRef.current
      swiperRef.current.navigation.destroy()
      swiperRef.current.navigation.init()
      swiperRef.current.navigation.update()
    }
  }, [suggestedProducts])

  if (suggestedProducts.length === 0) return null

  return (
    <section className="py-12 px-24">
      <div className="flex items-center justify-between mb-6 ">
        <h3 className="h3 relative after:content-[''] after:absolute after:right-0 after:top-full after:mt-2 after:w-2 after:h-8 after:bg-secondary after:rounded-full after:-z-10">
          پیشنهادات ویژه کرمان کارتخوان
        </h3>

        <Button variant="secondary" outline fontWeight="medium" size="sm">
          مشاهده همه
        </Button>
      </div>

      <div className="relative">
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
          modules={[Navigation]}
          slidesPerView={5}
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
          {suggestedProducts.map((product) => (
            <SwiperSlide key={product._id} className="px-2">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
