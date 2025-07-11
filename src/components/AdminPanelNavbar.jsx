'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiArrowRight } from 'react-icons/fi'

const AdminPanelNavbar = () => {
  const pathname = usePathname()

  const navLinks = [
    {
      name: 'محصولات',
      href: '/admin/products',
      icon: '/icons/custom/Products.svg',
    },
    {
      name: 'دسته‌بندی‌ها',
      href: '/admin/categories',
      icon: '/icons/custom/Category.svg',
    },
    {
      name: 'سفارشات',
      href: '/admin/orders',
      icon: '/icons/custom/Paper.svg',
    },
    {
      name: 'کاربران',
      href: '/admin/users',
      icon: '/icons/custom/Users.svg',
    },
  ]

  return (
    <div
      className={`min-h-full w-full lg:w-1/5 text-dark rounded-2xl flex flex-col items-center p-4 ${
        pathname !== '/admin' ? 'hidden lg:flex' : ''
      }`}
    >
      {/* لوگو */}
      <Link href={'/'} className="text-lg font-bold mb-8">
        <Image
          src="/images/logo.png"
          alt="لوگوی سایت"
          width={150}
          height={150}
          priority
          className="rounded-lg w-auto h-auto"
        />
      </Link>

      {/* منو */}
      <div className="flex flex-col space-y-4 w-full">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href)

          // آیکون اکتیو را بساز
          const iconSrc =
            typeof link.icon === 'string'
              ? isActive
                ? link.icon.replace('.svg', '-active.svg')
                : link.icon
              : link.icon

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl bg-bg ${
                isActive
                  ? 'bg-section/50'
                  : 'lg:bg-transparent hover:bg-dark/5 hover:pr-8 transition-all duration-300'
              }`}
            >
              {/* نمایش آیکون به صورت تصویر یا JSX */}
              {typeof iconSrc === 'string' ? (
                <Image
                  src={iconSrc}
                  alt={link.name}
                  priority
                  width={32}
                  height={32}
                />
              ) : (
                iconSrc
              )}
              <span>{link.name}</span>
            </Link>
          )
        })}
      </div>

      {pathname === '/admin' && (
        <div className="w-full space-y-12 mt-12">
          <div className="h-px bg-dark"></div>
          <button
            onClick={() => {
              window.location.href = '/'
            }}
            className="w-full flex items-center gap-2 px-6 py-4 rounded-xl bg-bg lg:bg-transparent hover:bg-bg hover:pr-8 transition-all duration-300"
          >
            <FiArrowRight size={24} />
            بازگشت به سایت
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminPanelNavbar
