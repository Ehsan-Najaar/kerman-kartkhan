'use client'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { X } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function AuthModal({ isOpen, onClose }) {
  const [step, setStep] = useState('phone')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  async function sendOtp() {
    if (!phone) {
      toast.error('شماره موبایل را وارد کنید')
      return
    }
    setLoading(true)
    const res = await fetch('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    })
    setLoading(false)
    if (res.ok) {
      setStep('verify')
      toast.success('کد تایید 6 رقمی ارسال شد')
    } else {
      const data = await res.json()
      alert(data.error || 'خطا در ارسال کد')
    }
  }

  async function verifyOtp() {
    if (!code) {
      toast.error('کد تایید را وارد کنید')
      return
    }
    setLoading(true)
    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, code }),
    })
    setLoading(false)
    const data = await res.json()
    if (res.ok) {
      toast.success('ورود موفقیت‌آمیز بود! خوش آمدید.')
      onClose()
      // TODO: ذخیره توکن یا اطلاعات کاربر در سشن یا context
    } else {
      toast.error(data.error || 'کد تایید اشتباه است')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm relative">
        <button
          className="absolute top-4 left-4 cursor-pointer text-gray-600 hover:text-black transition-all duration-300"
          onClick={onClose}
        >
          <X />
        </button>

        {step === 'phone' && (
          <div className="space-y-4">
            <h2 className="text-xl mb-4 text-center">ورود / ثبت‌نام</h2>
            <Input
              type="tel"
              label="شماره موبایل"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button
              onClick={sendOtp}
              variant="primary"
              fontWeight="medium"
              className="w-full"
            >
              {loading ? 'در حال ارسال...' : 'ارسال کد'}
            </Button>
          </div>
        )}

        {step === 'verify' && (
          <div className="space-y-4">
            <h2 className="text-xl mb-4 text-center">کد تایید را وارد کنید</h2>
            <Input
              type="text"
              label="کد تایید"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              onClick={verifyOtp}
              variant="primary"
              fontWeight="medium"
              className="w-full"
            >
              {loading ? 'در حال ارسال...' : 'ارسال کد'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
