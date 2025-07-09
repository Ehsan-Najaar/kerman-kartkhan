// src/app/api/admin/orders/route.js

import { checkAuth } from '@/lib/auth'
import connectDB from '@/lib/db'
import Order from '@/models/Order'
import { NextResponse } from 'next/server'

export async function GET(req) {
  await connectDB()

  const { user, error, status } = await checkAuth(req)
  if (error) return NextResponse.json({ error }, { status })
  if (!user.roles?.includes('admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .populate('items.productId', 'name images')
    .lean()

  return NextResponse.json(orders)
}

export async function PUT(req) {
  await connectDB()

  const { user, error, status } = await checkAuth(req)
  if (error) return NextResponse.json({ error }, { status })

  if (!user.roles?.includes('admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { orderId, orderStatus, paymentStatus } = await req.json()
    if (!orderId) {
      return NextResponse.json(
        { error: 'orderId is required' },
        { status: 400 }
      )
    }

    const order = await Order.findById(orderId)
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (orderStatus) order.orderStatus = orderStatus
    if (paymentStatus) order.paymentStatus = paymentStatus

    await order.save()

    return NextResponse.json({ message: 'Order updated successfully', order })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE(req) {
  await connectDB()

  const { user, error, status } = await checkAuth(req)
  if (error) return NextResponse.json({ error }, { status })

  if (!user.roles?.includes('admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { orderId } = await req.json()
    if (!orderId) {
      return NextResponse.json(
        { error: 'orderId is required' },
        { status: 400 }
      )
    }

    const deleted = await Order.findByIdAndDelete(orderId)

    if (!deleted) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Order deleted successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
