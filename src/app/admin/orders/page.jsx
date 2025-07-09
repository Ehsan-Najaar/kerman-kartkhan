'use client'

import OrderCard from '@/components/admin/orders/OrderCard'
import OrdersHeader from '@/components/admin/orders/OrdersHeader'
import AdminPanelNavbar from '@/components/AdminPanelNavbar'
import { Loader2 } from '@/components/Loader'
import {
  BadgeCheck,
  Calendar,
  CoinsIcon,
  Eye,
  Hash,
  Truck,
  User,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function OrdersManagement() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingOrderId, setDeletingOrderId] = useState(null)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/admin/orders')
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'خطا در دریافت سفارشات')
        }

        setOrders(data)
      } catch (err) {
        console.error(err)
        setError(err.message || 'خطای نامشخص')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleDelete = async (orderId) => {
    if (!confirm('آیا از حذف این سفارش مطمئن هستید؟')) return

    try {
      setDeletingOrderId(orderId)
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'DELETE',
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'خطا در حذف سفارش')
      }

      setOrders((prev) => prev.filter((o) => o._id !== orderId))
    } catch (err) {
      console.error(err)
      alert(err.message || 'خطای نامشخص در حذف سفارش')
    } finally {
      setDeletingOrderId(null)
    }
  }

  const updateOrderStatusOnServer = async (orderId, newStatus) => {
    const res = await fetch('/api/admin/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, orderStatus: newStatus }),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || 'خطا در به‌روزرسانی وضعیت سفارش')
    }
  }

  const updateOrderStatusLocally = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? { ...o, orderStatus: newStatus } : o
      )
    )
  }

  const handleUpdateOrderStatus = (orderId) => async (newStatus) => {
    try {
      await updateOrderStatusOnServer(orderId, newStatus)
      updateOrderStatusLocally(orderId, newStatus)
      toast.success(`وضعیت سفارش به مرحله ${statusLabels[newStatus]} منتقل شد.`)
    } catch (error) {
      toast.error(error.message || 'خطا در به‌روزرسانی وضعیت سفارش')
    }
  }

  const statusFlow = {
    processing: 'registration',
    registration: 'shipped',
    shipped: 'completed',
  }

  const statusLabels = {
    processing: 'در حال بررسی',
    registration: 'ارسال به شاپرک',
    shipped: 'تایید شاپرک و ارسال',
    completed: 'تحویل داده شد و تکمیل سفارش',
    cancelled: 'لغو شده',
  }

  const filteredOrders = orders.filter((order) => {
    const name = order.userId?.name || ''
    const nationalCode = order.shippingAddress?.nationalCode || ''
    const refId = order.paymentRefId || ''

    const matchesSearch =
      refId.includes(search) || nationalCode.includes(search)

    const matchesStatus =
      filterStatus === 'all' || order.paymentStatus === filterStatus

    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen flex md:p-6 gap-12">
      <AdminPanelNavbar />

      <div className="w-full lg:w-4/5 bg-light p-4 rounded-2xl shadow-lg overflow-hidden relative">
        <OrdersHeader
          search={search}
          setSearch={setSearch}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          total={orders.length}
        />

        {loading && <Loader2 />}

        {error && (
          <p className="text-red-600">خطا در دریافت سفارشات: {error}</p>
        )}

        {!loading && !error && orders.length === 0 && (
          <p>هیچ سفارشی ثبت نشده است.</p>
        )}

        {/* Header Row */}
        <div className="grid grid-cols-8 bg-gray-50 text-gray/70 text-xs text-right border border-b-0 border-lightgray/50 rounded-t-lg">
          <div className="px-3 py-2 border-l border-gray-200 flex items-center gap-1 justify-center">
            <span>#</span>
          </div>
          <div className="px-3 py-2 border-l border-gray-200 flex items-center gap-1 justify-center">
            <Hash size={14} />
            <span>کد سفارش</span>
          </div>
          <div className="px-3 py-2 border-l border-gray-200 flex items-center gap-1 justify-center">
            <User size={14} />
            <span>نام</span>
          </div>
          <div className="px-3 py-2 border-l border-gray-200 flex items-center gap-1 justify-center">
            <CoinsIcon size={14} />
            <span>مجموع پرداختی</span>
          </div>
          <div className="px-3 py-2 border-l border-gray-200 flex items-center gap-1 justify-center">
            <BadgeCheck size={14} />
            <span>وضعیت پرداخت</span>
          </div>
          <div className="px-3 py-2 border-l border-gray-200 flex items-center gap-1 justify-center">
            <Truck size={14} />
            <span>وضعیت سفارش</span>
          </div>
          <div className="px-3 py-2 border-l border-gray-200 flex items-center gap-1 justify-center">
            <Calendar size={14} />
            <span>تاریخ ثبت</span>
          </div>
          <div className="px-3 py-2 flex items-center gap-1 justify-center">
            <Eye size={14} />
            <span>جزئیات</span>
          </div>
        </div>

        {!loading && !error && filteredOrders.length > 0 && (
          <div className="h-[610px] overflow-auto">
            <div>
              {filteredOrders.map((order, index) => (
                <OrderCard
                  key={order._id}
                  order={{ ...order, rowNumber: index + 1 }}
                  onDelete={() => handleDelete(order._id)}
                  deleting={deletingOrderId === order._id}
                  updateOrderStatus={handleUpdateOrderStatus(order._id)}
                  statusFlow={statusFlow}
                  statusLabels={statusLabels}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && !error && filteredOrders.length === 0 && (
          <div className="h-[calc(100%-100px)] grid place-items-center text-gray">
            هیچ سفارشی مطابق جستجو یا فیلتر پیدا نشد.
          </div>
        )}
      </div>
    </div>
  )
}
