import { NextResponse } from 'next/server'

export async function POST(req) {
  const { amount, callback_url, description } = await req.json()

  const merchant_id = process.env.ZARINPAL_MERCHANT_ID

  const response = await fetch(
    'https://sandbox.zarinpal.com/pg/v4/payment/request.json', // اینجا آدرس sandbox گذاشته شد
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        merchant_id,
        amount,
        callback_url,
        description,
      }),
    }
  )

  const data = await response.json()

  if (data.data && data.data.code === 100) {
    return NextResponse.json({
      authority: data.data.authority,
      url: `https://sandbox.zarinpal.com/pg/StartPay/${data.data.authority}`, // اینجا هم آدرس sandbox
    })
  } else {
    return NextResponse.json({ error: data.errors }, { status: 400 })
  }
}
