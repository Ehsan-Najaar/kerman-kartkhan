import connectDB from '@/lib/db'
import UserDocuments from '@/models/UserDocuments'

export async function PATCH(req, { params }) {
  await connectDB()
  const { id } = params

  const formData = await req.formData()

  // میخوای فایل‌ها رو جداگانه به S3 آپلود کنی
  // اینجا باید fetch بزنی به API آپلود (یا مستقیم توی کلاینت انجام بدی)

  const uploadedUrls = {}

  for (const [name, file] of formData.entries()) {
    if (typeof file === 'object' && file.size > 0) {
      if (file.size > 2 * 1024 * 1024) {
        return new Response(
          JSON.stringify({ message: 'حجم فایل نباید بیشتر از ۲ مگابایت باشد' }),
          { status: 400 }
        )
      }

      // فرض کن که اینجا fetch میکنی به /api/storage/upload با فایل
      // و url می‌گیری به صورت زیر:
      // const res = await fetch('http://localhost:3000/api/storage/upload', { ... })
      // const data = await res.json()
      // uploadedUrls[name] = data.url

      // چون backend مستقیم دسترسی به formData نداره به سادگی
      // معمولا این مرحله آپلود فایل بهتره تو کلاینت انجام بشه
    }
  }

  // سپس آپدیت رکورد با لینک‌های فایل آپلود شده
  const updatedDoc = await UserDocuments.findByIdAndUpdate(
    id,
    {
      ...uploadedUrls,
      status: 'completed',
    },
    { new: true }
  )

  return Response.json(updatedDoc)
}

export async function GET(req, { params }) {
  await connectDB()
  const { id } = params

  const doc = await UserDocuments.findById(id)

  if (!doc) {
    return new Response(JSON.stringify({ message: 'مدرک پیدا نشد' }), {
      status: 404,
    })
  }

  return Response.json(doc)
}
