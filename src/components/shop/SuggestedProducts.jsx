'use client'

import { ProductCard } from '@/components/ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useRef } from 'react'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import Button from '@/components/ui/Button'
import Image from 'next/image'
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
    <section className="gap-4 py-12 px-24">
      <h3 className="h3 text-center pr-4 relative after:content-[''] after:absolute after:right-0 after:-top-2 after:mt-2 after:w-2 after:h-8 after:rounded-full after:-z-10">
        پیشنهادات ویژه کرمان کارتخوان
      </h3>

      <figure className="relative">
        <Image
          src="/images/SuggestedProducts-bg.svg"
          alt="تصویر"
          width={1432}
          height={450}
          property="true"
          draggable="false"
          className="absolute left-0 top-0"
        />
      </figure>

      <div className="relative mt-12 max-w-[85%] mx-auto">
        <div className="flex items-center justify-between mb-6 px-4">
          <h4 className="text-center relative z-10">
            این‌ها محصولاتی هستن که ما با توجه به نیازهای مختلف کسب‌وکارها بهت
            پیشنهاد می‌کنیم تا بهترین انتخاب رو داشته باشی.
          </h4>

          <Button variant="light" fontWeight="medium" size="sm">
            مشاهده همه
          </Button>
        </div>

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
          modules={[Navigation, Autoplay]}
          slidesPerView={4}
          spaceBetween={16}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
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
