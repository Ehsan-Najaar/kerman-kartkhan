import { useState } from 'react'

export default function Input({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onKeyDown,
  required,
  type = 'text',
  icon = null,
}) {
  const [focused, setFocused] = useState(false)

  const shouldFloatLabel = focused || (value !== '' && value !== undefined)

  return (
    <div
      className={`relative flex items-center ${
        icon ? 'rounded-lg px-4 bg-[#fff9f9] border border-lightgray/35' : ''
      }`}
    >
      {icon && <div>{icon}</div>}

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={(e) => {
          setFocused(true)
          if (typeof onFocus === 'function') onFocus(e)
        }}
        onBlur={() => setFocused(false)}
        onKeyDown={onKeyDown}
        required={required}
        className={`w-full p-3 rounded-lg transition-all duration-300 outline-none 
          ${
            !icon ? 'border' : ''
          } border-lightgray focus:border-section placeholder:text-gray/70`}
      />

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
    </div>
  )
}
