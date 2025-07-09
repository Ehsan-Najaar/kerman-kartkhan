// api/orders/route.js
import { checkAuth } from '@/lib/auth'
import connectDB from '@/lib/db'
import Order from '@/models/Order'
import { NextResponse } from 'next/server'

export async function GET(req) {
  await connectDB()

  const { user, error, status } = await checkAuth(req)
  if (error) {
    return NextResponse.json({ error }, { status })
  }

  // اینجا مطمئن شو کلید userId در توکن همونه که تو DB ذخیره می‌کنی
  const orders = await Order.find({ userId: user.userId })
    .sort({ createdAt: -1 })
    .populate('items.productId')

  return NextResponse.json(orders)
}

export async function POST(req) {
  await connectDB()

  const { user, error, status } = await checkAuth(req)
  if (error) {
    return NextResponse.json({ error }, { status })
  }

  try {
    const body = await req.json()

    const newOrder = await Order.create({
      ...body,
      userId: user.userId,
    })

    return NextResponse.json(newOrder)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to create order', details: error.message },
      { status: 500 }
    )
  }
}
