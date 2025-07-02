import { NextResponse } from 'next/server'

export async function POST(req) {
  const { amount, callback_url, description } = await req.json()

  const merchant_id = process.env.ZARINPAL_MERCHANT_ID

  const response = await fetch(
    'https://api.zarinpal.com/pg/v4/payment/request.json',
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
      url: `https://www.zarinpal.com/pg/StartPay/${data.data.authority}`,
    })
  } else {
    return NextResponse.json({ error: data.errors }, { status: 400 })
  }
}
