'use client'

import Footer from '@/components/Footer'
import ShopPageHeader from '@/components/shop/ShopPageHeader'
import DashboardPanelNavbar from '@/components/shop/userDashboard/DashboardPanelNavbar'
import UserInformation from '@/components/shop/userDashboard/UserInformaitno'
import { useAppContext } from '@/context/AppContext'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FiChevronLeft } from 'react-icons/fi'

export default function EditAccount() {
  const { user, loadingUser } = useAppContext()

  const [userInfo, setUserInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (loadingUser) return

    if (!user?._id) {
      setIsLoading(false)
      setError('کاربر یافت نشد')
      return
    }

    setIsLoading(true)
    fetch(`/api/user/${user._id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('خطا در دریافت اطلاعات کاربر')
        }
        return res.json()
      })
      .then((data) => {
        setUserInfo(data)
      })
      .catch(() => {
        setError('خطا در دریافت اطلاعات کاربر')
      })
      .finally(() => setIsLoading(false))
  }, [loadingUser, user])

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
