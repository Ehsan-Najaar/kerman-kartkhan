// /api/admin/products/[id]/route.js
import Product from '@/models/Product'
import connectDB from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  await connectDB()
  try {
    const product = await Product.findById(params.id).populate('category')
    if (!product)
      return NextResponse.json({ error: 'محصول پیدا نشد' }, { status: 404 })
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'خطا در دریافت محصول' }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  await connectDB()
  try {
    const data = await req.json()
    const updated = await Product.findByIdAndUpdate(params.id, data, {
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

export async function DELETE(req, { params }) {
  await connectDB()
  try {
    const deleted = await Product.findByIdAndDelete(params.id)
    if (!deleted)
      return NextResponse.json({ error: 'محصول پیدا نشد' }, { status: 404 })
    return NextResponse.json({ message: 'محصول با موفقیت حذف شد' })
  } catch (error) {
    return NextResponse.json({ error: 'خطا در حذف محصول' }, { status: 500 })
  }
}

export async function POST(req) {
  await connectDB()
  try {
    const data = await req.json()
    const created = await Product.create(data)
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'خطا در ایجاد محصول' }, { status: 500 })
  }
}
