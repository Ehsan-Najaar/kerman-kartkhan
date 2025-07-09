'use client'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAppContext } from '@/context/AppContext'
import { MessageSquare, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FiEdit } from 'react-icons/fi'

export default function AuthModal({ isOpen, onClose }) {
  const { user, setUser } = useAppContext()
  const router = useRouter()
  const [step, setStep] = useState('phone')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [seconds, setSeconds] = useState(60)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  // ریست حالت‌ها هنگام بستن
  useEffect(() => {
    if (!isOpen) {
      setStep('phone')
      setPhone('')
      setOtp(['', '', '', '', '', ''])
      setLoading(false)
      setSeconds(60)
    }
  }, [isOpen])

  useEffect(() => {
    if (step === 'verify' && seconds > 0) {
      const timer = setInterval(() => setSeconds((s) => s - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [step, seconds])

  const handleChange = (e, index) => {
    let value = e.target.value

    // اگر کاربر کل کد را paste کند (مثلاً 6 رقم یکجا)
    if (value.length > 1) {
      const values = value.slice(0, 6).split('')
      const newOtp = [...otp]
      for (let i = 0; i < values.length; i++) {
        newOtp[i] = values[i]
      }
      setOtp(newOtp)

      if (values.join('').length === 6) {
        verifyOtp(values.join(''))
      }

      const lastIndex = values.length - 1
      const nextInput = document.getElementById(`otp-${lastIndex}`)
      if (nextInput) nextInput.focus()
      return
    }

    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }

    if (newOtp.join('').length === 6) {
      verifyOtp(newOtp.join(''))
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleResendOtp = async () => {
    await fetch('/api/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    setSeconds(60)
    toast.success('کد مجدداً ارسال شد')
  }

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
      toast.error(data.error || 'خطا در ارسال کد')
    }
  }

  const verifyOtp = async (enteredCode) => {
    const code = enteredCode || otp.join('')
    if (code.length !== 6) {
      toast.error('کد ۶ رقمی را کامل وارد کنید')
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
      toast.success('ورود موفقیت‌آمیز بود!')

      setUser(data.user)

      onClose()
      router.push('/shop/dashboard/edit-account')
    } else {
      toast.error(data.error || 'کد نادرست است')
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  sendOtp()
                }
              }}
            />
            <Button
              onClick={sendOtp}
              variant="primary"
              fontWeight="medium"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'در حال ارسال...' : 'دریافت کد'}
            </Button>
          </div>
        )}

        {step === 'verify' && (
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-semibold">کد تایید ورود</h2>
            <p className="text-sm text-gray-600">
              کد پیامک شده به شماره {phone} را وارد کنید.
            </p>
            <div className="grid place-items-center">
              <button
                className="flex items-center gap-2 text-sm text-blue-600 mt-1 cursor-pointer"
                onClick={() => setStep('phone')}
              >
                <FiEdit />
                تغییر شماره موبایل
              </button>
            </div>

            <div className="flex justify-center gap-2 my-4" dir="ltr">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  dir="ltr"
                  placeholder="-"
                  className="w-12 h-12 text-center border border-lightgray rounded-md text-xl bg-lightgray/35 font-bold outline-none focus:border-secondary"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            <Button
              onClick={() => verifyOtp()}
              className="w-full"
              disabled={loading}
            >
              {loading ? 'در حال بررسی...' : 'تایید کد'}
            </Button>

            {seconds > 0 ? (
              <p className="text-sm text-gray-500 mt-2">
                0:{seconds < 10 ? `0${seconds}` : seconds} مانده تا ارسال مجدد
                کد
              </p>
            ) : (
              <>
                <p className="text-gray text-xs text-right mb-2">
                  آیا کد را دریافت نکرده‌اید؟
                </p>
                <Button
                  onClick={handleResendOtp}
                  variant="ghost"
                  fontWeight="medium"
                  className="w-full"
                >
                  <MessageSquare size={18} />
                  ارسال مجدد کد
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
