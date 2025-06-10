'use client'

import { ChevronLeft, ChevronRight, User } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const comments = [
  {
    name: 'علیرضا محمدی',
    job: 'صاحب سوپرمارکت',
    comment:
      'از وقتی دستگاه کارتخوان شما رو گرفتم، دیگه مشکل قطعی یا کندی تراکنش ندارم. سرعت عالیه و پشتیبانی هم همیشه در دسترسه.',
  },
  {
    name: 'مریم ابراهیمی',
    job: 'مدیر فروشگاه پوشاک',
    comment:
      'دستگاه کارتخوان جمع‌وجور و با کیفیتیه. مشتری‌هام راحت‌تر پرداخت می‌کنن و گزارش‌گیری هم خیلی دقیق انجام میشه.',
  },
  {
    name: 'فرشاد رضایی',
    job: 'صاحب کافه',
    comment:
      'قبلاً دستگاهم مشکل زیاد داشت، ولی با این دستگاه جدید همه‌چی روون شده. هم تراکنش‌ها سریع انجام می‌شن، هم ظاهرش خیلی شیکه.',
  },
  {
    name: 'سحر یوسفی',
    job: 'صاحب داروخانه',
    comment:
      'خیلی از خریدم راضی‌ام. نصب راحت بود و خدمات پس از فروش هم واقعاً حرفه‌ایه. به همه‌ی همکارام توصیه می‌کنم.',
  },
  {
    name: 'احمد کرمی',
    job: 'مدیر فروش عمده',
    comment:
      'امکان اتصال به چند حساب بانکی و گزارش‌گیری لحظه‌ای باعث شده مدیریت فروش راحت‌تر بشه. واقعاً دستگاه خوبی ارائه دادید.',
  },
]

export default function CustomersComments() {
  const handleSlideStyle = (swiper) => {
    swiper.slides.forEach((slide) => {
      slide.style.opacity = '0.4'
      slide.style.transform = 'scale(0.85)'
      slide.style.filter = 'blur(0.5px)'
    })
    const activeSlide = swiper.slides[swiper.activeIndex]
    if (activeSlide) {
      activeSlide.style.opacity = '1'
      activeSlide.style.transform = 'scale(1)'
      activeSlide.style.filter = 'none'
    }
  }

  return (
    <div className="bg-gradient-to-t from-section/35 to-light py-16 rounded-2xl">
      <h3 className="h3 text-center relative after:content-[''] after:absolute after:right-0 after:top-0 after:mt-2 after:w-2 after:h-8 after:bg-secondary after:rounded-full after:-z-10">
        نظرات مشتریان کرمان کارتخوان
      </h3>

      <div className="relative mt-12">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.next-btn',
            prevEl: '.prev-btn',
          }}
          centeredSlides
          loop
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          slidesPerView={3}
          spaceBetween={30}
          className="px-8 h-52"
          onSlideChange={handleSlideStyle}
          onSwiper={handleSlideStyle}
        >
          {comments.map((item, index) => (
            <SwiperSlide key={index} className="transition-all duration-300">
              <div className="bg-gray/60 border border-gray text-light rounded-xl shadow-xl px-6 py-8 text-right h-full relative">
                {/* Avatar + Rating */}
                <div className="flex gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
                    <User size={24} className="text-gray" />
                  </div>
                  {/* Name + Job */}
                  <div>
                    <h3 className="font-bold mb-1 text-gray-100">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-300 mb-4">{item.job}</p>
                  </div>
                </div>

                {/* Comment */}
                <p className="text-sm leading-relaxed">{item.comment}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-10">
          <button className="prev-btn bg-gray text-light w-10 h-10 rounded-lg flex items-center justify-center hover:bg-dark transition cursor-pointer">
            <ChevronRight />
          </button>
          <button className="next-btn bg-gray text-light w-10 h-10 rounded-lg flex items-center justify-center hover:bg-dark transition cursor-pointer">
            <ChevronLeft />
          </button>
        </div>
      </div>
    </div>
  )
}
