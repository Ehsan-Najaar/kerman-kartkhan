'use client'

import { useAppContext } from '@/context/AppContext'
import { formatPriceToPersian } from '@/utils/formatPrice'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNavbar() {
  const pathname = usePathname()
  const { cart } = useAppContext()
  const cartCount = cart?.items?.length || 0

  const navItems = [
    {
      label: 'خانه',
      href: '/landing',
      icon: '/icons/custom/Home.svg',
      activeIcon: '/icons/custom/Home-active.svg',
    },
    {
      label: 'فروشگاه',
      href: '/shop',
      icon: '/icons/custom/Shop.svg',
      activeIcon: '/icons/custom/Shop-active.svg',
    },
    {
      label: 'سبد خرید',
      href: '/shop/cart',
      icon: '/icons/custom/Basket.svg',
      activeIcon: '/icons/custom/Basket-active.svg',
    },
    {
      label: 'پروفایل',
      href: '/shop/dashboard',
      icon: '/icons/custom/User.svg',
      activeIcon: '/icons/custom/User-active.svg',
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-between px-12 py-2 md:hidden z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.href

        // شرط استفاده از <a> به جای <Link>
        if (item.href === '/shop/cart') {
          return (
            <a
              key={item.href}
              href={item.href}
              className="flex flex-col items-center text-xs gap-2"
            >
              <div className="relative">
                <Image
                  src={isActive ? item.activeIcon : item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                  draggable={false}
                />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-secondary text-white text-[10px] rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                    {formatPriceToPersian(cartCount)}
                  </span>
                )}
              </div>
              <span className={isActive ? 'text-secondary' : 'text-gray'}>
                {item.label}
              </span>
            </a>
          )
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center text-xs gap-2"
          >
            <div className="relative">
              <Image
                src={isActive ? item.activeIcon : item.icon}
                alt={item.label}
                width={24}
                height={24}
                draggable={false}
              />
              {item.href === '/shop/cart' && cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-secondary text-white text-[10px] rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                  {formatPriceToPersian(cartCount)}
                </span>
              )}
            </div>
            <span className={isActive ? 'text-secondary' : 'text-gray'}>
              {item.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
