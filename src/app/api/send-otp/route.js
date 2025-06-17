import otpStorage from '@/lib/otpStorage'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { phone } = await req.json()

  if (!phone) {
    return NextResponse.json(
      { error: 'شماره موبایل وارد نشده' },
      { status: 400 }
    )
  }

  const apiUrl = process.env.MELI_API_URL
  const apiKey = process.env.MELI_API_KEY
  const url = `${apiUrl}/${apiKey}`

  const data = JSON.stringify({
    to: phone,
  })

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })

    let result = null
    try {
      result = await response.json()
    } catch {}

    console.log('Response from SMS API:', result)

    if (!response.ok || !result?.code) {
      return NextResponse.json(
        { error: 'ارسال پیامک ناموفق بود', result },
        { status: 500 }
      )
    }

    // ✅ ذخیره کدی که سرویس برگردونده
    otpStorage.set(phone, {
      code: result.code,
      expires: Date.now() + 5 * 60 * 1000,
    })

    console.log(`OTP code saved for ${phone}: ${result.code}`)

    return NextResponse.json({ status: 'ok' }, { status: 200 })
  } catch (error) {
    console.error('خطای اتصال به API پیامک:', error)

    return NextResponse.json(
      {
        error: 'خطا در ارسال پیامک',
        message: error.message,
        name: error.name,
        stack: error.stack,
      },
      { status: 500 }
    )
  }
}
