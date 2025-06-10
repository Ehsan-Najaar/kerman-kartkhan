'use client'

import { Clock, Trash2 } from 'lucide-react'

export default function RecentSearches({ items, onSelect, onClear }) {
  if (!items.length) return null

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm text-gray">
          <Clock size={18} className="text-secondary" />
          جستجوهای اخیر
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 cursor-pointer"
          aria-label="پاک کردن همه جستجوهای اخیر"
        >
          <Trash2 size={16} />
          پاک کردن همه
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <button
            key={index}
            className="bg-lightgray/30 px-3 py-1 rounded-full text-sm text-gray hover:bg-lightgray"
            onClick={() => onSelect(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
