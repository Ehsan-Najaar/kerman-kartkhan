'use client'

import { ProductCard } from '@/components/ProductCard'
import ProductCardSkeleton from '@/components/ui/Skeleton'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useRef } from 'react'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'

export default function SuggestedProducts({ products }) {
  const swiperRef = useRef(null)
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const loading = !products || products.length === 0

  const suggestions = ['T3', 'D210', 'I90', 'P3', 'D230', 'H9', 'S915']

  const suggestedProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.stock > 0 &&
        suggestions.some(
          (keyword) =>
            p.model?.trim().toLowerCase() === keyword.trim().toLowerCase()
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

  // اگر لودینگ باشه، اسکلتون نشون بده
  if (loading) {
    return (
      <section className="gap-4 py-12 lg:px-24">
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
          <h4 className="text-center relative z-10 mb-12">
            در حال بارگذاری محصولات پیشنهادی...
          </h4>

          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={1.5}
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
            breakpoints={{
              0: {
                slidesPerView: 1.5,
              },
              480: {
                slidesPerView: 2.3,
              },
              640: {
                slidesPerView: 2.6,
              },
              1024: {
                slidesPerView: 3.1,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="h-96"
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <SwiperSlide key={index} className="px-2">
                <ProductCardSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    )
  }

  if (suggestedProducts.length === 0) return null

  return (
    <section className="gap-4 py-12 lg:px-24">
      <h3 className="lg:text-center lg:text-xl px-4 lg:px-0 font-semibold mb-2">
        پیشنهادات ویژه ما
      </h3>

      <figure className="hidden lg:block relative">
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

      <div className="relative lg:mt-12 mt-4 lg:max-w-[85%] mx-auto">
        <h4 className="hidden lg:block text-center relative z-10 mb-12">
          این‌ها محصولاتی هستن که ما با توجه به نیازهای مختلف کسب‌وکارها بهت
          پیشنهاد می‌کنیم تا بهترین انتخاب رو داشته باشی.
        </h4>

        <button
          ref={prevRef}
          className="hidden lg:block absolute -right-16 top-1/2 -translate-y-1/2 z-10 bg-light text-dark shadow p-2 rounded-lg cursor-pointer"
        >
          <ChevronRight />
        </button>

        <button
          ref={nextRef}
          className="hidden lg:block absolute -left-16 top-1/2 -translate-y-1/2 z-10 bg-light text-dark shadow p-2 rounded-lg cursor-pointer"
        >
          <ChevronLeft />
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
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
          breakpoints={{
            0: {
              slidesPerView: 1.5,
            },
            480: {
              slidesPerView: 2.3,
            },
            640: {
              slidesPerView: 2.6,
            },
            1024: {
              slidesPerView: 3.1,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          className="h-96"
        >
          {suggestedProducts.map((product) => (
            <SwiperSlide key={product._id} className="px-4">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
