import Button from '@/components/UI/Button'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

export default function RegisterGuide() {
  return (
    <div className="p-4">
      {/* title */}
      <div className="flex flex-col items-center justify-center pb-12 space-y-4">
        <p className="title-text text-center">راهنمای درخواست و ثبت کارتخوان</p>
        <article
          className="-space-y-5 text-section animate-smooth-bounce"
          aria-live="polite"
        >
          <ChevronDown size={32} className="stroke-3" aria-label="Arrow Down" />
          <ChevronDown size={32} className="stroke-3" aria-label="Arrow Down" />
        </article>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
        <section className="lg:w-1/3 grid place-items-center">
          <Image
            src={'/images/bg-layers.png'}
            alt="تصویر راهنمای ثبت کارتخوان"
            width={500}
            height={300}
            loading="lazy"
            draggable="false"
          />
        </section>

        <section className="lg:w-2/3 flex flex-col justify-between lg:pr-8">
          <p className="body-text text-dark lg:text-justify text-center leading-loose">
            دریافت کارت‌خوان با چند کلیک، از کرمان کارتخوان .<br /> در این ویدیو
            مراحل ثبت‌نام و دریافت کارت‌خوان از کرمان کارتخوان را مشاهده
            می‌کنید. ما این مسیر را برای شما ساده کرده‌ایم تا بدون نیاز به
            مراجعه حضوری، تنها با ارسال مدارک، در کمترین زمان ممکن دستگاه خود را
            دریافت کنید. <br /> کرمان کارتخوان با پشتیبانی سریع، ثبت‌نام آنلاین،
            و ارسال سراسری، همراه مطمئن شما در راه‌اندازی پذیرندگی بانکی است.
            همین حالا اقدام کنید و فروش خود را حرفه‌ای‌تر آغاز کنید.
          </p>
          <Button
            variant="secondary"
            className="w-max mt-2 mx-auto lg:mx-0"
            aria-label="ثبت و سفارش کارتخوان"
          >
            ثبت و سفارش
          </Button>
        </section>
      </div>
    </div>
  )
}
