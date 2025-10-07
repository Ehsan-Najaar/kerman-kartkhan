import Otp from '@/models/Otp'
import { NextResponse } from 'next/server'

const OTP_EXPIRY_MS = 1 * 60 * 1000 // اعتبار کد: 1 دقیقه
const COOLDOWN_MS = 60 * 1000 // فاصله بین درخواست‌ها: 1 دقیقه
const MAX_REQUESTS_PER_DAY = 7 // سقف درخواست روزانه

export async function POST(req) {
  try {
    const { phone } = await req.json()

    if (!phone) {
      return NextResponse.json(
        { error: 'شماره موبایل الزامی است.' },
        { status: 400 }
      )
    }

    const phoneRegex = /^09\d{9}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'شماره موبایل معتبر نیست.' },
        { status: 400 }
      )
    }

    const now = new Date()

    // تمام OTPهای موجود برای این شماره
    const allOtps = await Otp.find({ phone }).sort({ createdAt: -1 })

    // شمارش OTPهای 24 ساعت اخیر
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const dailyOtps = allOtps.filter(
      (otp) => otp.createdAt >= twentyFourHoursAgo
    )

    // بررسی سقف روزانه (پیام عمومی)
    if (dailyOtps.length >= MAX_REQUESTS_PER_DAY) {
      return NextResponse.json(
        {
          error:
            'امکان دریافت کد در حال حاضر وجود ندارد. لطفاً بعداً دوباره تلاش کنید.',
        },
        { status: 429 }
      )
    }

    // بررسی فاصله بین دو درخواست (cooldown)
    const lastOtp = allOtps[0]
    if (lastOtp && Date.now() - lastOtp.createdAt.getTime() < COOLDOWN_MS) {
      const secondsLeft = Math.ceil(
        (COOLDOWN_MS - (Date.now() - lastOtp.createdAt.getTime())) / 1000
      )
      return NextResponse.json(
        { error: `لطفاً ${secondsLeft} ثانیه دیگر دوباره تلاش کنید.` },
        { status: 429 }
      )
    }

    // ارسال به API پیامک
    const apiUrl = process.env.MELI_API_URL
    const apiKey = process.env.MELI_API_KEY
    const url = `${apiUrl}/${apiKey}`

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: phone }),
    })

    const result = await res.json()
    if (!res.ok || !result?.code) {
      return NextResponse.json(
        { error: 'ارسال پیامک ناموفق بود.' },
        { status: 500 }
      )
    }

    // ذخیره OTP در دیتابیس
    const code = result.code
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS)
    const deleteAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // حذف بعد از 24 ساعت

    await Otp.create({ phone, code, expiresAt, deleteAt })

    return NextResponse.json(
      { status: 'ok', message: 'کد تایید ارسال شد.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ خطای OTP:', error)
    return NextResponse.json(
      { error: 'خطا در ارسال پیامک', message: error.message },
      { status: 500 }
    )
  }
}
