'use client'

import {
  ChevronLeft,
  ListChecks,
  LogOut,
  MapPin,
  Settings,
  User as UserIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function UserDropdown({ user, onLogout }) {
  const [isHovered, setIsHovered] = useState(false)

  const dashboardLink = '/shop/dashboard/edit-account'

  return (
    <div
      className="relative inline-block text-right z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`p-3 rounded-lg cursor-pointer transition-colors duration-300 border ${
          isHovered ? 'bg-lightgray/35 border-lightgray' : 'border-lightgray/35'
        }`}
      >
        <UserIcon size={24} className="stroke-[1.5] text-gray" />
      </div>

      <div
        className={`absolute -left-16 mt-2 w-44 rounded-lg bg-light ring-1 ring-lightgray/0 overflow-hidden max-h-0 transition-all duration-300 z-10 ${
          isHovered ? 'ring-lightgray/100 max-h-[500px]' : ''
        }`}
      >
        <div className="border-b border-lightgray">
          <Link href={dashboardLink}>
            <h3 className="flex items-center justify-between small-text hover:bg-gray-100 px-4 py-2 cursor-pointer">
              {user.name || user.phone}
              <ChevronLeft size={20} />
            </h3>
          </Link>
        </div>

        <ul>
          <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <Link
              href="/shop/dashboard/my-orders"
              className="flex items-center gap-2 w-full small-text"
              onClick={() => setIsHovered(false)}
            >
              <ListChecks size={20} />
              <span>سفارشات من</span>
            </Link>
          </li>

          <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <Link
              href="/shop/dashboard/my-addresses"
              className="flex items-center gap-2 w-full small-text"
              onClick={() => setIsHovered(false)}
            >
              <MapPin size={20} />
              <span>آدرس‌های من</span>
            </Link>
          </li>

          {user?.roles?.some((role) => role.toLowerCase() === 'admin') && (
            <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link
                href="/admin/products"
                className="flex items-center gap-2 w-full small-text"
                onClick={() => setIsHovered(false)}
              >
                <Settings size={20} />
                <span>پنل ادمین</span>
              </Link>
            </li>
          )}

          <li className="border-t border-lightgray">
            <button
              onClick={() => {
                onLogout()
                setIsHovered(false)
              }}
              className="flex items-center gap-2 w-full text-red-500 px-4 py-2 hover:bg-gray-100 small-text cursor-pointer"
            >
              <LogOut size={20} />
              خروج از حساب
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
