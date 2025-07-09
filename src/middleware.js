import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(req) {
  const url = req.nextUrl.clone()
  const pathname = url.pathname

  try {
    const cookie = req.headers.get('cookie')
    if (!cookie) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    const token = cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1]

    if (!token) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    const { payload } = await jwtVerify(token, SECRET_KEY)

    // اگر مسیر admin باشه → باید نقش admin داشته باشه
    if (pathname.startsWith('/admin')) {
      if (!payload.roles || !payload.roles.includes('admin')) {
        url.pathname = '/login'
        return NextResponse.redirect(url)
      }
    }

    // اگر مسیر dashboard باشه → فقط لاگین کافیست (نیازی به admin بودن نیست)
    if (pathname.startsWith('/dashboard')) {
      // همین که توکن معتبره، کافیه → نیازی به چک بیشتر نیست
    }

    return NextResponse.next()
  } catch (err) {
    console.error('Middleware error:', err)
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ['/admin/:path*', '/shop/dashboard/:path*', '/shop/checkout/:path*'],
}
