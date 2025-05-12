import Button from '@/components/ui/Button'
import { CloudUpload } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Input from './ui/Input'

export default function CategoryForm({
  categoryData,
  setCategoryData,
  handleSubmit,
  isEditing,
}) {
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setCategoryData({
        ...categoryData,
        imagePreview: URL.createObjectURL(file),
      })
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    let imageUrl = categoryData.image

    if (imageFile) {
      setLoading(true)
      const formData = new FormData()
      formData.append('file', imageFile)

      try {
        const res = await fetch('/api/storage/upload', {
          method: 'POST',
          body: formData,
        })

        if (res.ok) {
          const data = await res.json()

          // دریافت URL امضا شده
          imageUrl = data.url // اینجا باید URL امضا شده را ذخیره کنیم
        } else {
          toast.error('خطا در آپلود تصویر')
          setLoading(false)
          return
        }
      } catch {
        toast.error('خطای ارتباط با سرور')
        setLoading(false)
        return
      }
    }

    setLoading(false)

    // ساختن نسخه نهایی categoryData و ارسال به سرور
    const finalCategory = {
      ...categoryData,
      image: imageUrl, // ذخیره URL امضا شده
    }

    await handleSubmit({ preventDefault: () => {} }, finalCategory)
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="flex gap-6">
        {/* آپلود تصویر */}
        <div className="flex items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-48 h-48 border-2 border-lightgray border-dashed rounded-lg cursor-pointer overflow-hidden"
          >
            {categoryData.imagePreview ? (
              <img
                src={categoryData.imagePreview}
                alt="پیش‌نمایش"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <CloudUpload className="w-8 h-8 mb-4 text-gray" />
                <p className="mb-2 text-sm text-gray">
                  <span className="font-semibold">
                    برای آپلود تصویر کلیک کنید
                  </span>
                </p>
              </div>
            )}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleImageChange}
              accept="image/png, image/jpeg, image/gif"
            />
          </label>
        </div>

        {/* فیلدها */}
        <section className="w-full grid grid-cols-2 gap-6">
          <Input
            id="title"
            label="عنوان"
            value={categoryData.title}
            onChange={(e) =>
              setCategoryData({ ...categoryData, title: e.target.value })
            }
            required
          />

          <Input
            id="slug"
            label="شناسه"
            value={categoryData.slug}
            onChange={(e) =>
              setCategoryData({ ...categoryData, slug: e.target.value })
            }
            required
          />

          <Input
            id="description"
            label="توضیحات (اختیاری)"
            value={categoryData.description}
            onChange={(e) =>
              setCategoryData({ ...categoryData, description: e.target.value })
            }
            className="h-full"
          />

          <Input
            id="parent"
            label="والد (اختیاری)"
            value={categoryData.parent || ''}
            onChange={(e) =>
              setCategoryData({ ...categoryData, parent: e.target.value })
            }
          />

          <div>
            <Button variant="secondary" disabled={loading}>
              {loading
                ? 'در حال آپلود تصویر...'
                : isEditing
                ? 'ویرایش دسته‌بندی'
                : 'افزودن دسته‌بندی'}
            </Button>
          </div>
        </section>
      </form>
    </div>
  )
}
