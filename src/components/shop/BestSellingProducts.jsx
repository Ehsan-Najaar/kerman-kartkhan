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

export default function BestSellingProducts({ products }) {
  const swiperRef = useRef(null)
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const loading = !products || products.length === 0

  const bestSellingProducts = useMemo(() => {
    return products
      .filter((p) => p.stock > 0)
      .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
      .slice(0, 8)
  }, [products])

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.params) {
      swiperRef.current.params.navigation.prevEl = prevRef.current
      swiperRef.current.params.navigation.nextEl = nextRef.current
      swiperRef.current.navigation.destroy()
      swiperRef.current.navigation.init()
      swiperRef.current.navigation.update()
    }
  }, [bestSellingProducts])

  if (loading) {
    return (
      <section className="gap-4 py-12 lg:px-24">
        <h3 className="lg:text-center lg:text-xl px-4 lg:px-0 font-semibold mb-2">
          پرفروش ترین های کرمان کارتخوان
        </h3>

        <figure className="hidden lg:block relative">
          <Image
            src="/images/BestSellingProducts-bg.svg"
            alt="تصویر"
            width={1432}
            height={450}
            property="true"
            draggable="false"
            className="absolute left-0 top-0"
          />
        </figure>

        <div className="relative lg:mt-12 mt-4 lg:max-w-[85%] mx-auto">
          <h4 className="text-center relative z-10 mb-12">
            در حال بارگذاری پرفروش‌ترین محصولات...
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

  if (bestSellingProducts.length === 0) return null

  return (
    <section className="gap-4 py-12 lg:px-24">
      <h3 className="lg:text-center lg:text-xl px-4 lg:px-0 font-semibold mb-2">
        پرفروش ترین محصولات ما
      </h3>

      <figure className="hidden lg:block relative">
        <Image
          src="/images/BestSellingProducts-bg.svg"
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
          این‌ها پرفروش‌ترین دستگاه‌های کارت‌خوان ما تا این لحظه هستن که مورد
          اعتماد بیشتر مشتری‌ها قرار گرفتن.
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
          {bestSellingProducts.map((product) => (
            <SwiperSlide key={product._id} className="px-4">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
