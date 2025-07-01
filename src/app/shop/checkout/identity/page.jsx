'use client'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import StepProgressBar from '@/components/ui/StepProgressBar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Loader3 } from '@/components/Loader'
import { HomeIcon, Info } from 'lucide-react'

export default function IdentityForm() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
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
          if (data) {
            setFormData({
              phone: data.phone || '',
              nationalCode: data.nationalCode || '',
              postalCode: data.postalCode || '',
              shopName: data.shopName || '',
              address: data.address || '',
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

    try {
      const res = await fetch('/api/user-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        alert('خطا در ارسال اطلاعات: ' + errorData.error)
        return
      }

      const savedDoc = await res.json()
      router.push('/shop/checkout/documents?docId=' + savedDoc._id)
    } catch (error) {
      alert('خطای شبکه یا سرور')
      console.error(error)
    }
  }

  const isFormValid =
    formData.phone.trim() &&
    formData.nationalCode.trim() &&
    formData.postalCode.trim() &&
    formData.shopName.trim() &&
    formData.address.trim()

  if (loading) {
    return <Loader3 />
  }

  return (
    <>
      <div className="min-h-screen min-w-screen grid place-items-center">
        <form
          onSubmit={handleSubmit}
          className="md:w-[65%] md:h-[76%] bg-light border border-lightgray/35 rounded-2xl p-6 shadow space-y-6"
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

          <div className="grid grid-cols-2 gap-4 space-y-6">
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
                <Info size={80} />
                <p className="text-xs text-justify leading-6">
                  اگر <b className="text-dark">جواز</b> نداشته باشید، فقط روی
                  دستگاه صنف شما <b className="text-dark">سوپرمارکت</b> ثبت
                  می‌شود، اما در مالیاتی همان نام دلخواه شما ثبت خواهد شد. مثلاً
                  «تاکسی ابراهیمی» روی دستگاه به «سوپرمارکت ابراهیمی» تغییر
                  می‌کند. ولی توی برگه مالیاتی شما همان «تاکسی ابراهیمی» ذخیره
                  میشود.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Input
                type="text"
                name="phone"
                label={'شماره موبایل'}
                value={formData.phone}
                onChange={handleChange}
                className="border w-full p-2"
              />

              <div className="flex items-center gap-2 bg-gray-100 text-gray border border-gray p-3 rounded-lg text-sm">
                <Info size={40} />
                <p className="text-xs text-justify leading-6">
                  لطفاً توجه داشته باشید که شماره موبایل واردشده باید به نام{' '}
                  <b className="text-dark">صاحب حساب</b> باشد تا روند احراز هویت
                  شما سریع‌تر و بدون مشکل انجام شود.
                  <br />
                  حساب بانکی شما در <b className="text-dark">مرحله بعدی</b>{' '}
                  دریافت میشود.
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

            {/* فیلد آدرس */}
            <Input
              type="text"
              name="address"
              label={'آدرس محل سکونت'}
              value={formData.address}
              onChange={handleChange}
              className="border w-full p-2"
            />
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-lightgray pt-4 mt-16">
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
