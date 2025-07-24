'use client'

import { ProductCard } from '@/components/ProductCard'
import ProductCardSkeleton from '@/components/ui/Skeleton'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function ProductsByType({ products }) {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const swiperRef = useRef(null)
  const [selectedType, setSelectedType] = useState('همه')

  const loading = !products || products.length === 0

  const types = useMemo(() => {
    const unique = new Set(
      products
        .filter((p) => p.stock > 0)
        .map((p) => p.type?.trim())
        .filter(Boolean)
    )
    return ['همه', ...unique]
  }, [products])

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => p.stock > 0)

    if (!selectedType || selectedType === 'همه') return filtered

    return filtered.filter(
      (p) => p.type?.trim().toLowerCase() === selectedType.trim().toLowerCase()
    )
  }, [products, selectedType])

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.params) {
      swiperRef.current.params.navigation.prevEl = prevRef.current
      swiperRef.current.params.navigation.nextEl = nextRef.current
      swiperRef.current.navigation.destroy()
      swiperRef.current.navigation.init()
      swiperRef.current.navigation.update()
    }
  }, [selectedType])

  const activeClass = 'bg-secondary text-light'
  const normalClass = 'bg-gray-100 hover:bg-gray-200'

  return (
    <section className="gap-4 py-12 lg:px-24">
      <h3 className="lg:text-center lg:text-xl px-4 lg:px-0 font-semibold mb-2">
        انواع محصولات کرمان کارتخوان
      </h3>

      <figure className="hidden lg:block relative">
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

      <div className="relative lg:mt-12 mt-4 lg:max-w-[85%] mx-auto">
        <h4 className="hidden lg:block text-center relative z-10">
          نوع دسته بندی مورد نظرت رو انتخاب کن تا محصول مناسب رو پیدا کنی.
        </h4>

        {/* لیست انواع کارت‌خوان */}
        <div className="flex gap-2 my-4 px-4 py-2 lg:px-0 relative z-10 overflow-x-auto flex-nowrap lg:justify-center scrollbar-hide">
          {types.map((type) => (
            <span
              key={type}
              onClick={() => setSelectedType(type.trim())}
              className={`flex-shrink-0 lg:w-36 px-4 py-2 rounded-full text-xs md:text-sm text-center shadow-sm cursor-pointer transition-all duration-300 ${
                selectedType.trim().toLowerCase() === type.trim().toLowerCase()
                  ? activeClass
                  : normalClass
              }`}
              style={{ zIndex: 100 }}
            >
              {type}
            </span>
          ))}
        </div>

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
          key={selectedType}
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
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <ProductCardSkeleton />
                </SwiperSlide>
              ))
            : filteredProducts.map((product) => (
                <SwiperSlide key={product._id} className="px-4">
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  )
}
