// src/app/api/storage/upload/route.js
import { s3 } from '@/lib/s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      return new Response('No file uploaded', { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const command = new PutObjectCommand({
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: file.name,
      Body: buffer,
      ContentType: file.type,
    })

    await s3.send(command)

    return new Response(
      JSON.stringify({ message: 'File uploaded successfully' }),
      { status: 200 }
    )
  } catch (error) {
    console.error('File upload failed:', error)
    return new Response('Error uploading file', { status: 500 })
  }
}
