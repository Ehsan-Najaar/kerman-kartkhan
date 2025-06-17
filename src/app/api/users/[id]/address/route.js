import connectDB from '@/lib/db'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function PUT(req, { params }) {
  await connectDB()

  const userId = await params.id
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
