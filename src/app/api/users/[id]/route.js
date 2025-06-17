import connectToDB from '@/lib/db'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  await connectToDB()

  const { id } = await params

  try {
    const user = await User.findById(id)
    if (!user) {
      return NextResponse.json({ message: 'کاربر پیدا نشد' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { message: 'خطا در دریافت اطلاعات کاربر' },
      { status: 500 }
    )
  }
}

export async function PUT(req, { params }) {
  await connectToDB()

  const { id } = params
  const body = await req.json()

  try {
    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
    })

    if (!updatedUser) {
      return NextResponse.json({ message: 'کاربر پیدا نشد' }, { status: 404 })
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json(
      { message: 'خطا در بروزرسانی اطلاعات' },
      { status: 500 }
    )
  }
}
