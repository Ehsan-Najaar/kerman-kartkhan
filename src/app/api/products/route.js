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
    const type = searchParams.get('type')
    const brand = searchParams.get('brand')
    const model = searchParams.get('model')

    const filter = {}
    if (brand) filter.brand = { $regex: brand, $options: 'i' }
    if (type) filter.type = { $regex: type, $options: 'i' }
    if (model) filter.model = { $regex: model, $options: 'i' }



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
