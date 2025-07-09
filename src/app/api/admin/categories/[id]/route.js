import { checkAuth } from '@/lib/auth'
import connectDB from '@/lib/db'
import Category from '@/models/Category'
import { NextResponse } from 'next/server'

export async function PUT(req, context) {
  await connectDB()

  const { user, error, status } = await checkAuth(req)
  if (error) {
    return NextResponse.json({ error }, { status })
  }

  if (!user.roles?.includes('admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await context.params
  const categoryData = await req.json()

  const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, {
    new: true,
  })

  return NextResponse.json(updatedCategory, { status: 200 })
}

export async function DELETE(req, context) {
  await connectDB()

  const { user, error, status } = await checkAuth(req)
  if (error) {
    return NextResponse.json({ error }, { status })
  }

  if (!user.roles?.includes('admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await context.params
  await Category.findByIdAndDelete(id)

  return NextResponse.json({ message: 'Category deleted' }, { status: 200 })
}
