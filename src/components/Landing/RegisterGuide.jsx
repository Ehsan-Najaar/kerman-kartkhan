'use client'

import Button from '@/components/ui/Button'
import { motion, useAnimation } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { fadeIn } from '../../../variants'

export default function RegisterGuide() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const pathname = usePathname()
  const [showVideo, setShowVideo] = useState(false)
  const isLandingGuide = pathname === '/landing/guide'

  useEffect(() => {
    if (!isLandingGuide && inView) {
      controls.start('show')
    }
  }, [inView, controls, isLandingGuide])

  return (
    <div className="p-4 lg:p-0" ref={ref}>
      {/* title */}
      <motion.div
        variants={fadeIn('up', 0)}
        initial={isLandingGuide ? false : 'hidden'}
        animate={isLandingGuide ? false : controls}
        className="flex flex-col items-center justify-center pb-12 space-y-4"
      >
        <p className="title-text text-center">راهنمای درخواست و ثبت کارتخوان</p>
        <article className="-space-y-5 text-section animate-smooth-bounce">
          <ChevronDown size={32} className="stroke-3" />
          <ChevronDown size={32} className="stroke-3" />
        </article>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
        {/* تصویر */}
        <motion.section
          variants={fadeIn('up', 0.2)}
          initial={isLandingGuide ? false : 'hidden'}
          animate={isLandingGuide ? false : controls}
          className="lg:w-1/3 grid place-items-center"
        >
          {showVideo ? (
            <video
              src="https://kerman-kartkhan-2.storage.c2.liara.space/VID_20250613_052336_128.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=6b96162b-d379-44a7-ae3f-e3cd178bbf19%2F20250625%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250625T122321Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=2509cbe1bc1785792dd4bafa49dc51cd840dea521d2b2ec06902ed299129e2ab"
              controls
              autoPlay
              className="rounded-lg w-full h-auto"
            />
          ) : (
            <Image
              src="/images/covers/video-cover.png"
              alt="تصویر راهنمای ثبت کارتخوان"
              width={500}
              height={300}
              loading="lazy"
              draggable="false"
              className="rounded-lg cursor-pointer"
              onClick={() => setShowVideo(true)}
            />
          )}
        </motion.section>

        {/* متن و دکمه */}
        <section className="lg:w-2/3 flex flex-col justify-between lg:pr-8">
          <motion.p
            variants={fadeIn('up', 0.4)}
            initial={isLandingGuide ? false : 'hidden'}
            animate={isLandingGuide ? false : controls}
            className="body-text text-dark text-justify leading-loose"
          >
            دریافت کارت‌خوان با چند کلیک، از کرمان کارتخوان .<br /> در این ویدیو
            مراحل ثبت‌نام و دریافت کارت‌خوان از کرمان کارتخوان را مشاهده
            می‌کنید. ما این مسیر را برای شما ساده کرده‌ایم تا بدون نیاز به
            مراجعه حضوری، تنها با ارسال مدارک، در کمترین زمان ممکن دستگاه خود را
            دریافت کنید. <br /> کرمان کارتخوان با پشتیبانی سریع، ثبت‌نام آنلاین،
            و ارسال سراسری، همراه مطمئن شما در راه‌اندازی پذیرندگی بانکی است.
            همین حالا اقدام کنید و فروش خود را حرفه‌ای‌تر آغاز کنید.
          </motion.p>

          <motion.div
            variants={fadeIn('up', 0.6)}
            initial={isLandingGuide ? false : 'hidden'}
            animate={isLandingGuide ? false : controls}
            className="w-max mt-2 lg:mx-0"
          >
            <Button
              variant="primary"
              fontWeight="medium"
              aria-label="ثبت و سفارش کارتخوان"
            >
              ثبت و سفارش
            </Button>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
