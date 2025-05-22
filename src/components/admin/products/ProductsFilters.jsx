'use client'

import Button from '@/components/ui/Button'
import Dropdown from '@/components/ui/Dropdown'
import { useState } from 'react'

export default function ProductsFilters({
  categories = [],
  brands = [],
  onFilterChange,
}) {
  const [filters, setFilters] = useState({
    category: null,
    brand: null,
    condition: null,
    type: null,
    stock: null,
    sort: null,
  })

  const handleChange = (key, item) => {
    const updated = { ...filters, [key]: item.value }
    setFilters(updated)
    onFilterChange?.(updated)
  }

  const resetFilters = () => {
    const emptyFilters = {
      category: null,
      brand: null,
      condition: null,
      type: null,
      stock: null,
      sort: null,
    }
    setFilters(emptyFilters)
    onFilterChange?.(emptyFilters)
  }

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Dropdown
          label="دسته‌بندی"
          items={categories.map((c) => ({ label: c.title, value: c._id }))}
          onSelect={(item) => handleChange('category', item)}
          selectedValue={filters.category}
        />

        <Dropdown
          label="برند"
          items={brands}
          onSelect={(item) => handleChange('brand', item)}
          selectedValue={filters.brand}
        />

        <Dropdown
          label="وضعیت"
          items={[
            { label: 'آکبند', value: 'آکبند' },
            { label: 'استوک', value: 'استوک' },
          ]}
          onSelect={(item) => handleChange('condition', item)}
          selectedValue={filters.condition}
        />

        <Dropdown
          label="نوع دستگاه"
          items={[
            { label: 'سیار', value: 'سیار' },
            { label: 'ثابت', value: 'ثابت' },
          ]}
          onSelect={(item) => handleChange('type', item)}
          selectedValue={filters.type}
        />

        <Dropdown
          label="وضعیت موجودی"
          items={[
            { label: 'موجود', value: 'in' },
            { label: 'در حال اتمام', value: 'low' },
            { label: 'ناموجود', value: 'out' },
          ]}
          onSelect={(item) => handleChange('stock', item)}
          selectedValue={filters.stock}
        />

        <Dropdown
          label="مرتب‌سازی"
          items={[
            { label: 'ارزان‌ترین', value: 'price-asc' },
            { label: 'گران‌ترین', value: 'price-desc' },
            { label: 'پرفروش‌ترین', value: 'sold-desc' },
            { label: 'پربازدیدترین', value: 'views-desc' },
          ]}
          onSelect={(item) => handleChange('sort', item)}
          selectedValue={filters.sort}
        />
      </div>

      <Button
        onClick={resetFilters}
        variant="ghost"
        fontWeight="medium"
        size="sm"
        className="w-full mt-4"
      >
        حذف تمام فیلتر ها
      </Button>
    </div>
  )
}
