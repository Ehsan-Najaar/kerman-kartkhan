import Button from '@/components/UI/Button'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="bg-primary h-[950px] lg:h-[750px] max-w-6xl mx-auto rounded-b-4xl lg:rounded-[48px] -mt-16 lg:-mt-24 p-4 lg:p-0 text-light">
      {/* top section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-4 py-10 lg:p-12">
        <div className="space-y-8 lg:space-y-24">
          <div className="space-y-4">
            <h1 className="h1 hidden lg:flex">
              از درخواست تا راه‌اندازی، کنار شما هستیم
            </h1>
            <h1 className="h2 text-center lg:hidden">
              از درخواست تا راه‌اندازی، کنار شما هستیم
            </h1>
            <p className="text-lightgray text-center lg:text-right">
              تحویل کارتخوان فعال شده در کمتر از ۲ روز کاری
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <Link href={'/order-steps'}>
              <Button variant="light" className="whitespace-nowrap">
                ثبت درخواست کارتخوان
              </Button>
            </Link>

            <Link href={'/shop'}>
              <Button variant="light" outline className="whitespace-nowrap">
                فروشگاه کرمان کارتخوان
              </Button>
            </Link>
          </div>
        </div>

        <figure className="relative">
          <div className="absolute top-6 left-10 sm:top-12 sm:left-20 lg:top-6 lg:left-10 w-64 h-64 lg:w-96 lg:h-96 bg-light/50 blur-2xl rounded-full z-0"></div>
          <Image
            src="/images/card-reader.png"
            alt="تصویر کارتخوان"
            width={450}
            height={450}
            draggable="false"
            loading="lazy"
            className="z-10 relative animate-smooth-bounce"
          />
        </figure>

        <div className="lg:hidden flex items-center gap-2 mt-4">
          <Button variant="light" size="sm" className="whitespace-nowrap">
            ثبت درخواست کارتخوان
          </Button>
          <Button
            variant="light"
            outline
            size="sm"
            className="whitespace-nowrap"
          >
            فروشگاه کرمان کارتخوان
          </Button>
        </div>
      </section>

      {/* title */}
      <div className="flex flex-col items-center justify-center pb-4 lg:-mt-14 space-y-4">
        <p className="main-text">کارتخوان تا چه قیمتی میخوای!؟</p>
        <article
          className="-space-y-5 text-section animate-smooth-bounce"
          aria-live="polite"
        >
          <ChevronDown size={32} className="stroke-3" aria-label="Arrow Down" />
          <ChevronDown size={32} className="stroke-3" aria-label="Arrow Down" />
        </article>
      </div>

      {/* bottom section */}
      <section className="max-w-5xl h-[500px] mx-auto rounded-3xl bg-light shadow-xl"></section>
    </div>
  )
}
