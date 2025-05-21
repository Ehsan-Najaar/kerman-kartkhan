import Input from '@/components/ui/Input'
import { PlusIcon, Trash2 } from 'lucide-react'

export default function ProductFeatureInputs({
  features,
  onFeatureChange,
  onAddFeature,
  onRemoveFeature,
}) {
  // اطمینان از اینکه حداقل ۳ ویژگی برای نمایش داریم
  const minFeatures = [...features]
  while (minFeatures.length < 3) {
    minFeatures.push({ key: '', value: '' })
  }

  return (
    <div className="space-y-3">
      <label className="block">ویژگی‌ها</label>
      {minFeatures.map((feature, i) => {
        if (!feature || typeof feature !== 'object') return null

        return (
          <div key={i} className="flex gap-2 items-center">
            <Input
              placeholder={`ویژگی ${i + 1}`}
              value={feature.key || ''}
              label={i === 0 ? 'ویژگی (مثلاً: شارژر)' : `ویژگی ${i + 1}`}
              onChange={(e) => onFeatureChange(i, 'key', e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="مقدار ویژگی"
              value={feature.value || ''}
              label={i === 0 ? 'مقدار ویژگی (مثلاً: تایپ سی)' : 'مقدار ویژگی'}
              onChange={(e) => onFeatureChange(i, 'value', e.target.value)}
              className="flex-1"
            />
            {(feature.key || feature.value) && (
              <button
                type="button"
                onClick={() => onRemoveFeature(i)}
                className="text-gray hover:text-red-500 cursor-pointer"
                aria-label="حذف ویژگی"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        )
      })}

      <button
        type="button"
        onClick={onAddFeature}
        className="flex items-center gap-1 text-sm text-gray hover:underline mt-2 cursor-pointer"
      >
        <PlusIcon size={16} />
        افزودن ویژگی جدید
      </button>
    </div>
  )
}
