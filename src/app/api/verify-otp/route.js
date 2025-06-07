import connectDB from '@/lib/db'
import otpStorage from '@/lib/otpStorage'
import User from '@/models/User'

export async function POST(req) {
  const { phone, code } = await req.json()

  if (!phone || !code) {
    return new Response(JSON.stringify({ error: 'شماره یا کد وارد نشده' }), {
      status: 400,
    })
  }

  const otpData = otpStorage.get(phone)

  if (!otpData) {
    return new Response(JSON.stringify({ error: 'کد تایید ارسال نشده' }), {
      status: 400,
    })
  }

  if (otpData.expires < Date.now()) {
    otpStorage.delete(phone)
    return new Response(JSON.stringify({ error: 'کد منقضی شده' }), {
      status: 400,
    })
  }

  if (otpData.code !== code) {
    return new Response(JSON.stringify({ error: 'کد نادرست است' }), {
      status: 400,
    })
  }

  // اگر OTP درست بود، برو سراغ دیتابیس
  try {
    await connectDB()

    let user = await User.findOne({ phone })

    if (!user) {
      user = await User.create({ phone })
      console.log('کاربر جدید ایجاد شد:', user)
    } else {
      console.log('ورود کاربر قدیمی:', user)
    }

    otpStorage.delete(phone)

    return new Response(JSON.stringify({ status: 'verified', user }), {
      status: 200,
    })
  } catch (err) {
    console.error('خطا در ذخیره کاربر:', err)
    return new Response(JSON.stringify({ error: 'خطا در سرور' }), {
      status: 500,
    })
  }
}
