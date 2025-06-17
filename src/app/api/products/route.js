// /api/products/route.js

import connectDB from '@/lib/db'
import Product from '@/models/Product'
// ایمپورت کردن مدل اسکیما دسته بندی
import Category from '@/models/Category'
import { NextResponse } from 'next/server'

export async function GET(req) {
  await connectDB()

  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') // گرفتن نوع کارتخوان از کوئری

    const filter = {}
    if (type) {
      filter.type = type // فیلتر کردن بر اساس نوع (ثابت، سیار، اندرویدی)
    }

    const products = await Product.find(filter).populate('category')

    return NextResponse.json(products)
  } catch (error) {
    console.error('❌ API Error:', error)
    return NextResponse.json(
      { error: 'خطا در دریافت محصولات' },
      { status: 500 }
    )
  }
}
