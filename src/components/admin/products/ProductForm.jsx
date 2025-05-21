'use client'

import ProductImagesUploader from '@/components/admin/products/ProductImagesUploader'
import ProductInfoForm from '@/components/admin/products/ProductInfoForm'
import { Loader1 } from '@/components/Loader'
import Button from '@/components/ui/Button'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

export default function ProductForm({ onSubmit, initialData = {} }) {
  const [imageFiles, setImageFiles] = useState(initialData.images || [])
  const [videoFile, setVideoFile] = useState(initialData.video || '')
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const didInit = useRef(false)
  const folder = 'products'

  const [form, setForm] = useState({
    name: '',
    brand: '',
    model: '',
    price: '',
    isAvailable: true,
    stock: 0,
    type: '',
    condition: '',
    colors: [],
    bodyColors: [],
    specs: [
      { key: '', value: '' },
      { key: '', value: '' },
      { key: '', value: '' },
    ],
    description: '',
    tags: [],
    category: '',
    views: 0,
    soldCount: 0,
    isBestSeller: false,
    ...initialData,
  })

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setCategories([]))
  }, [])

  useEffect(() => {
    if (initialData && !didInit.current) {
      setForm((prev) => ({
        ...prev,
        ...initialData,
        specs:
          initialData.specs && initialData.specs.length > 0
            ? initialData.specs
            : [
                { key: '', value: '' },
                { key: '', value: '' },
                { key: '', value: '' },
              ],
        category: initialData.category?._id || '',
      }))
      didInit.current = true
    }
  }, [initialData])

  // پایه‌ای‌ترین تغییرات فرم
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    console.log('handleChange:', name, value)
    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: checked }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  // آرایه‌ها مثل ویژگی‌ها که با کاما میایند
  const handleArrayChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean),
    }))
  }

  // به‌روزرسانی specs (آرایه‌ای از آبجکت‌ها کلید-مقدار)
  const handleFeatureChange = (index, keyOrValue, val) => {
    const updatedFeatures = [...(form.specs || [])] // اینجا اضافه شده
    if (!updatedFeatures[index]) updatedFeatures[index] = { key: '', value: '' }
    updatedFeatures[index][keyOrValue] = val
    setForm((prev) => ({ ...prev, specs: updatedFeatures }))
  }

  const handleAddFeature = () => {
    const hasInvalid = form.specs.some(
      (f) => !f || typeof f !== 'object' || !('key' in f) || !('value' in f)
    )

    if (hasInvalid) {
      toast.error(
        'یکی از ویژگی‌ها ناقص یا نامعتبر است. لطفاً ابتدا آنها را کامل کنید.'
      )
      return
    }

    setForm((prev) => ({
      ...prev,
      specs: [...prev.specs, { key: '', value: '' }],
    }))
  }

  const handleRemoveFeature = (index) => {
    setForm((prev) => {
      const updatedFeatures = [...(prev.specs || [])]
      updatedFeatures.splice(index, 1)
      return { ...prev, specs: updatedFeatures }
    })
  }

  // رنگ‌ها و bodyColors
  const handleColorChange = (colors) => {
    setForm((prev) => ({ ...prev, colors }))
  }
  const handleBodyColorsChange = (bodyColors) => {
    setForm((prev) => ({ ...prev, bodyColors }))
  }

  // تگ‌ها (مثلاً برای جستجو یا فیلتر)
  const handleTagsChange = (tags) => {
    const tagsArray = Array.isArray(tags)
      ? tags
      : tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)

    setForm((prev) => ({ ...prev, tags: tagsArray }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // آپلود تصاویر
      const uploadedImageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          if (typeof file === 'string' && file.startsWith('http')) return file
          const formData = new FormData()
          formData.append('file', file)
          formData.append('folder', folder)

          const res = await fetch('/api/storage/upload', {
            method: 'POST',
            body: formData,
          })

          const data = await res.json()
          if (!res.ok || !data.url) {
            throw new Error('آپلود تصویر با مشکل مواجه شد')
          }

          return data.url
        })
      )

      // آپلود ویدیو اگر فایل بود
      let videoUrl = ''
      if (videoFile instanceof File) {
        const formData = new FormData()
        formData.append('file', videoFile)
        formData.append('folder', folder)
        const res = await fetch('/api/storage/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        if (!res.ok || !data.url) {
          throw new Error('آپلود ویدیو با مشکل مواجه شد')
        }
        videoUrl = data.url
      }

      const updatedForm = {
        ...form,
        type: form.type && form.type.trim() !== '' ? form.type : 'سیار',
        images: uploadedImageUrls,
        video: videoUrl,
      }

      onSubmit(updatedForm)
    } catch (err) {
      console.error('❌ خطا در آپلود فایل:', err)
      toast.error('خطا در آپلود فایل')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-[calc(100%-50px)]">
      {isLoading && <Loader1 />}

      <ProductImagesUploader
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
        videoFile={videoFile}
        setVideoFile={setVideoFile}
        form={form}
        setForm={setForm}
      />

      <div className="flex-1 space-y-6 px-4 pt-2 overflow-auto">
        <ProductInfoForm
          form={form}
          setForm={setForm}
          categories={categories}
          handleChange={handleChange}
          handleArrayChange={handleArrayChange}
          handleColorChange={handleColorChange}
          handleBodyColorsChange={handleBodyColorsChange}
          handleFeatureChange={handleFeatureChange}
          handleAddFeature={handleAddFeature}
          handleRemoveFeature={handleRemoveFeature}
          handleTagsChange={handleTagsChange}
        />

        <Button
          type="submit"
          onClick={handleSubmit}
          variant="primary"
          fontWeight="medium"
          disabled={isLoading}
        >
          {isLoading
            ? initialData._id
              ? 'در حال ویرایش...'
              : 'در حال افزودن...'
            : initialData._id
            ? 'ویرایش محصول'
            : 'افزودن محصول'}
        </Button>
      </div>
    </form>
  )
}
