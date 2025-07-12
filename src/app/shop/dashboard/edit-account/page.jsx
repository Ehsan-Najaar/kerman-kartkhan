'use client'

import Footer from '@/components/Footer'
import ShopPageHeader from '@/components/shop/ShopPageHeader'
import DashboardPanelNavbar from '@/components/shop/userDashboard/DashboardPanelNavbar'
import UserInformation from '@/components/shop/userDashboard/UserInformaitno'
import { useAppContext } from '@/context/AppContext'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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
      <div className="hidden lg:flex">
        <ShopPageHeader />
      </div>
      <div className="lg:flex gap-12 lg:px-24">
        <div className="hidden lg:flex">
          <DashboardPanelNavbar />
        </div>

        {/* هدر موبایل */}
        <div className="lg:hidden flex items-center gap-2 bg-light text-dark border-b border-lightgray/35 py-6 px-4 mb-4">
          <Link href="/shop/dashboard">
            <ArrowRight size={24} />
          </Link>
          <h2 className="h4">ویرایش اطلاعات</h2>
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
