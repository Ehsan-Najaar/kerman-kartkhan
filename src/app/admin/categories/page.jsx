'use client'

import AdminPanelNavbar from '@/components/AdminPanelNavbar'
import CategoryForm from '@/components/CategoryForm'
import CategoryList from '@/components/CategoryList'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function CategoryManagement() {
  const [categoryData, setCategoryData] = useState({
    title: '',
    slug: '',
    description: '',
    image: '',
    parent: '',
  })
  const [categories, setCategories] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories')
        setCategories(response.data)
        setLoading(false)
      } catch (err) {
        setError('Error fetching categories')
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleSubmit = async (e, customData = categoryData) => {
    e.preventDefault()

    try {
      if (isEditing && customData._id) {
        await axios.put(`/api/admin/categories/${customData._id}`, customData)
      } else {
        await axios.post('/api/admin/categories', customData)
      }

      setCategoryData({
        title: '',
        slug: '',
        description: '',
        image: '',
        parent: '',
      })
      setIsEditing(false)
      setError(null)

      const res = await axios.get('/api/categories')
      setCategories(res.data)
    } catch (err) {
      setError('خطا در ذخیره دسته‌بندی')
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/categories/${id}`)
      const res = await axios.get('/api/categories')
      setCategories(res.data)
    } catch (err) {
      setError('خطا در حذف دسته‌بندی')
    }
  }

  const handleEdit = (category) => {
    setCategoryData(category)
    setIsEditing(true)
  }

  if (loading) return <p className="text-center mt-5">در حال بارگذاری...</p>
  if (error) return <p className="text-red-500 text-center">{error}</p>

  return (
    <div className="min-h-screen flex p-6 gap-12">
      <AdminPanelNavbar />

      <div className="w-full lg:w-4/5 lg:h-[750px] px-2 lg:p-4  rounded-2xl shadow-lg space-y-20 overflow-hidden">
        <section className="space-y-4">
          <h3 className="h3">افزودن و ویرایش دسته‌بندی‌ها</h3>
          <CategoryForm
            categoryData={categoryData}
            setCategoryData={setCategoryData}
            handleSubmit={handleSubmit}
            isEditing={isEditing}
          />
        </section>

        <section className="space-y-4">
          <h3 className="h3">لیست دسته بندی ها</h3>
          <CategoryList
            categories={categories}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </section>
      </div>
    </div>
  )
}
