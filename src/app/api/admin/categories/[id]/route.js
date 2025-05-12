// src/app/api/admin/categories/[id]/route.js
import connectDB from '@/lib/db'
import Category from '@/models/Category'
import { NextResponse } from 'next/server'

export async function PUT(req, { params }) {
  // تغییر در نحوه دریافت params
  try {
    const { id } = params // به جای context.params، مستقیماً params را استفاده می‌کنیم
    const categoryData = await req.json()
    await connectDB()
    const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, {
      new: true,
    })
    return NextResponse.json(updatedCategory, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating category' },
      { status: 500 }
    )
  }
}

export async function DELETE(req, { params }) {
  // تغییر مشابه در اینجا
  try {
    const { id } = params // استفاده از params به جای context.params
    await connectDB()
    await Category.findByIdAndDelete(id)
    return NextResponse.json({ message: 'Category deleted' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting category' },
      { status: 500 }
    )
  }
}
