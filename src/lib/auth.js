import User from '@/models/User'
import jwt from 'jsonwebtoken'

export async function getUserFromToken(req) {
  const cookie = req.headers.get('cookie')
  const token = cookie
    ?.split(';')
    .find((c) => c.trim().startsWith('token='))
    ?.split('=')[1]

  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId).lean()
    return user
  } catch (err) {
    console.error('JWT error:', err)
    return null
  }
}
