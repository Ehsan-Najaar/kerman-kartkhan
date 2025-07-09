// /api/admin/products/route.js
import { checkAuth } from '@/lib/auth'
import connectDB from '@/lib/db'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'

export async function GET(req) {
  await connectDB()

  try {
    const products = await Product.find().sort({ createdAt: -1 })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'خطا در دریافت محصولات' },
      { status: 500 }
    )
  }
}

export async function POST(req) {
  await connectDB()

  const { user, error, status } = await checkAuth(req)
  if (error) {
    return NextResponse.json({ error }, { status })
  }

  if (!user.roles?.includes('admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()
    const created = await Product.create(data)
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('🛑 خطا در افزودن محصول:', error)
    return NextResponse.json({ error: 'خطا در افزودن محصول' }, { status: 500 })
  }
}
