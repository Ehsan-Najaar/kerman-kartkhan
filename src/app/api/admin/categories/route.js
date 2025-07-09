// api/admin/categories/route.js

import { checkAuth } from '@/lib/auth'
import connectDB from '@/lib/db'
import Category from '@/models/Category'
import { NextResponse } from 'next/server'

export async function GET(req) {
  await connectDB()

  try {
    const categories = await Category.find()
    return NextResponse.json(categories, { status: 200 })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { message: 'خطا در دریافت دسته‌بندی‌ها' },
      { status: 500 }
    )
  }
}

export async function POST(req) {
  await connectDB()

  // 🔐 بررسی احراز هویت و نقش admin
  const { user, error, status } = await checkAuth(req)
  if (error) {
    return NextResponse.json({ error }, { status })
  }

  if (!user.roles?.includes('admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { title, slug, description, image, parent } = await req.json()

    if (!title || !slug) {
      return NextResponse.json(
        { message: 'عنوان و شناسه الزامی است' },
        { status: 400 }
      )
    }

    const newCategory = new Category({
      title,
      slug,
      description,
      image,
      parent: parent || null,
    })

    const savedCategory = await newCategory.save()
    return NextResponse.json(savedCategory, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { message: 'خطا در ایجاد دسته‌بندی' },
      { status: 500 }
    )
  }
}
