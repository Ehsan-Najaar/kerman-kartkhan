import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export function middleware(req) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET)
    return NextResponse.next()
  } catch (err) {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }
}

// تعریف مسیرهایی که نیاز به auth دارن
export const config = {
  matcher: ['/api/protected/:path*'],
}
