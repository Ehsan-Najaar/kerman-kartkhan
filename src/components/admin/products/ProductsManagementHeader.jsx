// components/admin/products/ProductsManagementHeader.jsx
'use client'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { FiArrowRight, FiPlus, FiSearch } from 'react-icons/fi'

export default function ProductsManagementHeader({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-0">
      <div className="w-full lg:w-1/3 flex items-center gap-2">
        <button
          onClick={() => (window.location.href = '/admin')}
          className="lg:hidden p-2 rounded-full bg-bg hover:bg-gray-300"
        >
          <FiArrowRight size={24} />
        </button>
        <h2 className="h3">لیست محصولات</h2>
        <small>محصول</small>
      </div>

      <div className="w-full lg:w-1/3 flex items-center gap-2">
        <div className="w-full flex items-center gap-2 px-4 py-2 bg-light shadow-sm rounded-full">
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
          <FiPlus size={24} />
        </Link>
      </div>

      <Link href={'/admin/products/add-product'}>
        <Button>
          افزودن محصول <FiPlus size={24} />
        </Button>
      </Link>
    </div>
  )
}
