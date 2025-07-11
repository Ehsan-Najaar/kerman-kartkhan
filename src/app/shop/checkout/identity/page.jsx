'use client'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import StepProgressBar from '@/components/ui/StepProgressBar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Loader3 } from '@/components/Loader'
import Textarea from '@/components/ui/Textarea'
import { useAppContext } from '@/context/AppContext'
import { HomeIcon, Info } from 'lucide-react'
import toast from 'react-hot-toast'

export default function IdentityForm() {
  const { user } = useAppContext()
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    userName: '',
    phone: '',
    nationalCode: '',
    postalCode: '',
    shopName: '',
    address: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/user-documents', {
          method: 'GET',
          credentials: 'include',
        })

        if (res.ok) {
          const data = await res.json()

          if (data.exists && data.document) {
            const doc = data.document

            setFormData({
              userName: doc.userName || '',
              phone: doc.phone || '',
              nationalCode: doc.nationalCode || '',
              postalCode: doc.postalCode || '',
              shopName: doc.shopName || '',
              address: doc.address || '',
            })
          }
        }
      } catch (error) {
        console.error('Error fetching user documents:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user?.phone) {
      alert('کاربر نامشخص است یا شماره موبایل ثبت نشده است.')
      return
    }

    const finalData = {
      ...formData,
      phone: user.phone,
    }

    try {
      const res = await fetch('/api/user-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(finalData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        alert('خطا در ارسال اطلاعات: ' + errorData.error)
        return
      }

      const savedDoc = await res.json()
      toast.success('اطلاعات با موفقیت ذخیره شدند')
      router.push('/shop/checkout/documents?docId=' + savedDoc._id)
    } catch (error) {
      alert('خطای شبکه یا سرور')
      console.error(error)
    }
  }

  const isFormValid =
    formData.userName.trim() &&
    formData.nationalCode.trim() &&
    formData.postalCode.trim() &&
    formData.shopName.trim() &&
    formData.address.trim()

  if (loading) {
    return <Loader3 />
  }

  return (
    <>
      <div className="min-h-screen min-w-screen bg-light grid place-items-center">
        <form
          onSubmit={handleSubmit}
          className="md:w-[65%] max-w-6xl md:h-[76%] bg-light lg:border border-lightgray/35 rounded-2xl lg:p-6 p-4 lg:shadow space-y-3"
        >
          <StepProgressBar
            currentStep={1}
            steps={[
              { id: 1, label: 'اطلاعات هویتی' },
              { id: 2, label: 'آپلود مدارک' },
              { id: 3, label: 'خلاصه و تایید' },
            ]}
            activeColor="bg-secondary"
            pendingColor="bg-gray-300"
            height="h-1"
            className="mb-8"
          />

          <div className="grid grid-cols-2 gap-4 -space-y-1">
            <div className="space-y-2">
              <Input
                type="text"
                name="userName"
                label={'نام و نام خانوادگی'}
                value={formData.userName}
                onChange={handleChange}
                className="border w-full p-2"
              />

              <div className="space-y-2">
                <Input
                  type="text"
                  name="shopName"
                  label={'نام فروشگاه شما'}
                  value={formData.shopName}
                  onChange={handleChange}
                  className="border w-full p-2"
                />

                <div className="flex items-center gap-2 bg-gray-100 text-gray border border-gray p-3 rounded-lg text-sm">
                  <Info size={40} />
                  <p className="text-xs text-justify leading-6">
                    اگر جواز کسب نداشته باشید، عنوان صنف شما روی دستگاه
                    کارت‌خوان «سوپرمارکت» نمایش داده می‌شود، اما در مدارک
                    مالیاتی همچنان نام واقعی کسب‌وکار شما ثبت خواهد شد.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Input
                type="text"
                name="phone"
                label={'شماره موبایل'}
                value={user.phone}
                readOnly
                onChange={handleChange}
                className="border w-full p-2"
              />

              <div className="flex items-center gap-2 bg-gray-100 text-gray border border-gray p-3 rounded-lg text-sm">
                <Info size={48} />
                <p className="text-xs text-justify leading-6">
                  لطفاً توجه داشته باشید که شماره موبایل واردشده باید به نام
                  صاحب حساب باشد تا فرایند احراز هویت شما سریع‌تر و بدون مشکل
                  انجام شود. همچنین، اطلاعات حساب بانکی شما در مرحله بعد دریافت
                  خواهد شد.
                </p>
              </div>
            </div>

            <Input
              type="text"
              name="nationalCode"
              label={'کد ملی'}
              value={formData.nationalCode}
              onChange={handleChange}
              className="border w-full p-2"
            />

            <Input
              type="text"
              name="postalCode"
              label={'کد پستی'}
              value={formData.postalCode}
              onChange={handleChange}
              className="border w-full p-2"
            />
          </div>

          {/* فیلد آدرس */}
          <Textarea
            id="address"
            name="address"
            label={'آدرس محل سکونت'}
            value={formData.address}
            onChange={handleChange}
          />

          <div className="flex items-center justify-between gap-4 border-t border-lightgray pt-4">
            <Link href={'/shop'}>
              <HomeIcon className="text-gray cursor-pointer" />
            </Link>

            <section className="space-x-4">
              <Button
                variant="ghost"
                outline
                type="button"
                onClick={() => router.back()}
              >
                برگشت
              </Button>

              <Button
                type="submit"
                variant="primary"
                disabled={!isFormValid}
                className={!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}
              >
                مرحله بعد
              </Button>
            </section>
          </div>
        </form>
      </div>
    </>
  )
}
