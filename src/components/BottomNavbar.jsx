'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNavbar() {
  const pathname = usePathname()

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
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center text-xs gap-2"
          >
            <Image
              src={isActive ? item.activeIcon : item.icon}
              alt={item.label}
              width={24}
              height={24}
              draggable={false}
            />
            <span className={isActive ? 'text-secondary' : 'text-gray'}>
              {item.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
