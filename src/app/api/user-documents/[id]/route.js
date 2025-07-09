// api/user-documents/[id]/route.js

import { checkAuth } from '@/lib/auth'
import connectDB from '@/lib/db'
import UserDocuments from '@/models/UserDocuments'
import { NextResponse } from 'next/server'

export async function PATCH(req, { params }) {
  await connectDB()

  const { user, error, status } = await checkAuth(req)
  if (error) {
    return NextResponse.json({ error }, { status })
  }

  const { id } = params

  // مطمئن شو کاربر لاگین کرده همونه
  if (user.userId !== id && user.id !== id) {
    return NextResponse.json(
      { error: 'Forbidden - This document does not belong to you.' },
      { status: 403 }
    )
  }

  const formData = await req.formData()

  const uploadedUrls = {}

  for (const [name, file] of formData.entries()) {
    if (typeof file === 'object' && file.size > 0) {
      if (file.size > 2 * 1024 * 1024) {
        return NextResponse.json(
          { message: 'حجم فایل نباید بیشتر از ۲ مگابایت باشد' },
          { status: 400 }
        )
      }

      // اینجا آپلود فایل به فضای ابری را انجام بده و URL را ذخیره کن
      uploadedUrls[name] = 'uploaded_url_placeholder'
    }
  }

  const updatedDoc = await UserDocuments.findByIdAndUpdate(
    id,
    {
      ...uploadedUrls,
      status: 'completed',
    },
    { new: true }
  )

  return NextResponse.json(updatedDoc)
}

export async function GET(req, { params }) {
  await connectDB()

  const { user, error, status } = await checkAuth(req)
  if (error) {
    return NextResponse.json({ error }, { status })
  }

  const { id } = params

  if (user.userId !== id && user.id !== id) {
    return NextResponse.json(
      { error: 'Forbidden - This document does not belong to you.' },
      { status: 403 }
    )
  }

  const doc = await UserDocuments.findById(id)

  if (!doc) {
    return NextResponse.json({ message: 'مدرک پیدا نشد' }, { status: 404 })
  }

  return NextResponse.json(doc)
}
