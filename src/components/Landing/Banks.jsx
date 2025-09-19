import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { fadeIn } from '../../../variants'

const banks = [
  { id: 1, name: 'اقتصاد نوین', image: '/images/banks/eghtesad-novin.png' },
  { id: 2, name: 'ایران زمین', image: '/images/banks/Iranzamin.jpg' },
  { id: 3, name: 'آینده', image: '/images/banks/Ayande.png' },
  { id: 4, name: 'پاسارگاد', image: '/images/banks/Pasargad.png' },
  { id: 5, name: 'پست بانک', image: '/images/banks/postbank.png' },
  { id: 6, name: 'تجارت', image: '/images/banks/Tejarat.png' },
  { id: 7, name: 'توسعه تعاون', image: '/images/banks/ttbank.png' },
  { id: 8, name: 'خاورمیانه', image: '/images/banks/khavarmiane.png' },
  { id: 9, name: 'دی', image: '/images/banks/Day.png' },
  { id: 10, name: 'رسالت', image: '/images/banks/resalat.png' },
  { id: 11, name: 'رفاه کارگران', image: '/images/banks/Refah.png' },
  { id: 12, name: 'سپه', image: '/images/banks/sepah.png' },
  { id: 13, name: 'سرمایه', image: '/images/banks/sarmaye.png' },
  { id: 14, name: 'سینا', image: '/images/banks/Sina.png' },
  { id: 15, name: 'شهر', image: '/images/banks/Shahr.png' },
  { id: 16, name: 'صادرات', image: '/images/banks/Saderat.png' },
  { id: 17, name: 'صنعت و معدن', image: '/images/banks/Sanatvamadan.png' },
  {
    id: 18,
    name: 'قرض الحسنه مهر ایران',
    image: '/images/banks/Mehr.png',
  },
  { id: 19, name: 'کارآفرین', image: '/images/banks/karafarin.png' },
  { id: 20, name: 'کشاورزی', image: '/images/banks/Keshavarzi.png' },
  { id: 21, name: 'گردشگری', image: '/images/banks/gardeshgary.png' },
  { id: 22, name: 'مسکن', image: '/images/banks/Maskan.png' },
  { id: 23, name: 'ملت', image: '/images/banks/Mellat.png' },
  { id: 24, name: 'موسسه اعتباری ملل', image: '/images/banks/melal.png' },
  { id: 25, name: 'موسسه اعتباری نور', image: '/images/banks/noor.png' },
  { id: 26, name: 'سامان', image: '/images/banks/Saman.png' },
]

const companies = [
  {
    name: 'پاسارگاد',
    image: '/images/psp/pasargad.png',
    bankIds: [1, 4, 5, 6, 7, 8, 11, 12, 14, 15, 16, 18, 21, 22, 25],
  },
  {
    name: 'پرداخت نوین',
    image: '/images/psp/pardakht-novin.png',
    bankIds: [1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17, 18, 20, 21, 22],
  },
  {
    name: 'سپهر',
    image: '/images/psp/sepehr.png',
    bankIds: [4, 5, 8, 10, 12, 14, 15, 16, 18, 19, 20, 21],
  },
  {
    name: 'ایران کیش',
    image: '/images/psp/iran-kish.png',
    bankIds: [1, 3, 4, 5, 6, 8, 11, 12, 13, 14, 15, 16, 18, 19, 21, 23, 25],
  },
  {
    name: 'به پرداخت ملت',
    image: '/images/psp/behpardakht.png',
    bankIds: [3, 7, 8, 9, 10, 12, 14, 15, 17, 18, 19, 20, 21, 23, 24],
  },
  {
    name: 'آسان پرداخت',
    image: '/images/psp/asan-pardakht.png',
    bankIds: [1, 3, 4, 5, 7, 8, 9, 10, 12, 16, 18, 20, 21],
  },
  {
    name: 'سداد',
    image: '/images/psp/sadad.png',
    bankIds: [12],
  },
  {
    name: 'فن آوا',
    image: '/images/psp/fan-ava.png',
    bankIds: [2, 4, 5, 6, 12, 13, 14, 18, 21, 25],
  },
]

export default function Banks() {
  const [activeCompany, setActiveCompany] = useState(companies[0])
  const [activeTab, setActiveTab] = useState(companies[0].name)

  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  useEffect(() => {
    if (inView) controls.start('show')
  }, [inView, controls])

  // فیلتر کردن بانک‌ها برای شرکت فعال
  const activeBanks = useMemo(() => {
    return banks.filter((bank) => activeCompany.bankIds.includes(bank.id))
  }, [activeCompany, banks])

  // انیمیشن‌ها
  const tabAnimation = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
    transition: { duration: 0.4 },
  }

  const bankAnimation = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.4 },
  }

  return (
    <motion.div
      ref={ref}
      variants={fadeIn('up', 0)}
      initial="hidden"
      animate={controls}
      id="banks"
      className="p-4 lg:p-0"
    >
      {/* نمایش عنوان */}
      <div className="flex flex-col items-center justify-center pb-12 space-y-4">
        <p className="title-text text-center">
          کارت‌خوان‌ها با این بانک‌ها ثبت و فعال می‌شوند.
        </p>
        <article className="-space-y-5 text-section animate-smooth-bounce">
          <ChevronDown size={32} className="stroke-3" />
          <ChevronDown size={32} className="stroke-3" />
        </article>
      </div>

      {/* دکمه‌های تب شرکت‌ها */}
      <div className="relative w-full overflow-x-auto rounded-2xl shadow-sm bg-lightgray/20 border border-lightgray mb-4">
        <div className="flex min-w-max lg:min-w-0 lg:w-full relative">
          {/* انیمیشن پس‌زمینه */}
          <motion.div
            layout
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-0 bottom-0 bg-secondary rounded-2xl z-0"
            style={{
              right: `${
                (companies.findIndex((company) => company.name === activeTab) *
                  100) /
                companies.length
              }%`,
              width: `${100 / companies.length}%`,
            }}
          />

          {/* دکمه‌های تب شرکت‌ها */}
          {companies.map((company) => (
            <motion.button
              key={company.name}
              onClick={() => {
                setActiveTab(company.name)
                setActiveCompany(company)
              }}
              className={`w-52 relative flex-shrink-0 lg:flex-1 flex items-center justify-center gap-2  px-4 py-2 z-10 transition-colors duration-300 cursor-pointer whitespace-nowrap ${
                activeTab === company.name ? 'text-light' : 'text-dark'
              }`}
              {...tabAnimation}
            >
              <figure className="h-8 w-8">
                <Image
                  src={company.image}
                  alt={company.name}
                  width={32}
                  height={32}
                  draggable="false"
                  className="w-full h-full"
                />
              </figure>
              <span className="text-sm">{company.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* نمایش بانک‌ها */}
      <AnimatePresence mode="wait">
        <motion.ul
          key={activeTab}
          {...bankAnimation}
          className="list-none grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 place-items-center gap-2 pt-5"
        >
          {activeBanks.map((bank, index) => (
            <li
              key={`${bank.id}-${index}`}
              className="w-28 h-28 bg-light rounded-lg shadow-sm flex items-center justify-center gap-2 lg:hover:shadow-md lg:hover:scale-110 transition-all duration-150"
            >
              <img src={bank.image} alt={bank.name} width={60} height={60} />
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </motion.div>
  )
}
