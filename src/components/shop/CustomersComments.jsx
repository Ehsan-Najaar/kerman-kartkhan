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
      slide.style.filter = 'blur(1px)'
    })
    const activeSlide = swiper.slides[swiper.activeIndex]
    if (activeSlide) {
      activeSlide.style.opacity = '1'
      activeSlide.style.transform = 'scale(1)'
      activeSlide.style.filter = 'none'
    }
  }

  return (
    <div
      className="py-16 rounded-2xl"
      style={{
        background: `linear-gradient(to top, transparent 0%, #fbf5f6 30%, #fbf5f6 70%, transparent 100%)`,
      }}
    >
      <h3 className="lg:text-center lg:text-xl px-4 lg:px-0 font-semibold mb-2">
        نظرات مشتریان کرمان کارتخوان
      </h3>

      <div className="relative lg:mt-12 mt-4">
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
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="px-8 py-2 h-56"
          onSlideChange={handleSlideStyle}
          onSwiper={handleSlideStyle}
        >
          {comments.map((item, index) => (
            <SwiperSlide key={index} className="transition-all duration-300">
              <div
                className="bg-light shadow text-dark rounded-xl scale-95 
                      px-6 py-8 text-right h-full relative 
                      md:px-6 md:py-8 
                      sm:px-3 sm:py-4"
              >
                {/* Avatar + Rating */}
                <div className="flex gap-2 mb-4">
                  <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-section/50 flex items-center justify-center text-sm font-bold">
                    <User size={20} className="text-dark" />
                  </div>
                  {/* Name + Job */}
                  <div>
                    <h3 className="font-bold mb-1 text-dark text-sm sm:text-xs">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray/80 mb-4">{item.job}</p>
                  </div>
                </div>

                {/* Comment */}
                <p className="text-sm sm:text-xs leading-relaxed">
                  {item.comment}
                </p>
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
