import { NextResponse } from 'next/server'

export async function POST(req) {
  const { Authority, Status, Amount } = await req.json()

  if (Status !== 'OK') {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const verifyResponse = await fetch(
    'https://sandbox.zarinpal.com/pg/v4/payment/verify.json', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        amount: Amount,
        authority: Authority,
      }),
    }
  )

  const result = await verifyResponse.json()

  if (result.data?.code === 100) {
    return NextResponse.json({
      success: true,
      refId: result.data.ref_id,
    })
  } else {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
