// /app/api/me/route.js
import { getUserFromToken } from '@/lib/auth'
import connectDB from '@/lib/db'
// ایمپورت کردن اسکیما کاربر
import User from '@/models/User'

export async function GET(req) {
  await connectDB()

  const user = await getUserFromToken(req)

  if (!user) {
    return new Response(JSON.stringify({ error: 'توکن نامعتبر یا منقضی' }), {
      status: 401,
    })
  }

  return new Response(JSON.stringify({ user }), { status: 200 })
}
