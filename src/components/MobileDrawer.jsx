'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function MobileDrawer({ routes, onClose }) {
  return (
    <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm">
      <motion.nav
        className="mobile-menu fixed top-0 bottom-0 right-0 h-full w-64 bg-light shadow-xl"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3 }}
        aria-label="منوی موبایل"
      >
        <div className="relative mb-4">
          <figure className="w-full p-4 border-b border-lightgray/40">
            <Image
              src="/images/logo.png"
              alt="لوگو"
              width={190}
              height={30}
              quality={70}
              draggable={false}
            />
          </figure>
          <button
            onClick={onClose}
            className="absolute top-4 -left-24 p-2 bg-light text-gray rounded-md cursor-pointer"
            aria-label="بستن منو"
          >
            <X size={24} />
          </button>
        </div>

        <ul className="flex flex-col gap-4">
          {routes.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                onClick={onClose}
                className="body-text px-2 py-4 border-b border-lightgray/40 block"
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>
    </div>
  )
}
