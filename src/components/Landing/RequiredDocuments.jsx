'use client'

import { motion, useAnimation } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { fadeIn } from '../../../variants'

const documents = [
  {
    title: 'شماره تلفن همراه به نام خود',
    icon: '/images/mobile.png',
  },
  {
    title: 'برگه مالیاتی',
    icon: '/images/document.png',
    optional: true,
  },
  {
    title: 'جواز کسب و کار',
    icon: '/images/license.png',
    optional: true,
  },
  {
    title: 'تصاویر کارت ملی و شناسنامه',
    icon: '/images/user-id.png',
  },
  {
    title: 'شماره شبا یا حساب بانکی به نام خود',
    icon: '/images/card.png',
  },
]

export default function RequiredDocuments() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  useEffect(() => {
    if (inView) controls.start('show')
  }, [inView, controls])

  return (
    <motion.div
      ref={ref}
      variants={fadeIn('up', 0)}
      initial="hidden"
      animate={controls}
      id="RequiredDocuments"
      className="relative flex flex-col items-center justify-center"
    >
      {/* title */}
      <div className="flex flex-col items-center justify-center pb-12 space-y-4 p-4 xl:p-0">
        <p className="title-text text-center">
          موارد مورد نیاز برای دریافت کارتخوان
        </p>
        <article className="-space-y-5 text-section animate-smooth-bounce">
          <ChevronDown size={32} className="stroke-3" />
          <ChevronDown size={32} className="stroke-3" />
        </article>
      </div>

      {/* list of documents */}
      <div className="w-full xl:w-max overflow-x-auto scrollbar-hide p-4 xl:overflow-visible">
        <div className="flex gap-6 flex-nowrap min-w-max">
          {documents.map((doc) => (
            <div
              key={doc.title}
              className={`w-52 h-40 flex-shrink-0 flex flex-col items-center justify-center gap-4 p-4 bg-light rounded-2xl shadow-md hover:shadow-lg transition`}
            >
              <Image src={doc.icon} alt={doc.title} width={72} height={72} />

              <span className="main-text text-dark text-center">
                {doc.title}
              </span>

              {/* فقط برای برگه مالیاتی: دو خط */}
              {doc.title === 'برگه مالیاتی' && (
                <span className="small-text -mt-3 text-gray">(تا گام ۴)</span>
              )}

              {/* فقط برای جواز کسب و کار: یک خط */}
              {doc.title === 'جواز کسب و کار' && (
                <span className="small-text text-gray -mt-3">
                  (الزامی نیست)
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -right-80 -z-10 opacity-10 blur-[3px]">
        <Image
          src={'/images/browser-tab-logo.png'}
          alt=""
          width={400}
          height={400}
        />
      </div>
    </motion.div>
  )
}
