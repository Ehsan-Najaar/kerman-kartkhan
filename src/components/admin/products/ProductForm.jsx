'use client'

import ProductImagesUploader from '@/components/admin/products/ProductImagesUploader'
import ProductInfoForm from '@/components/admin/products/ProductInfoForm'
import Button from '@/components/ui/Button'
import { useEffect, useState } from 'react'

export default function ProductForm({ onSubmit, initialData = {} }) {
  const [imageFiles, setImageFiles] = useState([])
  const [videoFile, setVideoFile] = useState(null)
  const [categories, setCategories] = useState([])

  const [form, setForm] = useState({
    name: '',
    price: '',
    type: '',
    condition: '',
    colors: [],
    images: [],
    video: '',
    mainFeatures: [],
    otherFeatures: [],
    description: '',
    category: '',
    ...initialData,
  })

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setCategories([]))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean),
    }))
  }

  const handleColorChange = (colors) => {
    setForm((prev) => ({ ...prev, colors }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedForm = {
      ...form,
      images: imageFiles,
      video: videoFile,
    }
    onSubmit(updatedForm)
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-[calc(100%-50px)] gap-6">
      <ProductImagesUploader
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
        videoFile={videoFile}
        setVideoFile={setVideoFile}
        form={form}
        setForm={setForm}
      />

      <div className="flex-1 space-y-6">
        <ProductInfoForm
          form={form}
          categories={categories}
          handleChange={handleChange}
          handleArrayChange={handleArrayChange}
          handleColorChange={handleColorChange}
        />

        <Button variant="secondary" fontWeight="medium" className="mr-4">
          افزودن محصول
        </Button>
      </div>
    </form>
  )
}
