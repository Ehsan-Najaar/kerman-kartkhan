'use client'

import AdminPanelNavbar from '@/components/AdminPanelNavbar'
import { Loader2 } from '@/components/Loader'
import UsersHeader from '@/components/admin/users/UsersHeader'
import { formatPriceToPersian } from '@/utils/formatPrice'
import {
  BadgeCheck,
  Calendar,
  Circle,
  Pencil,
  Phone,
  ShieldCheck,
  Trash2,
  User,
  Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function UsersManagment() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('all')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'خطا در دریافت کاربران')
      }

      const usersWithDates = data.map((user) => ({
        ...user,
        createdAt: user.createdAt
          ? new Date(
              typeof user.createdAt === 'object' &&
              '$date' in user.createdAt &&
              '$numberLong' in user.createdAt.$date
                ? Number(user.createdAt.$date.$numberLong)
                : user.createdAt
            )
          : null,
      }))

      setUsers(usersWithDates)
    } catch (err) {
      console.error(err)
      setError(err.message || 'خطای نامشخص')
    } finally {
      setLoading(false)
    }
  }

  const handleChangeRole = async (userId, currentRoles) => {
    const isAdmin = currentRoles.includes('admin')
    const newRoles = isAdmin ? ['user'] : ['admin']

    // نقش فارسی
    const newRoleText = isAdmin ? 'کاربر عادی' : 'ادمین'

    // پیدا کردن نام کاربر
    const user = users.find((u) => u._id === userId)
    const userName = user?.name || 'کاربر'

    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          roles: newRoles,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'خطا در تغییر نقش کاربر')
        return
      }

      toast.success(`${userName} به ${newRoleText} تغییر کرد`)
      fetchUsers()
    } catch (error) {
      console.error(error)
      toast.error('خطا در تغییر نقش کاربر')
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟'))
      return

    try {
      const res = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'خطا در حذف کاربر')
        return
      }

      toast.success(data.message)
      fetchUsers()
    } catch (error) {
      console.error(error)
      toast.error('خطا در حذف کاربر')
    }
  }

  const filteredUsers = users
    .filter(
      (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.phone?.includes(search)
    )
    .filter((user) =>
      filterRole === 'all' ? true : user.roles?.includes(filterRole)
    )
    .sort((a, b) => {
      const aIsAdmin = a.roles?.includes('admin') ? 0 : 1
      const bIsAdmin = b.roles?.includes('admin') ? 0 : 1
      return aIsAdmin - bIsAdmin
    })

  return (
    <div className="min-h-screen flex md:p-6 gap-12">
      <AdminPanelNavbar />

      <div className="w-full lg:w-4/5 bg-light p-4 rounded-2xl shadow-lg overflow-hidden relative">
        <UsersHeader
          search={search}
          setSearch={setSearch}
          filterRole={filterRole}
          setFilterRole={setFilterRole}
          total={users.length}
        />

        {loading && <Loader2 />}

        {error && (
          <p className="text-red-600">خطا در دریافت کاربران: {error}</p>
        )}

        {!loading && !error && filteredUsers.length === 0 && (
          <div className="h-[calc(100%-100px)] grid place-items-center text-gray">
            هیچ کاربری مطابق جستجو یا فیلتر پیدا نشد.
          </div>
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <div className="overflow-auto max-h-[600px] mt-4">
            <div className="w-full border border-lightgray/50 rounded overflow-hidden">
              {/* Header Row */}
              <div className="grid grid-cols-7 bg-gray-50 text-gray/70 text-xs text-right rtl border-b border-gray-200">
                <div className="px-3 py-2 border-l border-gray-200 flex items-center gap-1 justify-center">
                  <span>#</span>
                </div>
                <div className="px-3 py-2 border-l border-gray-200 flex items-center gap-1 justify-center">
                  <User size={14} />
                  <span>نام کامل</span>
                </div>
                <div className="px-3 py-2 border-l border-gray-200 flex items-center gap-1 justify-center">
                  <Phone size={14} />
                  <span>موبایل</span>
                </div>
                <div className="px-3 py-2 border-l border-gray-200 flex items-center gap-1 justify-center">
                  <Users size={14} />
                  <span>نقش کاربر</span>
                </div>
                <div className="px-3 py-2 border-l border-gray-200 flex items-center gap-1 justify-center">
                  <BadgeCheck size={14} />
                  <span>وضعیت</span>
                </div>
                <div className="px-3 py-2 border-l border-gray-200 flex items-center gap-1 justify-center">
                  <Calendar size={14} />
                  <span>تاریخ عضویت</span>
                </div>
                <div className="px-3 py-2 flex items-center gap-1 justify-center">
                  <ShieldCheck size={14} />
                  <span>عملیات</span>
                </div>
              </div>

              {/* Rows */}
              {filteredUsers.map((user, index) => (
                <div
                  key={user._id}
                  className="grid grid-cols-7 hover:bg-gray-50 text-xs text-gray-800 text-right rtl border-b border-gray-200 items-center"
                >
                  <div className="px-3 py-2 border-l border-gray-200 text-center">
                    {formatPriceToPersian(index + 1)}
                  </div>

                  {/* Full name */}
                  <div className="px-3 py-2 border-l border-gray-200 flex items-center gap-2 justify-center">
                    <span>{user.name || '-'}</span>
                  </div>

                  {/* Phone */}
                  <div className="px-3 py-2 border-l border-gray-200 text-center">
                    {user.phone || '-'}
                  </div>

                  {/* Role */}
                  <div className="px-3 py-2 border-l border-gray-200 flex items-center gap-1 justify-center">
                    <span>
                      {user.roles
                        ?.map((role) =>
                          role === 'admin' ? 'ادمین' : 'کاربر عادی'
                        )
                        .join('، ') || '-'}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="px-3 py-2 border-l border-gray-200 flex items-center gap-1 justify-center">
                    <Circle
                      size={10}
                      className={`${
                        user.isActive ? 'text-green-500' : 'text-red-500'
                      }`}
                      fill={user.isActive ? '#22c55e' : '#ef4444'}
                    />
                    <span>{user.isActive ? 'فعال' : 'غیرفعال'}</span>
                  </div>

                  {/* Join date */}
                  <div className="px-3 py-2 border-l border-gray-200 flex items-center gap-1 justify-center">
                    <span>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleString('fa-IR', {
                            dateStyle: 'short',
                            timeStyle: 'short',
                          })
                        : '-'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="px-3 py-2 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleChangeRole(user._id, user.roles)}
                      className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded px-2 py-1 cursor-pointer"
                    >
                      <Pencil size={14} className="text-gray-700" />
                      <span>تغییر</span>
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded px-2 py-1 cursor-pointer"
                    >
                      <Trash2 size={14} className="text-gray-700" />
                      <span>حذف</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
