'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'

export default function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'articles')

      const res = await fetch('/api/storage/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        onChange(data.url)
      } else {
        alert('آپلود موفق نبود!')
      }
    } catch (err) {
      console.error(err)
      alert('خطا در آپلود فایل')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden">
        {value ? (
          <Image
            src={value}
            alt="تصویر مقاله"
            fill
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <FiPlus className="text-gray-400 text-3xl" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      {uploading && (
        <p className="text-sm text-gray-500 mt-2">در حال آپلود...</p>
      )}
    </div>
  )
}
