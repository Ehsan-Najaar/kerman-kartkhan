import connectDB from '@/lib/db'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'

export async function POST(req) {
  await connectDB()

  try {
    const {
      name,
      price,
      type,
      condition,
      colors,
      images,
      video,
      mainFeatures,
      otherFeatures,
      description,
    } = await req.json()

    if (
      !name ||
      !price ||
      !type ||
      !condition ||
      !colors ||
      !images ||
      !mainFeatures
      // category حذف شود
    ) {
      return NextResponse.json(
        { message: 'اطلاعات ارسالی ناقص است' },
        { status: 400 }
      )
    }

    const newProduct = await Product.create({
      name,
      price,
      type,
      condition,
      colors,
      images,
      video,
      mainFeatures,
      otherFeatures,
      description,
      ...(category && { category }), // فقط اگر مقدار معتبر بود
    })

    return NextResponse.json(
      {
        message: 'محصول با موفقیت اضافه شد',
        product: newProduct,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('خطا در افزودن محصول:', error)
    return NextResponse.json(
      { message: 'خطای سرور. لطفاً مجدداً تلاش کنید.' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return NextResponse.json(null, { status: 200 })
}
