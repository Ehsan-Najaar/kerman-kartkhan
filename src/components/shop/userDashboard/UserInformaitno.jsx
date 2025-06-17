'use client'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAppContext } from '../../../../context/AppContext'

export default function UserInformation({ userInfo, isLoading, error }) {
  const { user, setUser } = useAppContext()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  })

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || '',
        phone: userInfo.phone || '',
        password: '',
        confirmPassword: '',
      })
    }
  }, [userInfo])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedUserData = {
      name: formData.name,
      mobile: formData.phone,
    }

    try {
      const res = await fetch(`/api/users/${userInfo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUserData),
      })

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

      const updatedUser = await res.json()

      setFormData({
        name: updatedUser.name,
        phone: updatedUser.mobile,
      })

      setUser(updatedUser)

      toast.success('اطلاعات با موفقیت بروزرسانی شد')
    } catch (error) {
      console.error('Error updating user info:', error)
      toast.error('خطا در ذخیره بروزرسانی اطلاعات')
    }
  }

  if (isLoading) {
    return (
      <div className="h-96 lg:h-auto lg:w-4/5 bg-light text-dark rounded-2xl shadow grid place-items-center">
        <Loader className="animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-96 lg:h-auto lg:w-4/5 bg-light text-dark rounded-2xl flex flex-col items-center p-6 shadow gap-4">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="h-auto lg:w-4/5 bg-light text-dark rounded-2xl flex flex-col items-center p-6 shadow border border-lightgray/35 gap-4">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full grid lg:grid-cols-2 gap-4">
          <Input
            type="text"
            className="input"
            label="نام کاربری"
            value={formData.name}
            name="name"
            onChange={handleChange}
            disabled={isLoading}
          />
          <Input
            type="email"
            className="input"
            placeholder="ایمیل"
            value={userInfo?.email || ''}
            readOnly
          />
          <Input
            type="tel"
            className="input"
            dir="rtl"
            placeholder="شماره تلفن"
            value={formData.phone}
            name="phone"
            onChange={handleChange}
            readOnly
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          fontWeight="medium"
          className="mt-4"
          disabled={isLoading}
        >
          ذخیره تغییرات
        </Button>
      </form>
    </div>
  )
}
