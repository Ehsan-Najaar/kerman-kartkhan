// api/admin/articles/[articleId]/route.js

import Article from '@/models/Article'
import { NextResponse } from 'next/server'

export async function DELETE(req, { params }) {
  const { articleId } = await params

  if (!articleId) {
    return NextResponse.json(
      { message: 'شناسه مقاله ارسال نشده است' },
      { status: 400 }
    )
  }

  const deleted = await Article.findByIdAndDelete(articleId)

  if (!deleted) {
    return NextResponse.json({ message: 'مقاله پیدا نشد' }, { status: 404 })
  }

  return NextResponse.json({ message: 'مقاله مورد نظر با موفقیت حذف شد' })
}

export async function PUT(req, { params }) {
  const { articleId } = await params

  if (!articleId) {
    return NextResponse.json(
      { message: 'شناسه مقاله ارسال نشده است' },
      { status: 400 }
    )
  }

  try {
    const body = await req.json()
    const updatedArticle = await Article.findByIdAndUpdate(articleId, body, {
      new: true,
      runValidators: true,
    })

    if (!updatedArticle) {
      return NextResponse.json({ message: 'مقاله پیدا نشد' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      article: updatedArticle,
      message: 'مقاله با موفقیت ویرایش شد',
    })
  } catch (err) {
    console.error(err)

    // ✅ اگر خطا از نوع ValidationError بود، خطاهای دقیق را برگردون
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
      { success: false, message: 'خطا در ویرایش مقاله', error: err.message },
      { status: 500 }
    )
  }
}
