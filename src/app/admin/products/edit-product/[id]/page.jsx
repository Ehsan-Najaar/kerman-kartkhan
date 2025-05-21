// admin/products/edit-product/[id]/page.jsx
'use client'

import ProductForm from '@/components/admin/products/ProductForm'
import AdminPanelNavbar from '@/components/AdminPanelNavbar'
import { Loader2 } from '@/components/Loader'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FiArrowRight } from 'react-icons/fi'

export default function EditProductPage() {
  const { id } = useParams()
  const router = useRouter()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        toast.error('خطا در دریافت اطلاعات محصول')
        setLoading(false)
      })
  }, [id])

  const handleUpdate = async (updatedProduct) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      })
      if (!res.ok) throw new Error('خطا در بروزرسانی محصول')
      toast.success('محصول با موفقیت بروزرسانی شد')
      router.push('/admin/products') // یا هر مسیر دلخواه
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className="min-h-screen flex p-6 gap-12">
      <AdminPanelNavbar />
      <div className="w-full lg:w-4/5 lg:h-[750px] bg-light px-2 lg:p-4 rounded-2xl shadow-lg space-y-4 overflow-hidden relative">
        {loading ? (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-20 flex items-center justify-center rounded-2xl">
            <Loader2 />
          </div>
        ) : !product ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            محصولی یافت نشد
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin/products')}
                className="p-2 rounded-full bg-lightgray/50 hover:bg-gray-300 transition-all duration-300 cursor-pointer"
              >
                <FiArrowRight size={24} />
              </button>
              <h2 className="h3">ویرایش محصول</h2>
            </div>

            <ProductForm initialData={product} onSubmit={handleUpdate} />
          </>
        )}
      </div>
    </div>
  )
}
