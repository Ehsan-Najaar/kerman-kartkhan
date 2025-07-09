import { checkAuth } from '@/lib/auth'
import connectDB from '@/lib/db'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function GET(req) {
  await connectDB()

  const { user, error, status } = await checkAuth(req)
  if (error) {
    return NextResponse.json({ error }, { status })
  }

  if (!user.roles?.includes('admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const users = await User.find(
      {},
      '_id name phone roles isActive createdAt address'
    )
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error.message, error.stack)
    return NextResponse.json(
      { error: 'خطا در دریافت کاربران' },
      { status: 500 }
    )
  }
}

export async function PUT(req) {
  await connectDB()

  const { user, error, status } = await checkAuth(req)
  if (error) {
    return NextResponse.json({ error }, { status })
  }

  if (!user.roles?.includes('admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { userId, roles } = body

    if (!userId || !roles) {
      return NextResponse.json(
        { error: 'اطلاعات ناقص ارسال شده است.' },
        { status: 400 }
      )
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { roles },
      { new: true, runValidators: true }
    )

    if (!updatedUser) {
      return NextResponse.json({ error: 'کاربر پیدا نشد.' }, { status: 404 })
    }

    return NextResponse.json({
      message: 'نقش‌های کاربر با موفقیت تغییر کرد.',
      user: updatedUser,
    })
  } catch (error) {
    console.error('Error updating user roles:', error.message, error.stack)
    return NextResponse.json(
      { error: 'خطا در بروزرسانی نقش‌های کاربر' },
      { status: 500 }
    )
  }
}

export async function DELETE(req) {
  await connectDB()

  const { user, error, status } = await checkAuth(req)
  if (error) {
    return NextResponse.json({ error }, { status })
  }

  if (!user.roles?.includes('admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'شناسه کاربر ارسال نشده است.' },
        { status: 400 }
      )
    }

    const deletedUser = await User.findByIdAndDelete(userId)

    if (!deletedUser) {
      return NextResponse.json({ error: 'کاربر پیدا نشد.' }, { status: 404 })
    }

    return NextResponse.json({
      message: 'کاربر با موفقیت حذف شد.',
      user: deletedUser,
    })
  } catch (error) {
    console.error('Error deleting user:', error.message, error.stack)
    return NextResponse.json({ error: 'خطا در حذف کاربر' }, { status: 500 })
  }
}
