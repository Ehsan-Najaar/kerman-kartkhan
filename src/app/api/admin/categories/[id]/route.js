import connectDB from '@/lib/db'
import Category from '@/models/Category'
import { NextResponse } from 'next/server'

export async function PUT(req, context) {
  // اینجا باید await کنی
  const { id } = await context.params // استفاده از await برای params
  const categoryData = await req.json()
  await connectDB()

  const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, {
    new: true,
  })

  return NextResponse.json(updatedCategory, { status: 200 })
}

export async function DELETE(req, context) {
  // اینجا هم همینطور
  const { id } = await context.params
  await connectDB()
  await Category.findByIdAndDelete(id)
  return NextResponse.json({ message: 'Category deleted' }, { status: 200 })
}
