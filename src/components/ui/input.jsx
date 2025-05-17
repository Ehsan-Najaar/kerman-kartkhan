import { useState } from 'react'

export default function Input({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  required,
  type = 'text',
  icon = null,
}) {
  const [focused, setFocused] = useState(false)

  // اگر value از بیرون مقدار گرفت، لیبل باید بالا بره
  const shouldFloatLabel = focused || (value !== '' && value !== undefined)

  return (
    <div className="relative">
      {/* اینپوت */}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full p-3 border border-lightgray rounded-lg transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-section"
      />

      {/* لیبل */}
      <label
        htmlFor={id}
        className={`absolute right-4 py-1 px-4 transition-all duration-300 ${
          shouldFloatLabel
            ? '-top-2 right-0 small-text text-secondary bg-bg'
            : 'top-2 right-4 text-gray/50 small-text'
        }`}
        style={{
          transform: shouldFloatLabel ? 'translateY(-12px)' : 'translateY(0)',
        }}
      >
        {label}
      </label>

      {/* آیکون (اختیاری) */}
      {icon && (
        <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
          {icon}
        </div>
      )}
    </div>
  )
}
