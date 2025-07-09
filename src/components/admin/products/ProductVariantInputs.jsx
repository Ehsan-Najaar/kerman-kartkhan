'use client'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
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
        <p className="block text-base">مدل‌های محصول (Variants)</p>

        <Button
          type="button"
          onClick={handleAddVariant}
          variant="secondary"
          outline="true"
          size="sm"
        >
          <FiPlus />
          افزودن مدل
        </Button>
      </div>

      {variants.length === 0 && (
        <p className="text-gray-500 text-sm">هنوز مدلی اضافه نشده است.</p>
      )}

      {variants.map((variant, index) => (
        <div key={index} className="flex gap-4 items-center p-3 rounded-lg">
          <Input
            type="text"
            label="نام مدل (مثلاً 2G)"
            value={variant.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded"
          />

          <Input
            type="text"
            label="قیمت (تومان)"
            value={variant.price ?? ''}
            onChange={(e) =>
              handleChange(
                index,
                'price',
                e.target.value === '' ? '' : Number(e.target.value)
              )
            }
            className="w-40 p-2 border border-gray-300 rounded"
          />

          <button
            type="button"
            onClick={() => handleRemoveVariant(index)}
            className="text-gray hover:text-red-500 cursor-pointer"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  )
}
