// components/shop/ProductListToolbar.js
'use client'

import clsx from 'clsx'

const SORT_OPTIONS = [
  { label: 'مرتبط‌ترین', value: 'default' },
  { label: 'ارزان‌ترین', value: 'price-asc' },
  { label: 'گران‌ترین', value: 'price-desc' },
  { label: 'پرفروش‌ترین', value: 'mostSold' },
]

export default function ProductListToolbar({
  title,
  onSortChange,
  activeSort,
}) {
  const handleSortClick = (value) => {
    onSortChange?.(value)
  }

  return (
    <div className="hidden lg:flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <h1 className="text-2xl font-bold mb-4 sm:mb-0">{title}</h1>

      <div className="flex gap-2 flex-wrap">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSortClick(option.value)}
            className={clsx(
              'px-4 py-1.5 rounded-full border text-sm transition-all cursor-pointer',
              activeSort === option.value
                ? 'bg-secondary text-light border-secondary'
                : 'border-gray text-gray hover:border-secondary hover:text-secondary'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
