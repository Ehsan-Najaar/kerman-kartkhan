'use client'

import ProductForm from '@/components/admin/products/ProductForm'
import AdminPanelNavbar from '@/components/AdminPanelNavbar'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FiArrowRight } from 'react-icons/fi'

export default function AddProduct() {
  const router = useRouter()

  const handleAddProduct = async (formData) => {
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'خطا در ایجاد محصول')
      }

      toast.success('محصول با موفقیت ایجاد شد')
      router.push('/admin/products')
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className="min-h-screen lg:h-[710px] lg:flex p-6 gap-12">
      <AdminPanelNavbar />

      <div className="w-full lg:w-4/5 p-6 bg-light rounded-2xl shadow-lg space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/products')}
            className="p-2 rounded-full bg-lightgray/50 hover:bg-gray-300 transition-all duration-300 cursor-pointer"
          >
            <FiArrowRight size={24} />
          </button>
          <h2 className="h3">افزودن محصول</h2>
        </div>

        <ProductForm onSubmit={handleAddProduct} />
      </div>
    </div>
  )
}
