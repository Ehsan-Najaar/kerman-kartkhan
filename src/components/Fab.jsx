'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'

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
    label: '09137131002',
  },
]

const Fab = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-20 right-6 lg:bottom-6 lg:right-6 z-50">
      <div className="relative">
        {/* دکمه اصلی */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'بستن منو' : 'باز کردن منو'}
          className="relative z-20 flex items-center justify-center w-9 h-9 lg:w-14 lg:h-14 rounded-full bg-section text-dark shadow-lg hover:bg-secondary/70 cursor-pointer transition-colors"
        >
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: open ? 0 : 45 }}
            transition={{ duration: 0.3 }}
            className="text-3xl select-none leading-none"
          >
            <Phone className="w-5 lg:w-7 text-gray" />
          </motion.span>
        </button>

        {/* کانتینر لینک‌ها */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -10 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-full right-0 mb-3 flex flex-col items-end space-y-2 z-10"
            >
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  className={`w-44 flex items-center gap-2 px-3 py-2 rounded-full bg-light/50 backdrop-blur-md text-dark shadow-lg hover:brightness-110 transition`}
                >
                  <span className="w-5 h-5 flex justify-center items-center">
                    {item.icon}
                  </span>
                  <span className="text-xs">{item.label}</span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Fab
