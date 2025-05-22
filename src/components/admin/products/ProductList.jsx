'use client'

import { Loader2 } from '@/components/Loader'
import ProductCard2 from '@/components/ProductCard'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { useState } from 'react'

export default function ProductList({
  products,
  loading,
  searchTerm,
  onDelete,
  categories,
}) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [toDeleteId, setToDeleteId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const openConfirm = (id) => {
    setToDeleteId(id)
    setConfirmOpen(true)
  }

  const closeConfirm = () => {
    setConfirmOpen(false)
    setToDeleteId(null)
  }

  const handleDelete = async () => {
    if (!toDeleteId) return
    setDeletingId(toDeleteId)
    await onDelete(toDeleteId)
    closeConfirm()
    setDeletingId(null)
  }

  const filteredProducts = searchTerm
    ? products.filter((p) =>
        p.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
      )
    : products

  // تبدیل دسته‌بندی‌ها به مپ برای دسترسی سریع عنوان بر اساس آیدی
  const categoriesMap = Object.fromEntries(
    (categories || []).map((cat) => [cat._id, cat.title])
  )

  if (loading) return <Loader2 />

  if (!filteredProducts.length)
    return <p className="text-center text-gray-500">محصولی یافت نشد.</p>

  return (
    <div className="space-y-4 p-4 overflow-auto h-[470px]">
      {filteredProducts.map((product) => (
        <ProductCard2
          key={product._id}
          product={product}
          onDelete={() => openConfirm(product._id)}
          deleting={deletingId === product._id}
          categoriesMap={categoriesMap}
        />
      ))}

      <ConfirmDialog
        isOpen={confirmOpen}
        title="حذف محصول"
        message="آیا از حذف این محصول مطمئن هستید؟ این عملیات غیرقابل بازگشت است."
        onConfirm={handleDelete}
        onCancel={closeConfirm}
      />
    </div>
  )
}
