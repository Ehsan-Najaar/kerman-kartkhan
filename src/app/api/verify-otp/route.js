import connectDB from '@/lib/db'
import otpStorage from '@/lib/otpStorage'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

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

  if (String(otpData.code) !== String(code)) {
    return new Response(JSON.stringify({ error: 'کد نادرست است' }), {
      status: 400,
    })
  }

  try {
    await connectDB()

    let user = await User.findOne({ phone })
    let isNewUser = false

    if (!user) {
      user = await User.create({ phone })
      isNewUser = true
    }

    otpStorage.delete(phone)

    const token = jwt.sign(
      {
        userId: user._id,
        phone: user.phone,
        name: user.name || '',
        roles: user.roles || [],
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    const cookieStore = cookies()
    cookieStore.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return new Response(
      JSON.stringify({ status: 'verified', user, isNewUser }),
      { status: 200 }
    )
  } catch (err) {
    console.error('خطا در ذخیره کاربر:', err)
    return new Response(JSON.stringify({ error: 'خطا در سرور' }), {
      status: 500,
    })
  }
}
