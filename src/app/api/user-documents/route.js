import connectDB from '@/lib/db'
import UserDocuments from '@/models/UserDocuments'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req) {
  try {
    await connectDB()

    // گرفتن کوکی از هدر
    const cookie = req.headers.get('cookie') || ''
    const token = cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith('token='))
      ?.split('=')[1]

    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Unauthenticated: no token' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // decode JWT
    let userId
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      console.log('Decoded JWT:', decoded)

      userId = decoded.id || decoded._id || decoded.userId
      console.log('Extracted userId:', userId)
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Invalid token: userId not found' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const data = await req.json()

    // اعتبارسنجی ساده
    if (
      !data.shopName ||
      !data.phone ||
      !data.nationalCode ||
      !data.postalCode
    ) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // اعتبارسنجی اختیاری فیلد address
    const address = typeof data.address === 'string' ? data.address : ''

    const doc = await UserDocuments.findOneAndUpdate(
      { userId },
      {
        shopName: data.shopName,
        phone: data.phone,
        nationalCode: data.nationalCode,
        postalCode: data.postalCode,
        address,
        status: 'draft',
      },
      { new: true, upsert: true }
    )

    return new Response(JSON.stringify(doc), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in /api/user-documents:', error)
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function GET(req) {
  try {
    await connectDB()

    const cookie = req.headers.get('cookie') || ''
    const token = cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith('token='))
      ?.split('=')[1]

    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    let userId
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      userId = decoded.userId || decoded.id || decoded._id
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const doc = await UserDocuments.findOne({ userId })

    if (!doc) {
      return new Response(JSON.stringify({ error: 'No document found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(
      JSON.stringify({
        phone: doc.phone,
        nationalCode: doc.nationalCode,
        postalCode: doc.postalCode,
        shopName: doc.shopName,
        address: doc.address || '',
        birthCertificate: doc.birthCertificate || null,
        nationalCardFront: doc.nationalCardFront || null,
        nationalCardBack: doc.nationalCardBack || null,
        bankCard: doc.bankCard || null,
        license: doc.license,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
