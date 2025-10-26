'use client'

import AdminPanelNavbar from '@/components/AdminPanelNavbar'
import CategoryForm from '@/components/CategoryForm'
import CategoryList from '@/components/CategoryList'
import { Loader2 } from '@/components/Loader'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
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
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories')
        setCategories(response.data)
        setLoading(false)
      } catch (err) {
        setError('خطا در دریافت دسته‌بندی‌ها')
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleSubmit = async (customData) => {
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
      console.error(err) // برای دیباگ
      setError('خطا در ذخیره دسته‌بندی')
    }
  }

  const handleEdit = (category) => {
    setCategoryData({
      ...category,
      imagePreview: category.image || '',
    })
    setIsEditing(true)
  }

  const confirmDelete = (id) => {
    setSelectedCategoryId(id)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedCategoryId) return

    try {
      await axios.delete(`/api/admin/categories/${selectedCategoryId}`)
      const res = await axios.get('/api/categories')
      setCategories(res.data)
      setShowConfirm(false)
      setSelectedCategoryId(null)
    } catch (err) {
      setError('خطا در حذف دسته‌بندی')
      setShowConfirm(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <AdminPanelNavbar />

      <div className="w-full lg:w-4/5 bg-light p-4 overflow-hidden relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <Loader2 />
          </div>
        ) : (
          <div className="space-y-20">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <section className="space-y-4">
              <h3 className="hidden lg:block h3 pb-4 border-b border-lightgray">
                افزودن و ویرایش دسته‌بندی‌ها
              </h3>
              <CategoryForm
                categoryData={categoryData}
                setCategoryData={setCategoryData}
                handleSubmit={handleSubmit}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            </section>

            <section>
              <h3 className="h3 pb-4 border-b border-lightgray">
                لیست دسته‌بندی‌ها
              </h3>
              <CategoryList
                categories={categories}
                handleEdit={handleEdit}
                handleDelete={confirmDelete}
              />
            </section>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        title="حذف دسته‌بندی"
        message="آیا از حذف این دسته‌بندی مطمئن هستید؟ این عملیات قابل بازگشت نیست."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowConfirm(false)
          setSelectedCategoryId(null)
        }}
      />
    </div>
  )
}
