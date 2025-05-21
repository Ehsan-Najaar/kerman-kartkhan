import ProductColorSelector from '@/components/admin/products/ProductColorSelector'
import ProductFeatureInputs from '@/components/admin/products/ProductFeatureInputs'
import TagInput from '@/components/admin/products/TagInput'
import Dropdown from '@/components/ui/Dropdown'
import Input from '@/components/ui/Input.jsx'
import RadioGroup from '@/components/ui/RadioGroup'
import Textarea from '@/components/ui/Textarea'

const availableColors = ['قرمز', 'آبی', 'نارنجی', 'زرد', 'مشکی', 'سفید']

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
  handleColorChange,
  handleBodyColorsChange,
  handleFeatureChange,
  handleAddFeature,
  handleRemoveFeature,
  handleTagsChange,
}) {
  const formatNumber = (value) => {
    const str = String(value || '')
    return str.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const categoryItems = categories.map((cat) => ({
    label: cat.title,
    value: cat._id,
  }))

  return (
    <div className="space-y-6 w-full gap-4">
      <section className="grid grid-cols-2 gap-4">
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
          className="w-full"
        />

        {/* برند */}
        <Input
          id="brand"
          name="brand"
          label="برند"
          value={form.brand || ''}
          onChange={handleChange}
          placeholder="مثلاً: موتورولا"
          type="text"
          className="w-full"
        />
      </section>

      <section className="grid grid-cols-2 gap-4">
        {/* مدل */}
        <Input
          id="model"
          name="model"
          label="مدل"
          value={form.model || ''}
          onChange={handleChange}
          placeholder="مثلاً: XT420"
          type="text"
          className="w-full"
        />

        {/* قیمت */}
        <Input
          id="price"
          name="price"
          label="قیمت (تومان)"
          value={formatNumber(form.price || '')}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/\D/g, '')
            if (/^\d*$/.test(rawValue)) {
              handleChange({ target: { name: 'price', value: rawValue } })
            }
          }}
          required
          type="text"
          inputMode="numeric"
          className="w-full remove-arrow"
        />
      </section>

      <section className="grid grid-cols-2 gap-4">
        {/* دسته‌بندی */}
        <Dropdown
          items={categoryItems}
          label="انتخاب دسته بندی"
          selectedValue={
            typeof form.category === 'object'
              ? form.category._id
              : form.category
          }
          onSelect={(item) =>
            handleChange({ target: { name: 'category', value: item.value } })
          }
        />

        {/* موجودی */}
        <Input
          id="stock"
          name="stock"
          label="موجودی"
          value={form.stock || 0}
          onChange={(e) => {
            const val = e.target.value
            if (!isNaN(val) || val === '') {
              handleChange({ target: { name: 'stock', value: Number(val) } })
            }
          }}
          type="number"
          min={0}
          className="w-full remove-arrow"
        />
      </section>

      <section className="grid grid-cols-2 gap-4">
        {/* نوع دستگاه */}
        <RadioGroup
          name="type"
          label="نوع دستگاه"
          options={[
            { label: 'ثابت', value: 'ثابت' },
            { label: 'سیار', value: 'سیار' },
            { label: 'دیواری', value: 'دیواری' },
          ]}
          value={form.type}
          onChange={handleChange}
          direction="row"
        />

        {/* وضعیت */}
        <RadioGroup
          name="condition"
          label="وضعیت"
          options={[
            { label: 'آکبند', value: 'آکبند' },
            { label: 'استوک', value: 'استوک' },
          ]}
          value={form.condition}
          onChange={handleChange}
          direction="row"
        />
      </section>

      {/* رنگ‌ها */}
      <ProductColorSelector
        availableColors={availableColors}
        colorMap={colorMap}
        form={form}
        onColorsChange={handleColorChange}
        onBodyColorsChange={handleBodyColorsChange}
      />

      {/* ویژگی‌ها*/}
      <ProductFeatureInputs
        features={form.specs || []}
        onFeatureChange={handleFeatureChange}
        onAddFeature={handleAddFeature}
        onRemoveFeature={handleRemoveFeature}
      />

      {/* تگ‌ها */}
      <TagInput value={form.tags} onChange={handleTagsChange} />

      {/* توضیحات */}
      <Textarea
        id="description"
        name="description"
        label="توضیحات (اختیاری)"
        value={form.description || ''}
        onChange={handleChange}
        placeholder="توضیحات کامل محصول..."
        rows={5}
      />
    </div>
  )
}
