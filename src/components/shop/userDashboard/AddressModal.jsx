'use client'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAppContext } from '@/context/AppContext'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function AddressModal({ isOpen, onClose, editIndex = null }) {
  const { user, setUser } = useAppContext()

  const [form, setForm] = useState({ city: '', street: '', postalCode: '' })

  useEffect(() => {
    if (editIndex !== null && user?.address?.[editIndex]) {
      setForm(user.address[editIndex])
    } else {
      setForm({ city: '', street: '', postalCode: '' })
    }
  }, [editIndex, isOpen, user?.address])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      console.log('User ID:', user?._id)
      const res = await fetch(`/api/user/${user._id}/address`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: form, index: editIndex }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'خطا در ذخیره آدرس')

      setUser({ ...user, address: data.address })
      onClose()
      toast.success(
        `آدرس با موفقیت ${editIndex !== null ? 'ویرایش' : 'افزوده'} شد`
      )
    } catch (err) {
      alert('مشکلی در ذخیره آدرس پیش آمد.')
      console.error(err)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-md space-y-6">
        <h2 className="flex items-center justify-between text-lg font-bold">
          {editIndex !== null ? 'ویرایش آدرس' : 'افزودن آدرس جدید'}
          <X
            onClick={onClose}
            size={20}
            className="text-gray cursor-pointer hover:text-dark"
          />
        </h2>

        <Input
          name="city"
          value={form.city}
          onChange={handleChange}
          label="شهر"
          className="w-full border p-2 rounded"
        />
        <Input
          name="street"
          value={form.street}
          onChange={handleChange}
          label="خیابان ، کوچه ، طبقه ، واحد"
          className="w-full border p-2 rounded"
        />
        <Input
          name="postalCode"
          value={form.postalCode}
          onChange={handleChange}
          label="کد پستی"
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-between">
          <Button onClick={onClose} variant="ghost">
            انصراف
          </Button>
          <Button onClick={handleSubmit} variant="primary">
            {editIndex !== null ? 'ذخیره' : 'افزودن'}
          </Button>
        </div>
      </div>
    </div>
  )
}
