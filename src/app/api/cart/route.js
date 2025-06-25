// GET /api/cart

import connectDB from '@/lib/db'
import Cart from '@/models/Cart'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET

async function getUserIdFromRequest() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return null

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded.userId || decoded.id || null
  } catch {
    return null
  }
}

export async function GET() {
  await connectDB()

  const userId = await getUserIdFromRequest()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const cart = await Cart.findOne({ userId }).populate('items.productId')
  return NextResponse.json(cart || { items: [] })
}

// POST /api/cart
export async function POST(req) {
  await connectDB()

  const userId = await getUserIdFromRequest()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  let { productId, quantity = 1, selectedColor, selectedVariant } = body

  // اعتبارسنجی productId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return NextResponse.json(
      { error: 'شناسه محصول نامعتبر است' },
      { status: 400 }
    )
  }

  const objectId = new mongoose.Types.ObjectId(productId)

  let cart = await Cart.findOne({ userId })

  if (!cart) {
    cart = new Cart({
      userId,
      items: [
        {
          productId: objectId,
          quantity,
          selectedColor,
          selectedVariant,
        },
      ],
    })
  } else {
    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === objectId.toString() &&
        item.selectedColor === selectedColor &&
        item.selectedVariant === selectedVariant
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.items.push({
        productId: objectId,
        quantity,
        selectedColor,
        selectedVariant,
      })
    }
  }

  await cart.save()
  return NextResponse.json(cart)
}

// DELETE /api/cart
export async function DELETE(req) {
  await connectDB()

  const userId = await getUserIdFromRequest()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { productId, selectedColor, selectedVariant } = body

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return NextResponse.json(
      { error: 'شناسه محصول نامعتبر است' },
      { status: 400 }
    )
  }

  const objectId = new mongoose.Types.ObjectId(productId)

  const cart = await Cart.findOne({ userId })
  if (!cart) {
    return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
  }

  cart.items = cart.items.filter(
    (item) =>
      item.productId.toString() !== objectId.toString() ||
      item.selectedColor !== selectedColor ||
      item.selectedVariant !== selectedVariant
  )

  await cart.save()
  return NextResponse.json(cart)
}
