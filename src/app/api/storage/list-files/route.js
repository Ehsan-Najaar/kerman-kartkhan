// src/app/api/storage/list-files/route.js or /app/api/storage/list-files/route.js
import { s3 } from '@/lib/s3'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'

export async function GET() {
  const command = new ListObjectsV2Command({
    Bucket: process.env.LIARA_BUCKET_NAME,
  })

  const data = await s3.send(command)
  return Response.json({ files: data.Contents })
}
