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

  const code = Math.floor(100000 + Math.random() * 900000).toString()
  otpStorage.set(phone, { code, expires: Date.now() + 5 * 60 * 1000 })

  const apiUrl = process.env.MELI_API_URL
  const apiKey = process.env.MELI_API_KEY
  const url = `${apiUrl}/${apiKey}`

  const data = JSON.stringify({
    to: phone,
    code: code,
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

    console.log(`OTP code generated for ${phone}: ${code}`)
    console.log('Response from SMS API:', result)

    if (!response.ok) {
      return NextResponse.json(
        { error: 'ارسال پیامک ناموفق بود', result },
        { status: 500 }
      )
    }

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
