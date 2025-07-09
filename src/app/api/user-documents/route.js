// api/user-documents/route.js

import { checkAuth } from '@/lib/auth'
import connectDB from '@/lib/db'
import User from '@/models/User'
import UserDocuments from '@/models/UserDocuments'
import { NextResponse } from 'next/server'

export async function POST(req) {
  await connectDB()

  const { user, error, status } = await checkAuth(req)
  if (error) {
    return NextResponse.json({ error }, { status })
  }

  const data = await req.json()

  if (
    !data.userName ||
    !data.shopName ||
    !data.phone ||
    !data.nationalCode ||
    !data.postalCode
  ) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  const address = typeof data.address === 'string' ? data.address : ''

  const doc = await UserDocuments.findOneAndUpdate(
    { userId: user.userId || user._id },
    {
      userName: data.userName,
      shopName: data.shopName,
      phone: data.phone,
      nationalCode: data.nationalCode,
      postalCode: data.postalCode,
      address,
      status: 'draft',
    },
    { new: true, upsert: true }
  )

  // آپدیت فیلد userName در مدل User
  const updatedUser = await User.findByIdAndUpdate(
    user.userId || user._id,
    { name: data.userName }, // <-- اینجا
    { new: true }
  )

  return NextResponse.json(doc)
}
export async function GET(req) {
  await connectDB()

  const { user, error, status } = await checkAuth(req)
  if (error) {
    return NextResponse.json({ error }, { status })
  }

  const doc = await UserDocuments.findOne({ userId: user.userId || user.id })

  if (!doc) {
    // ✅ برگردون وضعیت نرمال، نه خطا
    return NextResponse.json({ exists: false, document: null }, { status: 200 })
  }

  return NextResponse.json({
    exists: true,
    document: {
      phone: doc.phone,
      nationalCode: doc.nationalCode,
      postalCode: doc.postalCode,
      userName: doc.userName,
      shopName: doc.shopName,
      address: doc.address || '',
      birthCertificate: doc.birthCertificate || null,
      nationalCardFront: doc.nationalCardFront || null,
      nationalCardBack: doc.nationalCardBack || null,
      bankCard: doc.bankCard || null,
      license: doc.license,
    },
  })
}
