import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function Dropdown({
  items,
  onSelect,
  placeholder,
  label = 'انتخاب آیتم',
  selectedValue,
}) {
  const [open, setOpen] = useState(false)
  const [submenuOpenIndex, setSubmenuOpenIndex] = useState(null)
  const [selected, setSelected] = useState(null)
  const containerRef = useRef()

  useEffect(() => {
    if (selectedValue) {
      const matched = items.find(
        (item) => String(item.value) === String(selectedValue)
      )
      setSelected(matched || null)
    }
  }, [selectedValue, items])

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false)
        setSubmenuOpenIndex(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (item) => {
    setSelected(item)
    setOpen(false)
    setSubmenuOpenIndex(null)
    if (onSelect) onSelect(item)
  }

  const isFocused = open
  const hasValue = !!selected

  return (
    <div className="relative w-full h-full" ref={containerRef}>
      {/* لیبل شناور */}
      <label
        className={clsx(
          'absolute right-3 px-1 transition-all bg-light text-sm',
          isFocused || hasValue
            ? '-top-2 text-secondary px-px text-xs'
            : 'top-4 text-gray/50 text-sm'
        )}
      >
        {label}
      </label>

      {/* دکمه اصلی */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={clsx(
          'w-full h-full rounded-md px-4 py-3 text-right text-sm bg-light border flex justify-between items-center cursor-pointer transition-all outline-none',
          open ? 'border-section' : 'border-lightgray'
        )}
      >
        <span className={selected ? 'text-dark' : 'text-gray/50'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-gray/50" />
      </button>

      {/* لیست آیتم‌ها */}
      {open && (
        <ul className="absolute right-0 mt-1 w-full bg-light shadow-lg max-h-60 rounded-md py-1 text-sm ring-1 ring-lightgray p-2 ring-opacity-5 overflow-auto z-50">
          {items.map((item, index) => (
            <li
              key={item.value}
              className="relative"
              onMouseEnter={() => setSubmenuOpenIndex(index)}
              onMouseLeave={() => setSubmenuOpenIndex(null)}
            >
              <button
                type="button"
                className="w-full text-right px-4 py-2 rounded-lg text-gray hover:bg-gray-100 flex justify-between items-center cursor-pointer"
                onClick={() => {
                  if (!item.submenu) handleSelect(item)
                }}
              >
                {item.label}
                {item.submenu && (
                  <svg
                    className="ml-2 h-4 w-4 text-gray"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>

              {item.submenu && submenuOpenIndex === index && (
                <ul className="absolute left-full top-0 mt-0 w-48 bg-light shadow-lg rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 z-50">
                  {item.submenu.map((subitem) => (
                    <li key={subitem.value}>
                      <button
                        type="button"
                        className="w-full text-right px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => handleSelect(subitem)}
                      >
                        {subitem.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
