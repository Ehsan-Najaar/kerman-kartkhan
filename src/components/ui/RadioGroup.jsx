export default function RadioGroup({
  name,
  label,
  options = [],
  value,
  onChange,
  required = false,
  direction = 'row',
  wrapperClass = '',
  labelClass = '',
  optionClass = '',
  activeClass = '',
  inactiveClass = '',
  renderOption,
}) {
  const isVertical = direction === 'column'

  return (
    <div className={wrapperClass}>
      {label && (
        <label className={`font-semibold block mb-2 ${labelClass}`}>
          {label}
        </label>
      )}
      <div
        className={`flex ${isVertical ? 'flex-col gap-2' : 'gap-4 flex-wrap'}`}
      >
        {options.map((opt, i) => {
          const isSelected = value === opt.value
          const defaultClasses = `flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition ${
            isSelected
              ? activeClass || 'bg-section text-dark border-section'
              : inactiveClass ||
                'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
          }`

          return (
            <label key={i} className={`${defaultClasses} ${optionClass}`}>
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                onChange={onChange}
                required={required}
                className="hidden"
              />
              {renderOption ? renderOption(opt, isSelected) : opt.label}
            </label>
          )
        })}
      </div>
    </div>
  )
}
