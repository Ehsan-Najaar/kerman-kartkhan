import connectDB from '@/lib/db'
import Otp from '@/models/Otp'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { phone, code } = await req.json()

  if (!phone || !code) {
    return NextResponse.json(
      { error: 'شماره یا کد تایید وارد نشده' },
      { status: 400 }
    )
  }

  const otpData = await Otp.findOne({ phone })

  if (!otpData) {
    return NextResponse.json({ error: 'کد تایید معتبر نیست' }, { status: 400 })
  }

  if (otpData.expiresAt < Date.now()) {
    await Otp.findOneAndDelete({ phone })
    return NextResponse.json({ error: 'کد منقضی شده' }, { status: 400 })
  }

  if (String(otpData.code) !== String(code)) {
    return NextResponse.json({ error: 'کد نادرست است' }, { status: 400 })
  }

  try {
    await connectDB()

    let user = await User.findOne({ phone })
    let isNewUser = false

    if (!user) {
      user = await User.create({ phone })
      isNewUser = true
    }

    await Otp.findOneAndDelete({ phone })

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

    const cookieStore = await cookies()
    cookieStore.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return NextResponse.json(
      { status: 'verified', user, isNewUser },
      { status: 200 }
    )
  } catch (err) {
    console.error('خطا در ذخیره کاربر:', err)
    return NextResponse.json({ error: 'خطا در سرور' }, { status: 500 })
  }
}
