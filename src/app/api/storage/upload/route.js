// api/storage/upload/route.js
import { s3 } from '@/lib/s3'
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')
    const folder = formData.get('folder') || 'general'

    if (!file || typeof file.name !== 'string') {
      return new Response(
        JSON.stringify({ error: 'فایلی ارسال نشده یا نامعتبره' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const safeFolder = folder.replace(/[^a-zA-Z0-9-_]/g, '')
    const fileName = `${safeFolder}/${Date.now()}-${file.name}`
    const bucketName = process.env.LIARA_BUCKET_NAME
    const bucketDomain = process.env.LIARA_BUCKET_DOMAIN

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: file.type || 'application/octet-stream',
    })

    await s3.send(command)

    const signedUrlCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileName,
    })

    await getSignedUrl(s3, signedUrlCommand, { expiresIn: 60 * 60 }) // فقط برای تست؛ می‌تونی حذفش کنی

    const fileUrl = `https://${bucketDomain}/${fileName}`

    return new Response(
      JSON.stringify({
        message: 'فایل با موفقیت آپلود شد',
        url: fileUrl,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('❌ File upload failed:', error, error.stack)
    return new Response(
      JSON.stringify({ error: 'مشکل در آپلود فایل. جزئیات در لاگ سرور.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
