'use client'

import { ArrowDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminPanelBottomNavbar() {
  const pathname = usePathname()

  const navItems = [
    {
      label: 'محصولات',
      href: '/admin/products',
      icon: '/icons/custom/Products.svg',
      activeIcon: '/icons/custom/Products-active.svg',
    },
    {
      label: 'دسته بندی',
      href: '/admin/categories',
      icon: '/icons/custom/Category.svg',
      activeIcon: '/icons/custom/Category-active.svg',
    },
    {
      label: 'برگشت',
      href: '/',
      icon: (
        <ArrowDown
          size={25}
          className="text-gray p-1 bg-section rounded-full"
        />
      ),
    },
    {
      label: 'سفارشات',
      href: '/admin/orders',
      icon: '/icons/custom/Paper.svg',
      activeIcon: '/icons/custom/Paper-active.svg',
    },
    {
      label: 'کاربران',
      href: '/admin/users',
      icon: '/icons/custom/Users.svg',
      activeIcon: '/icons/custom/Users-active.svg',
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-between px-8 py-2 md:hidden z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center text-xs gap-2"
          >
            {typeof item.icon === 'string' ? (
              <Image
                src={isActive && item.activeIcon ? item.activeIcon : item.icon}
                alt={item.label}
                width={24}
                height={24}
                draggable={false}
              />
            ) : (
              item.icon
            )}

            <span className={isActive ? 'text-secondary' : 'text-gray'}>
              {item.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
