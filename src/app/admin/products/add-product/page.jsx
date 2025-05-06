'use client'

import { useState } from 'react'

const AddPosForm = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('بیسیم')
  const [condition, setCondition] = useState('آکبند')
  const [colors, setColors] = useState([''])
  const [images, setImages] = useState([])
  const [video, setVideo] = useState('')
  const [mainFeatures, setMainFeatures] = useState([''])
  const [otherFeatures, setOtherFeatures] = useState([''])
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const productData = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/admin/products/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Product added:', data)
        // اقدامات بعدی مانند نمایش پیغام موفقیت
      } else {
        const errorData = await response.json()
        console.log('Error:', errorData.message)
        // نمایش پیغام خطا
      }
    } catch (error) {
      console.log('Error submitting form:', error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        افزودن محصول کارت‌خوان
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            نام محصول
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            قیمت
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            نوع محصول
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="بیسیم">بیسیم</option>
            <option value="سیار">سیار</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="condition"
            className="block text-sm font-medium text-gray-700"
          >
            وضعیت
          </label>
          <select
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="آکبند">آکبند</option>
            <option value="استوک">استوک</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="colors"
            className="block text-sm font-medium text-gray-700"
          >
            رنگ‌ها
          </label>
          <input
            type="text"
            id="colors"
            value={colors[0]}
            onChange={(e) => setColors([e.target.value])}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            تصاویر
          </label>
          <input
            type="file"
            id="images"
            accept="image/*"
            onChange={(e) => setImages([...e.target.files])}
            multiple
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="video"
            className="block text-sm font-medium text-gray-700"
          >
            ویدیو
          </label>
          <input
            type="text"
            id="video"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="mainFeatures"
            className="block text-sm font-medium text-gray-700"
          >
            ویژگی‌های اصلی
          </label>
          <input
            type="text"
            id="mainFeatures"
            value={mainFeatures[0]}
            onChange={(e) => setMainFeatures([e.target.value])}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="otherFeatures"
            className="block text-sm font-medium text-gray-700"
          >
            ویژگی‌های دیگر
          </label>
          <input
            type="text"
            id="otherFeatures"
            value={otherFeatures[0]}
            onChange={(e) => setOtherFeatures([e.target.value])}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            توضیحات
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {loading ? 'در حال ارسال...' : 'افزودن محصول'}
        </button>
      </form>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
    </div>
  )
}

export default AddPosForm
