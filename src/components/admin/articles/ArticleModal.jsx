'use client'

import ImageUpload from '@/components/admin/articles/ImageUpload'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import dynamic from 'next/dynamic'
import { FiX } from 'react-icons/fi'

const RichTextEditor = dynamic(
  () => import('@/components/admin/articles/RichTextEditor'),
  { ssr: false, loading: () => <p>در حال بارگذاری ادیتور...</p> }
)

export default function ArticleModal({
  form,
  setForm,
  showModal,
  setShowModal,
  tagInput,
  setTagInput,
  handleAddTag,
  handleRemoveTag,
  handleSubmit,
  loading,
}) {
  if (!showModal) return null

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-3xl relative overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">
          {form._id ? 'ویرایش مقاله' : 'افزودن مقاله'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <section>
              <ImageUpload
                value={form.coverImage}
                onChange={(url) =>
                  setForm((prev) => ({ ...prev, coverImage: url }))
                }
              />
            </section>

            <section className="flex-1 space-y-2">
              <div className="flex gap-2">
                <Input
                  id="title"
                  name="title"
                  label="عنوان مقاله"
                  value={form.title}
                  onChange={handleChange}
                  required
                  maxLength={40}
                />
                <Input
                  id="slug"
                  name="slug"
                  label="Slug (برای URL)"
                  value={form.slug}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                id="description"
                name="description"
                label="توضیح کوتاه"
                value={form.description}
                onChange={handleChange}
                required
                maxLength={105}
              />
            </section>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              متن کامل مقاله
            </label>
            {showModal && (
              <RichTextEditor
                value={form.content}
                onChange={(html) =>
                  setForm((prev) => ({ ...prev, content: html }))
                }
              />
            )}
          </div>

          {/* برچسب‌ها */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                id="tags"
                label="برچسب‌ها"
                name="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <Button
                variant="secondary"
                outline
                type="button"
                size="sm"
                onClick={handleAddTag}
              >
                افزودن
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {form.tags.map((tag, index) => (
                <small
                  key={index}
                  className="bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-2 text-xs"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-red-500 hover:text-red-700 ml-1 cursor-pointer"
                  >
                    <FiX />
                  </button>
                </small>
              ))}
            </div>
          </div>

          {/* منتشر شود */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
              className="cursor-pointer w-4 h-4 accent-primary"
            />
            منتشر شود
          </label>

          {/* دکمه‌ها */}
          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setShowModal(false)}
              disabled={loading}
            >
              انصراف
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'در حال ذخیره...' : 'ذخیره'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
