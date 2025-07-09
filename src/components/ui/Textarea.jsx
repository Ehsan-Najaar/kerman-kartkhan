import clsx from 'clsx'
import { useState } from 'react'

export default function Textarea({
  id,
  name,
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
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        required={required}
        className={clsx(
          'peer w-full pt-6 pb-2 px-3 border border-lightgray rounded-lg resize-none',
          'focus:outline-none focus:border-section transition-all duration-200',
          'placeholder-transparent'
        )}
      />

      <label
        htmlFor={id}
        className={clsx(
          'absolute right-3 px-1 text-gray/50 bg-white transition-all duration-200 pointer-events-none',
          'peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs',
          'peer-focus:-top-2 peer-focus:text-xs',
          (focused || hasValue) && '-top-2 text-xs text-secondary'
        )}
      >
        {label}
      </label>
    </div>
  )
}
