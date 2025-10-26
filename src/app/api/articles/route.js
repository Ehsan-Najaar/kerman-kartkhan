import connectDB from '@/lib/db'
import Article from '@/models/Article'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    await connectDB()

    const articles = await Article.find()

    return NextResponse.json(articles, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'خطا در دریافت مقالات' }, { status: 500 })
  }
}
