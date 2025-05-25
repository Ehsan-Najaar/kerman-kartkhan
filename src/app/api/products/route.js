// /api/products/route.js
import connectDB from '@/lib/db'
import Product from '@/models/Product'
// ایمپورت کردن مدل اسکیما دسته بندی
import Category from '@/models/Category'
import { NextResponse } from 'next/server'

export async function GET(req) {
  await connectDB()
  try {
    const products = await Product.find({}).populate('category')
    return NextResponse.json(products)
  } catch (error) {
    console.error('❌ API Error:', error)
    return NextResponse.json(
      { error: 'خطا در دریافت محصولات' },
      { status: 500 }
    )
  }
}
