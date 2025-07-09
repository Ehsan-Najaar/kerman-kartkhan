import connectToDB from '@/lib/db'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const SECRET_KEY = process.env.JWT_SECRET

async function getAuthUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) return null

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    return decoded
  } catch {
    return null
  }
}

export async function GET(req, context) {
  await connectToDB()

  const authUser = await getAuthUser()
  if (!authUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const params = await context.params // await اضافه شد
  const { id } = params

  if (authUser.userId !== id && !authUser.roles?.includes('admin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  try {
    const user = await User.findById(id)
    if (!user) {
      return NextResponse.json({ message: 'کاربر پیدا نشد' }, { status: 404 })
    }

    const { password, ...rest } = user.toObject()
    return NextResponse.json(rest)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'خطا در دریافت اطلاعات کاربر' },
      { status: 500 }
    )
  }
}

export async function PUT(req, context) {
  await connectToDB()

  const authUser = await getAuthUser()
  if (!authUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const params = await context.params // await اضافه شد
  const { id } = params

  if (authUser.userId !== id && !authUser.roles?.includes('admin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()

  try {
    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!updatedUser) {
      return NextResponse.json({ message: 'کاربر پیدا نشد' }, { status: 404 })
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'خطا در بروزرسانی اطلاعات' },
      { status: 500 }
    )
  }
}
