import connectDB from '@/lib/db'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    await connectDB()

    const users = await User.find({}, '_id name email role createdAt')
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { message: 'خطا در دریافت کاربران' },
      { status: 500 }
    )
  }
}
