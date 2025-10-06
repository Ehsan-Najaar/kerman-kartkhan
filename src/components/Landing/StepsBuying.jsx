'use client'

import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { fadeIn } from '../../../variants'

export default function StepsBuying() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [activeTab, setActiveTab] = useState('نقدی')
  const [activeStep, setActiveStep] = useState(null)
  const tabs = ['نقدی', 'اقساط']

  const steps = {
    نقدی: [
      {
        id: 1,
        title: 'ثبت درخواست کارتخوان',
        description: 'انتخاب کارتخوان مورد نظر و ثبت درخواست برای خرید آن.',
        icon: '/images/edit.png',
      },
      {
        id: 2,
        title: 'ثبت اطلاعات شخصی',
        description:
          'وارد کردن اطلاعات شخصی(شماره تلفن به نام خود ، کد ملی و ... )',
        icon: '/images/user-register.png',
      },
      {
        id: 3,
        title: 'ارسال مدارک',
        description:
          'آپلود کارت ملی، شناسنامه و جواز کسب (جواز کسب الزامی نیست!)',
        icon: '/images/documents.png',
      },
      {
        id: 4,
        title: 'دریافت کارتخوان',
        description: 'دریافت کارت‌خوان درب منزل، در هر کجای کشور',
        icon: '/images/truck.png',
      },
    ],
    اقساط: [
      {
        id: 1,
        title: 'ثبت درخواست کارتخوان',
        description: 'انتخاب کارتخوان مورد نظر و ثبت درخواست برای خرید آن.',
        icon: '/images/edit.png',
      },
      {
        id: 2,
        title: 'ثبت اطلاعات شخصی',
        description:
          'وارد کردن اطلاعات شخصی(شماره تلفن به نام خود ، کد ملی و ... )',
        icon: '/images/user-register.png',
      },
      {
        id: 3,
        title: 'ارسال مدارک',
        description:
          'آپلود کارت ملی، شناسنامه و جواز کسب (جواز کسب الزامی نیست!)',
        icon: '/images/documents.png',
      },
      {
        id: 4,
        title: 'چک با بازپرداخت تا 6 ماه',
        description:
          'اقساط ۶ ماهه با کارمزد ۵٪ (هر ۱ میلیون = ۵۰ هزار تومان). پرداخت با چک ماهانه یا دوماهه. یک‌سوم مبلغ به‌صورت نقدی پیش‌پرداخت می‌شود.',
        icon: '/images/check.png',
      },
      {
        id: 5,
        title: 'دریافت کارتخوان',
        description: 'دریافت کارت‌خوان درب منزل، در هر کجای کشور',
        icon: '/images/truck.png',
      },
    ],
  }

  useEffect(() => {
    if (inView) controls.start('show')
  }, [inView, controls])

  const handleStepClick = (id) => {
    setActiveStep(activeStep === id ? null : id)
  }

  return (
    <motion.div
      ref={ref}
      variants={fadeIn('up', 0)}
      initial="hidden"
      animate={controls}
      className="relative flex flex-col items-center justify-center p-4 lg:p-0"
    >
      {/* title */}
      <div className="flex flex-col items-center justify-center pb-12 space-y-4">
        <p className="title-text">مراحل درخواست کارتخوان</p>
        <article className="-space-y-5 text-section animate-smooth-bounce">
          <ChevronDown size={32} className="stroke-3" />
          <ChevronDown size={32} className="stroke-3" />
        </article>
      </div>

      {/* Tabs */}
      <div className="relative flex w-full rounded-2xl overflow-hidden shadow-sm bg-lightgray/20 border border-lightgray mb-8">
        {/* animated background */}
        <motion.div
          layout
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute top-0 bottom-0 w-1/2 bg-secondary rounded-2xl"
          style={{
            right: activeTab === 'اقساط' ? '50%' : '0%',
          }}
        />

        {/* buttons */}
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab)
              setActiveStep(null)
            }}
            className={`relative flex-1 p-3 main-text z-10 transition-colors duration-300 cursor-pointer ${
              activeTab === tab ? 'text-light' : 'text-dark'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="w-[90%] md:w-full grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          {steps[activeTab].map((step) => (
            <div key={step.id}>
              <div
                onClick={() => handleStepClick(step.id)}
                className="flex flex-col items-center p-4 bg-light rounded-2xl shadow-md cursor-pointer transition-all duration-300"
              >
                <section className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={step.icon}
                      alt={step.title}
                      width={32}
                      height={32}
                    />
                    <span className="main-text text-dark">{`${step.id}. ${step.title}`}</span>
                  </div>
                  <ChevronDown
                    className={`text-section transition-transform duration-300 ${
                      activeStep === step.id ? 'rotate-180' : ''
                    }`}
                  />
                </section>

                <AnimatePresence initial={false}>
                  {activeStep === step.id && (
                    <motion.div
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden w-full"
                    >
                      <p className="body-text text-gray pr-12 pt-4">
                        {step.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <article className="absolute right-0 top-36 w-44 h-44 bg-section/60 rounded-full blur-2xl -z-10"></article>
      <article className="absolute left-0 -bottom-16 w-44 h-44 bg-section/60 rounded-full blur-2xl -z-10"></article>
    </motion.div>
  )
}
