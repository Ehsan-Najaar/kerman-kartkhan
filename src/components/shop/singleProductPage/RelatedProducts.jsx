'use client'

import { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ProductCard } from '@/components/ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function RelatedProducts({ type, excludeId }) {
  const [relatedProducts, setRelatedProducts] = useState([])
  const [swiperInstance, setSwiperInstance] = useState(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const goToPrevSlide = () => swiperInstance?.slidePrev()
  const goToNextSlide = () => swiperInstance?.slideNext()
  const updateSwiperState = (swiper) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  useEffect(() => {
    async function fetchRelated() {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()

        const filtered = data.filter(
          (item) =>
            item._id !== excludeId && item.type === type && item.stock > 0
        )

        setRelatedProducts(filtered.slice(0, 10))
      } catch (err) {
        console.error('Error fetching related products:', err)
      }
    }

    fetchRelated()
  }, [type, excludeId])

  if (!relatedProducts.length) return null

  return (
    <div className="lg:px-24">
      <div className="flex items-center justify-between bg-lightgray/35 py-4 px-3 lg:rounded-t-2xl">
        <h3 className="h3">محصولات مرتبط</h3>

        {/* دکمه‌های کنترلی */}
        <div className="flex gap-2 z-10">
          <button
            className={`p-2 shadow bg-light rounded-lg transition-all cursor-pointer ${
              isBeginning ? 'opacity-20' : ''
            }`}
            onClick={goToPrevSlide}
            disabled={isBeginning}
            aria-label="مشاهده اسلاید قبلی"
          >
            <ChevronRight />
          </button>
          <button
            className={`p-2 shadow bg-light rounded-lg transition-all cursor-pointer ${
              isEnd ? 'opacity-20' : ''
            }`}
            onClick={goToNextSlide}
            disabled={isEnd}
            aria-label="مشاهده اسلاید بعدی"
          >
            <ChevronLeft />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper)
          updateSwiperState(swiper)
        }}
        onSlideChange={updateSwiperState}
        className="w-full h-96 bg-lightgray/35 rounded-b-2xl"
        loop={false}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 10 },
          480: { slidesPerView: 2.4, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 3.5, spaceBetween: 24 },
          1440: { slidesPerView: 4, spaceBetween: 16 },
        }}
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product._id} className="px-2 md:px-4">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
