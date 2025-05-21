// /api/admin/products/route.js
import connectDB from '@/lib/db'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'

export async function GET() {
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
  try {
    const data = await req.json()
    const created = await Product.create(data)
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('🛑 خطا در افزودن محصول:', error)
    return NextResponse.json({ error: 'خطا در افزودن محصول' }, { status: 500 })
  }
}
