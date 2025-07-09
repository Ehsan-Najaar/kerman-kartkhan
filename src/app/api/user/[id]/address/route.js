import connectDB from '@/lib/db'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const SECRET_KEY = process.env.JWT_SECRET

async function getAuthUser() {
  const token = cookies().get('token')?.value
  if (!token) return null

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    return decoded
  } catch {
    return null
  }
}

export async function PUT(req, { params }) {
  await connectDB()

  const authUser = await getAuthUser()
  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = params.id

  // فقط admin یا خود کاربر حق تغییر دارد
  if (authUser.userId !== userId && !authUser.roles?.includes('admin')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { address: newAddress, index } = await req.json()

  try {
    const user = await User.findById(userId)
    if (!user)
      return NextResponse.json({ error: 'کاربر پیدا نشد' }, { status: 404 })

    if (!user.address) user.address = []

    if (index !== null && index !== undefined) {
      // ویرایش آدرس
      user.address[index] = newAddress
    } else {
      if (user.address.length >= 3) {
        return NextResponse.json(
          { error: 'حداکثر ۳ آدرس مجاز است' },
          { status: 400 }
        )
      }
      user.address.push(newAddress)
    }

    await user.save()

    return NextResponse.json({ address: user.address }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'خطا در ذخیره آدرس' }, { status: 500 })
  }
}
