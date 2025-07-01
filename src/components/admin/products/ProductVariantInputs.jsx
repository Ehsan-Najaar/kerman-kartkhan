'use client'

import { FiPlus, FiTrash2 } from 'react-icons/fi'

export default function ProductVariantInputs({ variants, onChange }) {
  const handleAddVariant = () => {
    onChange([...variants, { name: '', price: '' }])
  }

  const handleRemoveVariant = (index) => {
    const updated = [...variants]
    updated.splice(index, 1)
    onChange(updated)
  }

  const handleChange = (index, field, value) => {
    const updated = [...variants]
    updated[index][field] = value
    onChange(updated)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-bold text-dark">مدل‌های محصول (Variants)</p>
        <button
          type="button"
          onClick={handleAddVariant}
          className="flex items-center gap-2 text-primary hover:text-primary-dark"
        >
          <FiPlus />
          افزودن مدل جدید
        </button>
      </div>

      {variants.length === 0 && (
        <p className="text-gray-500 text-sm">هنوز مدلی اضافه نشده است.</p>
      )}

      {variants.map((variant, index) => (
        <div
          key={index}
          className="flex gap-4 items-center border border-gray-300 p-3 rounded-lg"
        >
          <input
            type="text"
            placeholder="نام مدل (مثلاً 2G)"
            value={variant.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded"
          />

          <input
            type="number"
            placeholder="قیمت (تومان)"
            value={variant.price}
            onChange={(e) => handleChange(index, 'price', e.target.value)}
            className="w-40 p-2 border border-gray-300 rounded"
          />

          <button
            type="button"
            onClick={() => handleRemoveVariant(index)}
            className="text-red-500 hover:text-red-700"
          >
            <FiTrash2 />
          </button>
        </div>
      ))}
    </div>
  )
}
