import { jwtVerify } from 'jose'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET)

export async function checkAuth(req, requiredRole = null) {
  const cookie = req.headers.get('cookie')

  if (!cookie) {
    console.log('❌ No cookie found')
    return { user: null, error: 'Unauthorized', status: 401 }
  }

  const token = cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1]

  if (!token) {
    console.log('❌ No token found in cookie')
    return { user: null, error: 'Unauthorized', status: 401 }
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)

    if (requiredRole && !payload.roles?.includes(requiredRole)) {
      console.log('❌ User does not have required role:', requiredRole)
      return { user: null, error: 'Forbidden', status: 403 }
    }

    return { user: payload, error: null }
  } catch (e) {
    console.log('❌ JWT Verification failed:', e.message)
    return { user: null, error: 'Invalid token', status: 401 }
  }
}
