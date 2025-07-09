'use client'

import Footer from '@/components/Footer'
import ShopPageHeader from '@/components/shop/ShopPageHeader'
import DashboardPanelNavbar from '@/components/shop/userDashboard/DashboardPanelNavbar'
import OrderItem from '@/components/shop/userDashboard/OrderItem'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FiChevronLeft } from 'react-icons/fi'

const TABS = [
  { label: 'همه', value: 'all' },
  { label: 'در حال آماده‌سازی', value: 'processing' },
  { label: 'در انتظار تأیید سیستم', value: 'registration' },
  { label: 'ارسال شد', value: 'shipped' },
  { label: 'تحویل شده', value: 'completed' },
  { label: 'لغو شده', value: 'cancelled' },
]

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTab, setSelectedTab] = useState('all')

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/orders')
        if (!res.ok) throw new Error('خطا در دریافت سفارشات')
        const data = await res.json()
        setOrders(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const filteredOrders =
    selectedTab === 'all'
      ? orders
      : orders.filter((o) => o.orderStatus === selectedTab)

  return (
    <div className="min-h-screen bg-light space-y-24">
      <ShopPageHeader />
      <div className="lg:flex gap-12 px-4 sm:px-12 lg:px-24">
        <DashboardPanelNavbar />

        <div className="flex-1">
          {/* هدر موبایل */}
          <div className="lg:hidden flex items-center justify-between bg-light rounded-lg shadow p-2 mb-4">
            <h2 className="h4">سفارشات من</h2>
            <Link href="/dashboard">
              <FiChevronLeft size={32} />
            </Link>
          </div>

          <div className="min-h-96 h-auto bg-light text-dark rounded-2xl flex flex-col items-center p-6 shadow border border-lightgray/35 gap-4">
            {/* تب‌ها */}
            <div className="w-full flex flex-wrap gap-2 mb-2">
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedTab(tab.value)}
                  className={`px-4 py-2 rounded-full border transition-all duration-200 text-sm cursor-pointer ${
                    selectedTab === tab.value
                      ? 'bg-secondary text-white border-secondary'
                      : 'bg-white text-gray border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* لیست سفارش‌ها */}
            <div className="w-full space-y-4">
              {isLoading && (
                <div className="min-h-80 h-auto bg-light text-dark grid place-items-center">
                  <Loader className="animate-spin" />
                </div>
              )}
              {error && <p className="text-red-600">{error}</p>}
              {!isLoading && !error && filteredOrders.length === 0 && (
                <p>سفارشی یافت نشد.</p>
              )}
              {!isLoading &&
                !error &&
                filteredOrders.map((order, idx) => (
                  <OrderItem key={order._id} order={order} />
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24">
        <Footer />
      </div>
    </div>
  )
}
