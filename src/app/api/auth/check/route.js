// src/app/api/auth/check/route.js

import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET)

export async function GET(req) {
  try {
    const cookie = req.headers.get('cookie') || ''
    const token = cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1]

    if (!token) {
      return NextResponse.json({ loggedIn: false })
    }

    const { payload } = await jwtVerify(token, SECRET_KEY)

    return NextResponse.json({
      loggedIn: true,
      roles: payload.roles || [],
    })
  } catch (err) {
    console.error('Auth check error:', err)
    return NextResponse.json({ loggedIn: false })
  }
}
