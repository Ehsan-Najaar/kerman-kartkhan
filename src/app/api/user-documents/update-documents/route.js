import connectDB from '@/lib/db'
import UserDocuments from '@/models/UserDocuments'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req) {
  try {
    await connectDB()

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

    let userId
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      userId = decoded.id || decoded._id || decoded.userId
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const urls = await req.json()

    // خواندن nationalCode از سند کاربر
    const userDoc = await UserDocuments.findOne({ userId })

    if (!userDoc) {
      return new Response(
        JSON.stringify({ error: 'User document not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const nationalCode = userDoc.nationalCode

    const updatedDoc = await UserDocuments.findOneAndUpdate(
      { userId },
      {
        $set: {
          birthCertificate: urls.birthCertificate || '',
          nationalCardFront: urls.nationalCardFront || '',
          nationalCardBack: urls.nationalCardBack || '',
          bankCard: urls.bankCard || '',
          license: urls.license || '',
          status: 'completed',
        },
      },
      { new: true, upsert: true }
    )

    if (!updatedDoc) {
      return new Response(JSON.stringify({ error: 'هیچ سندی پیدا نشد' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(
      JSON.stringify({
        message: 'مدارک با موفقیت ذخیره شد',
        nationalCode,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error updating documents:', error)
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
