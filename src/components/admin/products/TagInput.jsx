import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useState } from 'react'
import { FiX } from 'react-icons/fi'

export default function TagInput({ value = [], onChange }) {
  const [input, setInput] = useState('')

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const addTag = () => {
    const newTag = input.trim().replace(/,|،/g, '')
    if (newTag && !value.includes(newTag)) {
      onChange([...value, newTag])
    }
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === '،') {
      e.preventDefault()
      addTag()
    }
  }

  const removeTag = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex flex-wrap gap-2 rounded-lg">
        {/* نمایش تگ‌ها */}
        {value.map((tag, i) => (
          <span
            key={i}
            className="bg-gray-200 px-2 py-1 rounded-full flex items-center gap-1 text-sm"
          >
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            >
              <FiX />
            </button>
            {tag}
          </span>
        ))}
      </div>

      {/* ورودی و دکمه افزودن */}
      <div className="flex gap-2 items-center">
        <div className="flex-1">
          <Input
            id="tags"
            label="تگ جدید"
            value={input}
            type="text"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            formNoValidate
            placeholder="مثلاً: کارتخوان بیسیم"
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          fontWeight="medium"
          onClick={addTag}
          disabled={!input.trim()}
        >
          افزودن
        </Button>
      </div>
    </div>
  )
}
