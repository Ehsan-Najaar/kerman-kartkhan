import ProductForm from '@/components/admin/products/ProductForm'
import AdminPanelNavbar from '@/components/AdminPanelNavbar'
import { FiArrowRight } from 'react-icons/fi'

export default function AddProduct() {
  return (
    <div className="min-h-screen lg:h-[710px] lg:flex p-6 gap-12">
      <AdminPanelNavbar />

      <div className="w-full lg:w-4/5 p-6 bg-light rounded-2xl shadow-lg space-y-6">
        <div className="flex items-center gap-4">
          <button
            // onClick={() => (window.location.href = '/admin/products')}
            className="p-2 rounded-full bg-lightgray hover:bg-gray-300 cursor-pointer"
          >
            <FiArrowRight size={24} />
          </button>
          <h2 className="h3">افزودن محصول</h2>
        </div>

        <ProductForm />
      </div>
    </div>
  )
}
