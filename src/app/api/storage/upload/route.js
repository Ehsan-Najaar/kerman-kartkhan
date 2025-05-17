import { s3 } from '@/lib/s3'
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      return new Response('No file uploaded', { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const fileName = `categories/${file.name}`
    const bucketName = process.env.LIARA_BUCKET_NAME
    const bucketDomain = process.env.LIARA_BUCKET_DOMAIN

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    })

    // آپلود فایل
    await s3.send(command)

    // گرفتن URL امضا شده
    const signedUrlCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileName,
    })

    // تولید URL امضا شده
    const signedUrl = await getSignedUrl(s3, signedUrlCommand, {
      expiresIn: 60 * 60, // مدت زمان انقضا URL (یک ساعت)
    })

    // ساخت URL نهایی برای ارسال به دیتابیس
    const fileUrl = `https://${bucketDomain}/${fileName}`

    return new Response(
      JSON.stringify({
        message: 'File uploaded successfully',
        url: fileUrl, // ارسال URL به عنوان پاسخ
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('File upload failed:', error)
    return new Response('Error uploading file', { status: 500 })
  }
}
