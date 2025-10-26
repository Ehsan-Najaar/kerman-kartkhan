import { checkAuth } from '@/lib/auth'
import connectDB from '@/lib/db'
import Article from '@/models/Article'
import { NextResponse } from 'next/server'

export async function POST(req) {
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

    const created = await Article.create(body)

    return NextResponse.json(
      {
        success: true,
        message: 'مقاله با موفقیت ایجاد شد ✅',
        article: created,
      },
      { status: 201 }
    )
  } catch (err) {
    console.error(err)

    // ✅ مدیریت خطای اعتبارسنجی Mongoose
    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map((e) => e.message)
      return NextResponse.json(
        {
          success: false,
          message: 'خطای اعتبارسنجی',
          errors: validationErrors,
        },
        { status: 400 }
      )
    }

    // سایر خطاهای احتمالی
    return NextResponse.json(
      {
        success: false,
        message: 'خطا در ایجاد مقاله ❌',
        error: err.message,
      },
      { status: 500 }
    )
  }
}
