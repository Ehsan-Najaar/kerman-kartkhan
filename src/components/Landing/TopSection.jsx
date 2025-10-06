'use client'

import Button from '@/components/ui/Button'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { fadeIn } from '../../../variants'

export default function TopSection() {
  const controlsLeft = useAnimation()
  const controlsRight = useAnimation()

  // اجرای انیمیشن هنگام mount
  useEffect(() => {
    controlsLeft.start('show')
    controlsRight.start('show')
  }, [controlsLeft, controlsRight])

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-4 py-10 lg:p-12">
      {/* متن و دکمه‌ها سمت چپ */}
      <motion.div
        variants={fadeIn('up', 0.1)}
        initial="hidden"
        animate={controlsLeft}
        className="space-y-8 lg:space-y-24"
      >
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
          <Link href="/shop">
            <Button
              variant="light"
              fontWeight="medium"
              className="whitespace-nowrap"
            >
              ثبت درخواست کارتخوان
            </Button>
          </Link>
          <Link href="/shop">
            <Button
              variant="light"
              fontWeight="medium"
              outline
              className="whitespace-nowrap"
            >
              فروشگاه کرمان کارتخوان
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* تصویر کارتخوان سمت راست */}
      <motion.figure
        variants={fadeIn('up', 0.3)}
        initial="hidden"
        animate={controlsRight}
        className="relative"
      >
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
      </motion.figure>

      {/* دکمه‌ها در موبایل */}
      <motion.div
        variants={fadeIn('up', 0.1)}
        initial="hidden"
        animate={controlsLeft}
        className="lg:hidden flex items-center gap-2 mt-4"
      >
        <Link href="/shop">
          <Button
            variant="light"
            size="sm"
            fontWeight="medium"
            className="whitespace-nowrap"
          >
            ثبت درخواست کارتخوان
          </Button>
        </Link>

        <Link href="/shop">
          <Button
            variant="light"
            outline
            size="sm"
            fontWeight="medium"
            className="whitespace-nowrap"
          >
            فروشگاه کرمان کارتخوان
          </Button>
        </Link>
      </motion.div>
    </section>
  )
}
