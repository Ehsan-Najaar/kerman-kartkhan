// src/app/api/user-documents/update-documents/route.js

import { checkAuth } from '@/lib/auth'
import connectDB from '@/lib/db'
import UserDocuments from '@/models/UserDocuments'
import { NextResponse } from 'next/server'

export async function POST(req) {
  await connectDB()

  // احراز هویت کاربر
  const { user, error, status } = await checkAuth(req)
  if (error) {
    return NextResponse.json({ error }, { status })
  }

  const userId = user.userId || user.id

  const urls = await req.json()

  // پیدا کردن سند کاربر برای خواندن nationalCode
  const userDoc = await UserDocuments.findOne({ userId })

  if (!userDoc) {
    return NextResponse.json(
      { error: 'User document not found' },
      { status: 404 }
    )
  }

  const nationalCode = userDoc.nationalCode

  // بروزرسانی سند با لینک‌های مدارک
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
    return NextResponse.json({ error: 'هیچ سندی پیدا نشد' }, { status: 404 })
  }

  return NextResponse.json({
    message: 'مدارک با موفقیت ذخیره شد',
    nationalCode,
  })
}
