import Input from '@/components/ui/Input'
import RadioGroup from '@/components/ui/RadioGroup'
import Textarea from '@/components/ui/Textarea'

const availableColors = ['قرمز', 'آبی', 'نارنجی', 'زرد', 'مشکی', 'سفید']
const allowedCombination = ['زرد', 'مشکی']

const colorMap = {
  قرمز: '#f44336',
  آبی: '#2196f3',
  نارنجی: '#ff9800',
  زرد: '#ffeb3b',
  مشکی: '#000000',
  سفید: '#ffffff',
}

export default function ProductInfoForm({
  form,
  categories,
  handleChange,
  handleArrayChange,
  handleColorChange,
  handleFeatureChange,
}) {
  const toggleColor = (color) => {
    const colors = [...form.colors]

    // اگر ترکیب دو رنگ انتخاب شده است
    if (colors.length === 2) {
      if (colors.includes(color)) {
        // حذف رنگ از ترکیب
        const filtered = colors.filter((c) => c !== color)
        handleColorChange(filtered)
      } else {
        // پاک کردن ترکیب و گذاشتن فقط رنگ جدید
        handleColorChange([color])
      }
      return
    }

    // تک رنگ‌ها
    if (colors.includes(color)) {
      handleColorChange(colors.filter((c) => c !== color))
    } else {
      if (colors.length === 1) {
        const newColors = [...colors, color]
        const sortedNewColors = newColors.slice().sort()
        const sortedAllowed = allowedCombination.slice().sort()
        if (
          sortedNewColors.length === 2 &&
          sortedNewColors[0] === sortedAllowed[0] &&
          sortedNewColors[1] === sortedAllowed[1]
        ) {
          handleColorChange(newColors)
        } else {
          alert('تنها ترکیب رنگ مجاز، زرد و مشکی است.')
        }
      } else {
        handleColorChange([...colors, color])
      }
    }
  }

  return (
    <div className="space-y-6 w-full grid grid-cols-2 gap-4 pr-4">
      {/* نام محصول */}
      <Input
        id="name"
        name="name"
        label="نام محصول"
        value={form.name || ''}
        onChange={handleChange}
        required
        placeholder="مثلاً: واکی‌تاکی مدل x"
        type="text"
      />

      {/* قیمت */}
      <Input
        id="price"
        name="price"
        label="قیمت (تومان)"
        value={form.price || ''}
        onChange={(e) => {
          const val = e.target.value.replace(/,/g, '')
          if (!isNaN(val) || val === '') {
            handleChange({ target: { name: 'price', value: val } })
          }
        }}
        required
        placeholder="مثلاً: 1200000"
        type="text"
        inputMode="numeric"
        className="remove-arrow"
      />

      {/* نوع */}
      <RadioGroup
        name="condition"
        label="وضعیت"
        options={[
          { label: 'آکبند', value: 'آکبند' },
          { label: 'استوک', value: 'استوک' },
        ]}
        value={form.condition}
        onChange={handleChange}
        direction="row" // یا column
      />

      {/* وضعیت */}
      <RadioGroup
        name="type"
        label="نوع دستگاه"
        options={[
          { label: 'بیسیم', value: 'بیسیم' },
          {
            label: 'سیار',
            value: 'سیار',
          },
        ]}
        value={form.type}
        onChange={handleChange}
        renderOption={(opt, isSelected) => (
          <div className="flex items-center gap-2">
            <span>{opt.label}</span>
          </div>
        )}
      />

      {/* رنگ‌ها */}
      <div className="col-span-2">
        <label className="font-semibold block mb-2">رنگ‌ها</label>
        <div className="flex flex-wrap gap-3">
          {availableColors.map((color) => {
            const isSelected = form.colors.includes(color)
            return (
              <button
                type="button"
                key={color}
                onClick={() => toggleColor(color)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xs border-2 ${
                  isSelected
                    ? 'ring-2 ring-section border-black'
                    : 'border-gray-300'
                }`}
                style={{
                  backgroundColor: colorMap[color],
                  color: color === 'سفید' ? '#000' : '#fff',
                }}
              >
                {color}
              </button>
            )
          })}
        </div>
        <p className="mt-2 text-sm text-gray-600">
          می‌توانید چند رنگ تک انتخاب کنید یا ترکیب دو رنگ زرد و مشکی را انتخاب
          کنید.
        </p>
      </div>

      {/* ویژگی‌های مهم کلید - مقدار */}
      <div className="col-span-2 space-y-3">
        <label className="font-semibold block mb-1">
          ویژگی‌های اصلی (کلید - مقدار)
        </label>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex gap-2">
            <Input
              label="مثلاً: شارژر"
              value={form.mainFeatures?.[i]?.key || ''}
              onChange={(e) => handleFeatureChange(i, 'key', e.target.value)}
            />
            <Input
              label="مثلاً: تایپ C"
              value={form.mainFeatures?.[i]?.value || ''}
              onChange={(e) => handleFeatureChange(i, 'value', e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* ویژگی‌های دیگر */}
      <Input
        id="otherFeatures"
        label="ویژگی‌های دیگر (با کاما جدا)"
        value={form.otherFeatures?.join(', ') || ''}
        onChange={(e) => handleArrayChange('otherFeatures', e.target.value)}
      />

      {/* توضیحات */}
      <Textarea
        id="description"
        name="description"
        label="توضیحات"
        value={form.description || ''}
        onChange={handleChange}
        placeholder="توضیحات کامل محصول..."
        rows={5}
      />

      {/* دسته‌بندی */}
      <div>
        <label className="font-semibold block mb-2" htmlFor="category">
          دسته‌بندی
        </label>
        <select
          id="category"
          name="category"
          value={form.category || ''}
          onChange={handleChange}
          className="w-full p-3 border border-lightgray rounded-lg focus:outline-none focus:ring-1 focus:ring-section"
          required
        >
          <option value="">انتخاب کنید</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
