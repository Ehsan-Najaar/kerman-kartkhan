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

  if (loading)
    return (
      <div className="h-[calc(100%-200px)]">
        <Loader2 />
      </div>
    )

  if (!filteredProducts.length)
    return (
      <div className="h-[calc(100%-220px)] grid place-items-center text-gray">
        هیچ محصولی مطابق جستجو یا فیلتر پیدا نشد.
      </div>
    )

  return (
    <div className="space-y-4 p-4 overflow-auto lg:h-[500px]">
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
