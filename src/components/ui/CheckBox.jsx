import { FiCheck } from 'react-icons/fi'

export default function CheckBox({
  id,
  label,
  checked,
  onChange,
  color = 'bg-secondary', // رنگ پیش‌فرض
  size = 'w-5 h-5', // اندازه پیش‌فرض
  icon = <FiCheck />, // آیکون پیش‌فرض
  disabled = false, // وضعیت غیرفعال بودن
}) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className={`form-checkbox ${size} ${color} text-white rounded-md focus:ring-2 focus:ring-${color} disabled:bg-gray-300 disabled:cursor-not-allowed`}
        disabled={disabled}
      />
      {label && (
        <label htmlFor={id} className="text-sm font-semibold">
          {label}
        </label>
      )}
      {/* آیکون در صورت فعال بودن */}
      {checked && <div className="absolute">{icon}</div>}
    </div>
  )
}
