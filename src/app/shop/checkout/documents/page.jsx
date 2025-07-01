'use client'

import { Loader3 } from '@/components/Loader'
import Button from '@/components/ui/Button'
import StepProgressBar from '@/components/ui/StepProgressBar'
import { Eye, HomeIcon, Info, UploadCloud, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FiTrash2 } from 'react-icons/fi'

export default function DocumentsPage() {
  const router = useRouter()

  const [files, setFiles] = useState({
    birthCertificate: null,
    nationalCardFront: null,
    nationalCardBack: null,
    bankCard: null,
    license: null,
  })

  const [previewImage, setPreviewImage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/user-documents', {
          method: 'GET',
          credentials: 'include',
        })

        if (!res.ok) {
          console.log('هیچ داده‌ای پیدا نشد.')
          setLoading(false)
          return
        }

        const data = await res.json()

        setFiles({
          birthCertificate: data.birthCertificate || null,
          nationalCardFront: data.nationalCardFront || null,
          nationalCardBack: data.nationalCardBack || null,
          bankCard: data.bankCard || null,
          license: data.license,
        })
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e) => {
    const { name, files: selectedFiles } = e.target
    const file = selectedFiles[0]

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('حجم فایل نباید بیشتر از ۲ مگابایت باشد.')
        return
      }

      setFiles({
        ...files,
        [name]: file,
      })
    }
  }

  const removeFile = async (name) => {
    const file = files[name]

    if (file && typeof file !== 'string') {
      setFiles({
        ...files,
        [name]: null,
      })
      toast.success('فایل حذف شد')
      return
    }

    if (typeof file === 'string') {
      try {
        const urlWithoutQuery = file.split('?')[0]
        const key = urlWithoutQuery.replace(
          'https://kerman-kartkhan-2.storage.c2.liara.space/',
          ''
        )

        const res = await fetch('/api/storage/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key }),
        })

        if (!res.ok) {
          const data = await res.json()
          toast.error(data.message || 'خطا در حذف فایل از سرور')
          return
        }

        toast.success('فایل با موفقیت حذف شد')

        // همه مقادیر فایل‌ها رو بفرست
        const allFields = {
          ...files,
          [name]: '',
        }

        // اگر فایلی object هست (File)، نمی‌تونیم بفرستیم → فقط string یا خالی نگه داریم
        for (const key in allFields) {
          if (typeof allFields[key] !== 'string') {
            allFields[key] = ''
          }
        }

        const updateRes = await fetch('/api/user-documents/update-documents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(allFields),
        })

        if (!updateRes.ok) {
          const data = await updateRes.json()
          toast.error(data.message || 'خطا در آپدیت دیتابیس')
          return
        }

        toast.success('اطلاعات شما بروز شد')

        setFiles({
          ...files,
          [name]: null,
        })
      } catch (error) {
        console.error(error)
        toast.error('خطا در حذف فایل')
      }
    }
  }

  const uploadFile = async (file, folder) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    const res = await fetch('/api/storage/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error || 'آپلود فایل ناموفق بود.')
    }

    const data = await res.json()
    return data.url
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const urls = {}

      // گرفتن nationalCode
      const userRes = await fetch('/api/user-documents', {
        method: 'GET',
        credentials: 'include',
      })

      if (!userRes.ok) {
        toast.error('خطا در دریافت اطلاعات کاربر')
        return
      }

      const userData = await userRes.json()
      const nationalCode = userData.nationalCode

      if (!nationalCode) {
        toast.error('کد ملی یافت نشد')
        return
      }

      for (const key of Object.keys(files)) {
        const file = files[key]

        if (file && typeof file !== 'string') {
          toast.loading(`در حال آپلود ${file.name}...`, { id: key })

          const folderPath = `customers-documents/${nationalCode}`
          const url = await uploadFile(file, folderPath)

          toast.success(`${file.name} با موفقیت آپلود شد`, { id: key })
          urls[key] = url
        } else if (typeof file === 'string') {
          urls[key] = file
        }
      }

      // ذخیره آدرس‌ها در دیتابیس
      const res = await fetch('/api/user-documents/update-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(urls),
      })

      if (!res.ok) {
        const err = await res.json()
        toast.error(err.error || 'خطا در ذخیره فایل‌ها در دیتابیس')
        return
      }

      toast.success('مدارک ذخیره شد')
      router.push('/shop/checkout/review')
    } catch (error) {
      console.error(error)
      toast.error(error.message || 'خطای ناشناخته هنگام آپلود')
    }
  }

  const isFormValid =
    files.birthCertificate &&
    files.nationalCardFront &&
    files.nationalCardBack &&
    files.bankCard

  const renderFileUploadBox = (name, label) => {
    const file = files[name]

    return (
      <div className="relative w-42 h-42 border-2 border-dashed border-lightgray rounded-lg overflow-hidden flex items-center justify-center group">
        {file ? (
          <>
            <Image
              src={typeof file === 'string' ? file : URL.createObjectURL(file)}
              alt={label}
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex gap-2 items-center justify-center">
              <button
                type="button"
                onClick={() =>
                  setPreviewImage(
                    typeof file === 'string' ? file : URL.createObjectURL(file)
                  )
                }
                className="bg-white p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
              >
                <Eye size={20} className="text-gray-800" />
              </button>
              <button
                type="button"
                onClick={() => removeFile(name)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 cursor-pointer"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
            <p className="absolute bottom-0 left-0 right-0 p-1 bg-bg text-center text-dark text-xs truncate">
              {typeof file === 'string' ? `${label}` : file.name}
            </p>
          </>
        ) : (
          <>
            <label
              htmlFor={name}
              className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
            >
              <UploadCloud size={32} className="text-gray-400" />
              <span className="text-sm text-center text-gray-600 mt-2">
                {label} را آپلود کنید
              </span>
              <input
                id={name}
                name={name}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </>
        )}
      </div>
    )
  }

  if (loading) {
    return <Loader3 />
  }

  return (
    <div className="min-h-screen min-w-screen grid place-items-center">
      <Toaster />

      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={previewImage}
              alt="تصویر"
              width={600}
              height={600}
              className="max-h-[80vh] object-contain rounded"
            />
            <button
              className="absolute top-2 left-2 bg-light text-dark rounded-lg p-2 hover:bg-lightgray cursor-pointer"
              onClick={() => setPreviewImage(null)}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="md:w-[65%] md:h-[76%] bg-light border border-lightgray/35 rounded-2xl p-6 shadow space-y-6 mx-auto"
      >
        <StepProgressBar
          currentStep={2}
          steps={[
            { id: 1, label: 'اطلاعات هویتی' },
            { id: 2, label: 'آپلود مدارک' },
            { id: 3, label: 'خلاصه و تایید' },
          ]}
          activeColor="bg-secondary"
          pendingColor="bg-gray-300"
          height="h-1"
          className="mb-8"
        />

        <div className="flex items-center gap-2 bg-gray-100 text-gray border border-gray p-3 rounded-lg text-sm">
          <Info size={18} />
          <p className="text-xs text-justify">
            اگر کارت ملی هوشمند ندارید، تصویر رسید کارت ملی خود را در هر دو بخش
            بارگذاری کنید.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {renderFileUploadBox('birthCertificate', 'تصویر شناسنامه')}
          {renderFileUploadBox('nationalCardFront', 'کارت ملی (رو)')}
          {renderFileUploadBox('nationalCardBack', 'کارت ملی (پشت)')}
          {renderFileUploadBox('bankCard', 'کارت بانکی')}
          {renderFileUploadBox('license', 'جواز (اختیاری)')}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-lightgray pt-4 mt-48">
          <Link href={'/shop'}>
            <HomeIcon className="text-gray cursor-pointer" />
          </Link>
          <section className="space-x-4">
            <Button
              variant="ghost"
              outline
              type="button"
              onClick={() => router.back()}
            >
              برگشت
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!isFormValid}
              className={!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}
            >
              مرحله بعد
            </Button>
          </section>
        </div>
      </form>
    </div>
  )
}
