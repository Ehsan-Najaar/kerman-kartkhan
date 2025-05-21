// /api/admin/products/[id]/route.js
import connectDB from '@/lib/db'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'

export async function GET(req, context) {
  await connectDB()
  try {
    const { id } = await context.params

    const product = await Product.findById(id).populate('category')
    if (!product)
      return NextResponse.json({ error: 'محصول پیدا نشد' }, { status: 404 })

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'خطا در دریافت محصول' }, { status: 500 })
  }
}

export async function PUT(req, context) {
  await connectDB()
  try {
    const { id } = await context.params

    const data = await req.json()
    const updated = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
    if (!updated)
      return NextResponse.json({ error: 'محصول پیدا نشد' }, { status: 404 })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json(
      { error: 'خطا در بروزرسانی محصول' },
      { status: 500 }
    )
  }
}

export async function DELETE(req, context) {
  await connectDB()
  try {
    const { id } = await context.params

    const deleted = await Product.findByIdAndDelete(id)
    if (!deleted)
      return NextResponse.json({ error: 'محصول پیدا نشد' }, { status: 404 })

    return NextResponse.json({ message: 'محصول با موفقیت حذف شد' })
  } catch (error) {
    return NextResponse.json({ error: 'خطا در حذف محصول' }, { status: 500 })
  }
}
