'use client'

import AdminPanelNavbar from '@/components/AdminPanelNavbar'
import ProductList from '@/components/admin/products/ProductList'
import ProductsManagementHeader from '@/components/admin/products/ProductsManagementHeader'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function ProductsManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = () => {
    setLoading(true)
    fetch('/api/admin/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('خطا در دریافت محصولات:', err)
        toast.error('خطا در دریافت محصولات')
        setLoading(false)
      })
  }

  const fetchCategories = () => {
    fetch('/api/admin/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {
        toast.error('خطا در دریافت دسته‌بندی‌ها')
      })
  }

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('خطا در حذف محصول')
      setProducts((prev) => prev.filter((p) => p._id !== id))
      toast.success('محصول با موفقیت حذف شد')
    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  return (
    <div className="min-h-screen flex p-6 gap-12">
      <AdminPanelNavbar />

      <div className="w-full lg:w-4/5 lg:h-[750px] bg-light px-2 lg:p-4 rounded-2xl shadow-lg space-y-4 overflow-hidden">
        <ProductsManagementHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <ProductList
          products={products}
          loading={loading}
          searchTerm={searchTerm}
          onDelete={deleteProduct}
          categories={categories}
        />
      </div>
    </div>
  )
}
