'use client'

import Button from '@/components/UI/Button'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const routes = [
  { name: 'صفحه اصلی', path: '/landing' },
  { name: 'فروشگاه کرمان کارتخوان', path: '/shop' },
  { name: 'راهنمای دریافت کارتخوان', path: '/guide' },
  { name: 'ارتباط با ما', path: '/contact-us' },
]

export default function DesktopHeader() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:block sticky top-0 z-50">
      <div className="mx-auto mt-4 p-4 max-w-6xl rounded-b-xl bg-light shadow-md backdrop-blur-md">
        <div className="flex items-center justify-between">
          <Image
            src={'/images/logo.png'}
            alt="لوگو"
            width={200}
            height={50}
            draggable={false}
          />

          {/* روت‌ها */}
          <div className="flex items-center gap-2">
            {routes.map((route) => {
              const isActive = pathname === route.path

              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className={`relative flex items-center gap-1 px-3 py-1 rounded-md transition-all duration-300
                    ${
                      isActive
                        ? 'text-secondary main-text after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-4/5 after:h-[6px] after:bg-secondary after:rounded-t-full after:content-[""]'
                        : 'text-gray hover:text-dark'
                    }
                `}
                >
                  {route.name}
                  {route.name === 'کارتخوان ها' && (
                    <ChevronDown size={16} className="mr-2" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* دکمه */}
          <Link href={'/order-steps'}>
            <Button variant="secondary">سفارش کارتخوان</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
