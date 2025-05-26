'use client'

import Button from '@/components/ui/Button'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const routes = [
  { name: 'صفحه اصلی', path: '/landing' },
  { name: 'فروشگاه کرمان کارتخوان', path: '/shop' },
  { name: 'راهنمای دریافت', path: '/guide' },
  { name: 'ارتباط با ما', path: '/contact-us' },
]

export default function DesktopHeader() {
  const pathname = usePathname()

  return (
    <header className="hidden lg:block sticky top-0 z-50">
      <div className="mx-auto mt-4 p-4 max-w-6xl rounded-b-xl bg-light shadow-md backdrop-blur-md">
        <nav className="flex items-center justify-between">
          <Link href="/landing" aria-label="لوگوی سایت" draggable="false">
            <Image
              src="/images/logo.png"
              alt="لوگوی کرمان کارتخوان"
              width={200}
              height={50}
              draggable="false"
              priority
              quality={90}
            />
          </Link>

          {/* منو */}
          <ul className="flex items-center gap-2">
            {routes.map((route) => {
              const isActive = pathname === route.path

              return (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    className={`relative flex items-center gap-1 px-3 py-1 rounded-md transition-all duration-300
                      ${
                        isActive
                          ? 'text-secondary font-semibold after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-4/5 after:h-[6px] after:bg-secondary after:rounded-t-full after:content-[""]'
                          : 'text-gray hover:text-dark'
                      }
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {route.name}
                    {route.name === 'کارتخوان ها' && (
                      <ChevronDown size={16} className="mr-2" />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* دکمه سفارش */}
          <Link href="/order-steps">
            <Button
              variant="primary"
              fontWeight="medium"
              aria-label="سفارش کارتخوان"
            >
              سفارش کارتخوان
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
