// src/app/api/categories/route.js
import connectDB from '@/lib/db'
import Category from '@/models/Category'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()
    const categories = await Category.find().populate('parent')
    return NextResponse.json(categories, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching categories' },
      { status: 500 }
    )
  }
}
