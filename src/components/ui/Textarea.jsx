import clsx from 'clsx'
import { useState } from 'react'

export default function Textarea({
  id,
  label,
  value,
  onChange,
  required = false,
  placeholder = '',
  rows = 4,
}) {
  const [focused, setFocused] = useState(false)

  const hasValue = value && value.toString().trim().length > 0

  return (
    <div className="relative w-full">
      <textarea
        id={id}
        name={id}
        rows={rows}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        required={required}
        className={clsx(
          'peer w-full pt-6 pb-2 px-3 border border-lightgray rounded-lg resize-none',
          'focus:outline-none focus:ring-1 focus:ring-section transition-all duration-200',
          'placeholder-transparent'
        )}
      />

      <label
        htmlFor={id}
        className={clsx(
          'absolute right-3 top-2 text-sm text-gray-500 pointer-events-none transition-all duration-200',
          {
            'text-xs -top-32 right-4 bg-white px-1': focused || hasValue,
          }
        )}
      >
        {label}
      </label>
    </div>
  )
}
