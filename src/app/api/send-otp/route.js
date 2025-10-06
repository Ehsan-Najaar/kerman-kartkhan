import Otp from '@/models/Otp'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { phone } = await req.json()

  if (!phone) {
    return NextResponse.json(
      { error: 'لطفا شماره موبایل را وارد کنید' },
      { status: 400 }
    )
  }

  const phoneRegex = /^09\d{9}$/
  if (!phoneRegex.test(phone) || phone.length !== 11) {
    return NextResponse.json(
      { error: 'شماره موبایل وارد شده معتبر نمیباشد' },
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
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
    const result = await res.json()

    if (!res.ok || !result?.code) {
      return NextResponse.json(
        { error: 'ارسال پیامک ناموفق بود', result },
        { status: 500 }
      )
    }

    const code = result.code
    const expiresAt = Date.now() + 1 * 60 * 1000

    // save code in db
    const otp = await Otp.create({ phone, code, expiresAt })
    console.log(otp)

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
