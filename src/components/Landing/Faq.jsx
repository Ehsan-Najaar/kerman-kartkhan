'use client'
import { motion, useAnimation } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { fadeIn } from '../../../variants'

const faqData = [
  {
    question: 'چه مدارکی برای دریافت کارت‌خوان لازم است؟',
    answer: (
      <span className="flex flex-col md:flex-row items-center gap-2">
        برای دریافت کارت‌خوان، به این مدارک نیاز است :
        <a
          href="#RequiredDocuments"
          className=" text-blue-500 hover:underline ml-1"
        >
          [ لیست مدارک مورد نیاز ]
        </a>
      </span>
    ),
  },
  {
    question: 'کارت‌خوان به چه حساب‌هایی متصل می‌شود؟',
    answer: (
      <span className="flex flex-col md:flex-row items-center gap-2">
        کارتخوان ها به این حساب ها قابل اتصال هستند :
        <a href="#banks" className=" text-blue-500 hover:underline ml-1">
          [ مشاهده حساب‌ها ]
        </a>
      </span>
    ),
  },
  {
    question: 'آیا امکان خرید کارت‌خوان بدون جواز کسب وجود دارد؟',
    answer: (
      <span className="flex flex-col md:flex-row items-center gap-2">
        بله، بدون جواز کسب هم می‌توانید کارت‌خوان دریافت کنید. در این صورت، نام
        ثبت‌شده روی کارت‌خوان ممکن است با کسب‌وکار شما مطابقت نداشته باشد. مثلاً
        اگر تاکسی باشید، به‌جای اسم تاکسی، نام کسب‌وکار دیگری مانند سوپرمارکت
        ممکن است ثبت شود.
      </span>
    ),
  },
  {
    question: 'کارت‌خوان‌ها سیار هستند یا ثابت؟',
    answer: (
      <span className="flex flex-col md:flex-row items-center gap-2">
        کارت‌خوان‌ها هم سیار هستند و هم ثابت
        <a href="#productPage" className="text-blue-500 hover:underline ml-1">
          [ مشاهده محصولات ]
        </a>
      </span>
    ),
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null)
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  useEffect(() => {
    if (inView) controls.start('show')
  }, [inView, controls])

  const toggle = useCallback((index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
  }, [])

  return (
    <motion.div
      ref={ref}
      variants={fadeIn('up', 0)}
      initial="hidden"
      animate={controls}
      className="p-8 text-dark"
    >
      {/* title */}
      <div className="flex flex-col items-center justify-center pb-12 space-y-4">
        <p className="title-text">سوالات متداول</p>
        <article className="-space-y-5 text-section animate-smooth-bounce">
          <ChevronDown size={32} className="stroke-3" />
          <ChevronDown size={32} className="stroke-3" />
        </article>
      </div>

      {/* FAQ */}
      <section className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={item.question} // استفاده از question به‌عنوان key
            className={`bg-light rounded-2xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 ${
              openIndex === index
                ? 'shadow-section/50 text-secondary'
                : 'text-dark'
            }`}
            onClick={() => toggle(index)}
          >
            <div className="flex justify-between items-center p-6">
              <p className="body-text w-[80%]">{`${index + 1}. ${
                item.question
              }`}</p>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-8 pb-4 small-text text-gray">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </section>
    </motion.div>
  )
}
