'use client'

import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function BlogHeroSecScroller() {
  const images = [
    '/images/blog/blog-1.jpg',
    '/images/blog/blog-2.jpg',
    '/images/blog/blog-3.jpg',
    '/images/blog/blog-4.jpg',
    '/images/blog/blog-5.jpg',
    '/images/blog/blog-6.jpg',
  ]

  return (
    <div className="py-10">
      <Swiper
        modules={[EffectCoverflow, Autoplay]}
        effect="coverflow"
        grabCursor={false}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={30}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        allowTouchMove={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {images.map((img, index) => (
          <SwiperSlide
            key={index}
            className="flex justify-center items-center"
            style={
              ({ height: '350px' }, { width: '250px' }, { display: 'flex' })
            }
          >
            <div className="relative w-[350px] h-[390px] bg-lightgray overflow-hidden rounded-2xl shadow-lg transition-transform duration-300">
              {/* Skeleton */}
              <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>

              <Image
                src={img}
                alt={`Blog ${index + 1}`}
                fill
                draggable="false"
                className="object-cover text-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .swiper-slide-active > div {
          transform: scale(1.1);
        }
        .swiper-slide > div {
          transform: scale(0.3);
        }
      `}</style>
    </div>
  )
}
