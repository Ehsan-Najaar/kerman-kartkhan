'use client'

import Footer from '@/components/Footer'
import LandingHeaderPage from '@/components/Landing/LandingHeaderPage'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import {
  FaClock,
  FaEnvelope,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTelegramPlane,
  FaWhatsapp,
} from 'react-icons/fa'

const socialLinks = [
  {
    name: 'روبیکا',
    icon: (
      <Image
        src="/images/rubika.png"
        alt="روبیکا"
        width={20}
        height={20}
        draggable="false"
        className="grayscale-100"
      />
    ),
    url: 'https://rubika.ir/Kartkhan12645',
    label: '@Kartkhan12645',
  },
  {
    name: 'تلگرام',
    icon: <FaTelegramPlane size={20} />,
    url: 'https://t.me/kerman.kartkhan',
    label: '@kerman.kartkhan',
  },
  {
    name: 'اینستاگرام',
    icon: <FaInstagram size={20} />,
    url: 'https://instagram.com/kerman.kartkhan',
    label: '@kerman.kartkhan',
  },
  {
    name: 'واتساپ',
    icon: <FaWhatsapp size={20} />,
    url: 'https://wa.me/989137131002',
    label: '0913 713 1002',
  },
]

const branches = {
  کرمان: {
    mapLink: 'https://maps.app.goo.gl/Q4vZuPSVqGfRSCZE6',
    image: '/images/kerman-map.png',
    phone: '034 3272 6099',
    hours: '8 الی 17',
    email: 'info@kermankartkhan.com',
    address: 'بلوار جهاد ، نبش کوچه 23',
  },
  زرند: {
    mapLink: 'https://maps.app.goo.gl/8CH4w1pM4JtrYq7H8',
    image: '/images/zrand-map.png',
    phone: '0913 713 5009',
    hours: '8 الی 17',
    email: 'zarand@kermankartkhan.com',
    address: 'چهار راه مصلی ، ابتدای خیابان ولیعصر',
  },
  راور: {
    mapLink: 'https://maps.app.goo.gl/oCXgja7MRbCRnNsm8',
    image: '/images/ravar-map.png',
    phone: '034 3372 2404',
    hours: '8 الی 17',
    email: 'ravar@kermankartkhan.com',
    address: 'خیابان امام خمینی ، نبش کوچه 21',
  },
}

export default function ContactUsPage() {
  const [selected, setSelected] = useState('کرمان')
  const branch = branches[selected]
  const tabs = ['کرمان', 'زرند', 'راور']

  return (
    <div>
      <LandingHeaderPage />

      <main className="my-12 p-4 lg:p-0">
        {/* title */}
        <div className="flex flex-col items-center justify-center pb-12 space-y-4">
          <h1 className="title-text">ارتباط با ما</h1>

          <article className="-space-y-5 text-section animate-smooth-bounce">
            <ChevronDown size={32} className="stroke-3" />
            <ChevronDown size={32} className="stroke-3" />
          </article>
        </div>

        <section className="grid md:grid-cols-2 gap-10 bg-gradient-to-l from-section to-bg p-6 rounded-xl shadow-lg">
          {/* Map */}
          <a
            href={branch.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Image
              src={branch.image}
              alt={`نقشه شعبه ${selected}`}
              width={600}
              height={400}
              className="rounded-lg w-full h-auto"
            />
          </a>

          <section>
            {/* Tabs */}
            <div className="relative flex w-full rounded-2xl overflow-hidden shadow-sm bg-lightgray/20 border border-lightgray mb-8">
              <motion.div
                layout
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute top-0 bottom-0 w-1/3 bg-secondary rounded-2xl"
                style={{
                  left:
                    selected === 'کرمان'
                      ? '66.66%'
                      : selected === 'زرند'
                      ? '33.33%'
                      : '0%',
                }}
              />
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelected(tab)}
                  className={`relative flex-1 p-3 z-10 transition-colors duration-300 main-text text-sm cursor-pointer ${
                    selected === tab ? 'text-white' : 'text-dark'
                  }`}
                >
                  شعبه {tab}
                </button>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-6 text-dark small-text md:body-text">
              {[
                {
                  icon: <FaPhoneAlt size={20} />,
                  label: 'تلفن',
                  value: branch.phone,
                },
                {
                  icon: <FaClock size={20} />,
                  label: 'ساعات پاسخگویی',
                  value: branch.hours,
                },
                {
                  icon: <FaEnvelope size={20} />,
                  label: 'ایمیل',
                  value: branch.email,
                },
                {
                  icon: <FaMapMarkerAlt size={20} />,
                  label: 'آدرس',
                  value: branch.address,
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="bg-section p-2 rounded-md mt-[2px]">
                    <span className="text-secondary">{item.icon}</span>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between border-b border-lightgray pb-1">
                      <span className="main-text text-sm text-dark">
                        {item.label}
                      </span>
                      <span
                        dir={
                          item.label === 'تلفن' || item.label === 'ایمیل'
                            ? 'ltr'
                            : 'rtl'
                        }
                        className="text-dark text-left whitespace-pre-line"
                      >
                        {item.value}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <section className="flex items-center justify-end gap-2 mt-24">
                {socialLinks.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    draggable="false"
                    className="group relative bg-lightgray/20 border border-lightgray p-3 rounded-md cursor-pointer hover:shadow-sm hover:-mt-2 transition-all duration-300"
                  >
                    {item.icon}
                    <span
                      dir="ltr"
                      className="absolute bottom-full mb-2 right-1/2 translate-x-1/2 bg-dark text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-10"
                    >
                      {item.label}
                    </span>
                  </a>
                ))}
              </section>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  )
}
