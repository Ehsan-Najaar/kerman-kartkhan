'use client'

import Footer from '@/components/Footer'
import ShopPageHeader from '@/components/shop/ShopPageHeader'
import DashboardPanelNavbar from '@/components/shop/userDashboard/DashboardPanelNavbar'
import UserInformation from '@/components/shop/userDashboard/UserInformaitno'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import { useAppContext } from '../../../../../context/AppContext'

export default function EditAccount() {
  const { user, setUser } = useAppContext()

  const [userInfo, setUserInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) return // صبر کن تا user آماده بشه

    if (user.userId) {
      setIsLoading(true)
      fetch(`/api/users/${user.userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUserInfo(data)
        })
        .catch(() => {
          setError('خطا در دریافت اطلاعات کاربر')
        })
        .finally(() => setIsLoading(false))
    }
  }, [user])

  return (
    <div className="min-h-screen bg-light space-y-24">
      <ShopPageHeader />
      <div className="lg:flex gap-12 px-24">
        <DashboardPanelNavbar />

        {/* هدر موبایل */}
        <div className="lg:hidden flex items-center justify-between bg-light rounded-lg shadow p-2 mb-4">
          <h2 className="h4">ویرایش اطلاعات</h2>
          <Link href="/dashboard">
            <FiChevronLeft size={32} />
          </Link>
        </div>

        <UserInformation
          userInfo={userInfo}
          isLoading={isLoading}
          error={error}
        />
      </div>

      <div className="max-w-7xl mx-auto mt-24">
        <Footer />
      </div>
    </div>
  )
}
