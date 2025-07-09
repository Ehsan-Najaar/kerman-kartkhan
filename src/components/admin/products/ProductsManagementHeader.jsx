// components/admin/products/ProductsManagementHeader.jsx
'use client'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { FiArrowRight, FiPlus, FiSearch } from 'react-icons/fi'

export default function ProductsManagementHeader({
  searchTerm,
  setSearchTerm,
  products,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-0 pt-4">
      <div className="w-full lg:w-1/3 flex items-center gap-2">
        <button
          onClick={() => (window.location.href = '/admin')}
          className="lg:hidden p-2 rounded-full bg-lightgray/50 hover:bg-gray-300"
        >
          <FiArrowRight size={24} />
        </button>
        <h2 className="h3">لیست محصولات</h2>
        <small>({products.length} محصول)</small>
      </div>

      <div className="w-full lg:w-1/3 flex items-center gap-2">
        <div className="w-full flex items-center gap-2 px-4 py-2 bg-light rounded-lg border border-lightgray placeholder:text-gray/50">
          <input
            type="text"
            placeholder="جستجو نام محصول..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent focus:outline-none"
          />
          <FiSearch size={24} className="text-gray-500" />
        </div>

        <Link
          href={'/admin/products/add-product'}
          className="lg:hidden btn-primary rounded-full shadow-sm"
        >
          <Button size="sm" className="rounded-full">
            <FiPlus size={24} />
          </Button>
        </Link>
      </div>

      <div className="hidden lg:flex lg:w-1/3 justify-end">
        <Link href={'/admin/products/add-product'}>
          <Button size="sm">
            <FiPlus size={24} />
            افزودن محصول
          </Button>
        </Link>
      </div>
    </div>
  )
}
