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
        className="w-full p-3 rounded-lg transition-all duration-300 outline-none 
             border border-lightgray focus:border-section"
      />

      {/* لیبل */}
      <label
        htmlFor={id}
        className={`absolute right-4 text-xs transition-all duration-300 cursor-text ${
          shouldFloatLabel
            ? '-top-2 text-secondary text-sm bg-light'
            : 'top-4 text-gray/50'
        }`}
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
