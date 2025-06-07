import otpStorage from '@/lib/otpStorage'

export async function POST(req) {
  const { phone } = await req.json()

  if (!phone) {
    return new Response(JSON.stringify({ error: 'شماره موبایل وارد نشده' }), {
      status: 400,
    })
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString()
  otpStorage.set(phone, { code, expires: Date.now() + 5 * 60 * 1000 })

  const apiUrl = process.env.MELI_API_URL
  const apiKey = process.env.MELI_API_KEY
  const url = `${apiUrl}/${apiKey}`
  const data = JSON.stringify({ to: phone, message: `کد تایید شما: ${code}` })

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    })

    const result = await response.json()
    console.log(`OTP sent to ${phone}: ${code}`)
    console.log('Response from SMS API:', result)

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'ارسال پیامک ناموفق بود' }), {
        status: 500,
      })
    }

    return new Response(JSON.stringify({ status: 'ok' }), { status: 200 })
  } catch (error) {
    console.error('خطای اتصال به API پیامک:', error)
    return new Response(JSON.stringify({ error: 'خطا در ارسال پیامک' }), {
      status: 500,
    })
  }
}
