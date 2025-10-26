'use client'

import Button from '@/components/ui/Button'
import { FiPlus, FiSearch } from 'react-icons/fi'

export default function ArticlesHeader({
  total,
  onAdd,
  search,
  onSearchChange,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white py-4">
      {/* Title & Count */}
      <div className="w-full lg:w-1/3 flex items-center justify-center md:justify-start gap-2">
        <h2 className="h3">لیست مقالات</h2>
        <small className="text-gray-500">({total})</small>
      </div>

      {/* Search Box */}
      <div className="w-full lg:w-1/3 flex items-center gap-2">
        <div className="w-full flex items-center gap-2 px-4 py-2 bg-light rounded-lg border border-lightgray placeholder:text-gray/50">
          <input
            type="text"
            placeholder="جستجوی مقاله..."
            value={search}
            onChange={onSearchChange}
            className="w-full bg-transparent focus:outline-none"
          />
          <FiSearch size={24} className="text-gray-500" />
        </div>
      </div>

      {/* Add Button */}
      <div className="hidden lg:flex lg:w-1/3 justify-end">
        <Button onClick={onAdd} size="sm">
          <FiPlus size={20} />
          افزودن مقاله جدید
        </Button>
      </div>
    </div>
  )
}
