'use client'
import Button from '@/components/ui/Button'
import { motion, useAnimation } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
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
  {
    question: 'مدت زمان فعال‌سازی کارت‌خوان چقدر است؟',
    answer: (
      <span>
        پس از ارسال کامل مدارک، کارت‌خوان معمولاً ظرف ۳ تا ۵ روز کاری فعال
        می‌شود.
      </span>
    ),
  },
  {
    question: 'آیا دستگاه‌ها دارای گارانتی هستند؟',
    answer: (
      <span>
        بله، تمامی کارت‌خوان‌ها دارای ۶ ماه گارانتی تعویض و ۱۲ ماه خدمات پس از
        فروش هستند.
      </span>
    ),
  },
  {
    question: 'هزینه ارسال کارت‌خوان چقدر است؟',
    answer: (
      <span>
        هزینه ارسال برای تهران رایگان است. برای شهرستان‌ها بسته به موقعیت
        جغرافیایی، هزینه‌ای جزئی دریافت می‌شود.
      </span>
    ),
  },
  {
    question: 'آیا کارت‌خوان‌ها به سیستم حسابداری متصل می‌شوند؟',
    answer: (
      <span>
        بله، برخی از مدل‌ها قابلیت اتصال به نرم‌افزارهای حسابداری را دارند.
        <a href="#integration" className="text-blue-500 hover:underline ml-1">
          [ اطلاعات بیشتر ]
        </a>
      </span>
    ),
  },
  {
    question: 'آیا امکان اقساطی خریدن کارت‌خوان وجود دارد؟',
    answer: (
      <span>
        بله، امکان خرید کارت‌خوان به‌صورت اقساطی وجود دارد. برای اطلاع از شرایط
        اقساط، با ما تماس بگیرید.
        <a href="#installment" className="text-blue-500 hover:underline ml-1">
          [ شرایط اقساط ]
        </a>
      </span>
    ),
  },
  {
    question: 'آیا نیاز به مراجعه حضوری هست؟',
    answer: (
      <span>
        خیر، تمام مراحل ثبت‌نام، ارسال مدارک و دریافت کارت‌خوان کاملاً غیرحضوری
        انجام می‌شود.
      </span>
    ),
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null)
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const pathname = usePathname()

  useEffect(() => {
    if (inView) controls.start('show')
  }, [inView, controls])

  const toggle = useCallback((index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
  }, [])

  const visibleFaqs = pathname === '/landing' ? faqData.slice(0, 4) : faqData

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

      {/* FAQ List */}
      <section className="space-y-4">
        {visibleFaqs.map((item, index) => (
          <div
            key={item.question}
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

      {/* CTA Button for Landing Page */}
      {pathname === '/landing' && (
        <div className="flex justify-center mt-10">
          <Link href="/faq">
            <Button
              variant="ghost"
              outline="true"
              fontWeight="medium"
              className="text-sm"
            >
              <p className="hidden md:block">
                سوال شما اینجا نیست؟ مشاهده همه سوالات
              </p>
              <p className="md:hidden">مشاهده همه سوالات متداول</p>
              <FiArrowLeft size={20} />
            </Button>
          </Link>
        </div>
      )}
    </motion.div>
  )
}
