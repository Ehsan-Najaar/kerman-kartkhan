import connectDB from '@/lib/db'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    return NextResponse.json(null, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    await connectDB()

    const user = await User.findById(decoded.userId).lean()

    if (!user) {
      return NextResponse.json(null, { status: 404 })
    }

    const { password, ...rest } = user

    return NextResponse.json(rest)
  } catch (error) {
    console.error(error)
    return NextResponse.json(null, { status: 401 })
  }
}
