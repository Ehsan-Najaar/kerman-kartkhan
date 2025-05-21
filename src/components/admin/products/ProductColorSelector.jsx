import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useState } from 'react'

export default function ProductColorSelector({
  availableColors = [],
  colorMap = {},
  form = {}, // اطمینان از اینکه همیشه یک آبجکت داریم
  onColorsChange,
  onBodyColorsChange,
}) {
  const [activeTab, setActiveTab] = useState('تک رنگ')

  const tabs = ['تک رنگ', 'دو رنگ']
  const isSingleColor = activeTab === 'تک رنگ'

  // ترکیب رنگ‌های اولیه با رنگ‌های جدید
  const allColors = Array.from(
    new Set([
      ...availableColors,
      'طوسی روشن',
      'سورمه‌ای',
      'آبی نفتی',
      'آبی روشن',
    ])
  )

  const fullColorMap = {
    ...colorMap,
    'طوسی روشن': '#d3d3d3',
    سورمه‌ای: '#1b1f5e',
    'آبی نفتی': '#3b6978',
    'آبی روشن': '#87cefa',
  }

  // استفاده از مقدار پیش‌فرض آرایه برای جلوگیری از undefined
  const toggleStockColor = (color) => {
    const colors = Array.isArray(form.colors) ? form.colors : []
    if (colors.includes(color)) {
      onColorsChange(colors.filter((c) => c !== color))
    } else {
      onColorsChange([...colors, color])
    }
  }

  const toggleBodyColor = (color) => {
    const selected = Array.isArray(form.bodyColors) ? form.bodyColors : []
    if (selected.includes(color)) {
      onBodyColorsChange(selected.filter((c) => c !== color))
    } else if (selected.length < 2) {
      onBodyColorsChange([...selected, color])
    }
  }

  const isColorSelected = (color) => {
    if (isSingleColor) {
      return Array.isArray(form.colors) && form.colors.includes(color)
    } else {
      return Array.isArray(form.bodyColors) && form.bodyColors.includes(color)
    }
  }

  const handleClick = (color) =>
    isSingleColor ? toggleStockColor(color) : toggleBodyColor(color)

  return (
    <div className="col-span-2 space-y-4">
      <label className="block text-base">رنگ‌ها</label>

      {/* تب‌ها */}
      <div className="relative flex w-48 rounded-lg overflow-hidden shadow-sm bg-lightgray/20 border border-lightgray">
        <motion.div
          layout
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute top-0 bottom-0 w-1/2 bg-section/50 border border-secondary rounded-lg"
          style={{ right: isSingleColor ? '0%' : '50%' }}
        />
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`relative flex-1 p-2 main-text z-10 transition-colors font-medium duration-300 cursor-pointer ${
              activeTab === tab ? 'text-dark' : 'text-gray'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* انتخاب رنگ‌ها */}
      <div className="flex flex-wrap gap-2">
        {allColors.map((color) => {
          const selected = isColorSelected(color)
          return (
            <button
              key={color}
              type="button"
              onClick={() => handleClick(color)}
              className={`w-8 h-8 rounded-full flex items-center justify-center relative cursor-pointer border-2 border-lightgray`}
              style={{ backgroundColor: fullColorMap[color] }}
            >
              {selected && (
                <span className="absolute inset-0 flex items-center justify-center text-gray">
                  <Check size={20} />
                </span>
              )}
            </button>
          )
        })}
      </div>

      <p className="text-xs text-yellow-500">
        {isSingleColor
          ? 'رنگ‌هایی که این محصول در حال حاضر موجود دارد را انتخاب کنید.'
          : 'اگر طراحی بدنه این محصول دو رنگ است، حداکثر دو رنگ را انتخاب کنید.'}
      </p>
    </div>
  )
}
