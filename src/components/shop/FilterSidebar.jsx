// components/shop/FilterSidebar.js
'use client'

import Button from '@/components/ui/Button'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export default function FilterSidebar({
  brands = [],
  conditions = [],
  priceMin,
  priceMax,
  filters = {},
  setFilters,
  onClearFilters,
  onApplyFilters,
}) {
  const [tempFilters, setTempFilters] = useState({
    priceRange: filters.priceRange || [priceMin, priceMax],
    selectedBrand: filters.selectedBrand || [],
    selectedCondition: filters.selectedCondition || [],
  })

  const [isOpen, setIsOpen] = useState({
    brands: true,
    conditions: true,
    price: false,
  })

  const toggleSection = (section) => {
    setIsOpen((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleCheckboxChange = (e, type) => {
    const { value } = e.target
    setTempFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }))
  }

  const handleSliderChange = (_, newValue) => {
    setTempFilters((prev) => ({ ...prev, priceRange: newValue }))
  }

  const clearFilters = () => {
    const reset = {
      priceRange: [priceMin, priceMax],
      selectedBrand: [],
      selectedCondition: [],
    }
    setTempFilters(reset)
    onClearFilters()
  }

  const applyFilters = () => {
    setFilters(tempFilters)
    onApplyFilters?.(tempFilters)
  }

  const renderCheckboxList = (key, title, values) => (
    <div className="mb-6">
      <div
        className={`flex items-center justify-between cursor-pointer p-2 rounded-md bg-lightgray/35 ${
          isOpen[key] ? 'rounded-b-none' : ''
        }`}
        onClick={() => toggleSection(key)}
      >
        <h3 className="text-sm">{title}</h3>
        {isOpen[key] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
      {isOpen[key] && (
        <ul
          className={`space-y-2 max-h-48 overflow-y-auto p-4 bg-lightgray/35 ${
            isOpen[key] ? 'rounded-b-md' : ''
          }`}
        >
          {values.length > 0 ? (
            values.map((value) => (
              <li key={value} className="flex items-center gap-2">
                <input
                  id={`${key}-${value}`}
                  type="checkbox"
                  value={value}
                  checked={tempFilters[key].includes(value)}
                  onChange={(e) => handleCheckboxChange(e, key)}
                  className="cursor-pointer w-4 h-4 accent-primary"
                />
                <label
                  htmlFor={`${key}-${value}`}
                  className="text-sm cursor-pointer"
                >
                  {value}
                </label>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">داده‌ای یافت نشد</p>
          )}
        </ul>
      )}
    </div>
  )

  return (
    <div className="w-full lg:max-w-xs lg:p-6 rounded-2xl text-dark lg:shadow lg:border border-lightgray/35">
      <h2 className="hidden lg:block text-xl font-bold pb-2 border-b border-gray-400 mb-6">
        فیلترها
      </h2>

      <div className="hidden lg:flex justify-end gap-2 mb-6">
        <Button
          onClick={clearFilters}
          variant="ghost"
          size="sm"
          fontWeight="medium"
        >
          حذف فیلتر
        </Button>
        <Button
          onClick={applyFilters}
          variant="secondary"
          size="sm"
          fontWeight="medium"
        >
          اعمال فیلتر
        </Button>
      </div>

      {renderCheckboxList('selectedBrand', 'برندها', brands)}
      {renderCheckboxList('selectedCondition', 'وضعیت دستگاه', conditions)}

      {/* محدوده قیمت */}
      <div>
        <div
          className={`flex items-center justify-between cursor-pointer p-2 rounded-md bg-lightgray/35 ${
            isOpen.price ? 'rounded-b-none' : ''
          }`}
          onClick={() => toggleSection('price')}
        >
          <h3 className="text-sm">محدوده قیمت</h3>
          {isOpen.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {isOpen.price && (
          <Box
            sx={{ width: '100%' }}
            className={`w-full mx-auto p-6 bg-lightgray/35 ${
              isOpen.price ? 'rounded-b-md' : ''
            }`}
          >
            <Slider
              value={tempFilters.priceRange}
              onChange={handleSliderChange}
              min={priceMin}
              max={priceMax}
              step={100000}
              sx={{ color: '#ff697c' }}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span className="font-semibold">
                {tempFilters.priceRange[1].toLocaleString()} تومان
              </span>
              <span className="font-semibold">
                {tempFilters.priceRange[0].toLocaleString()} تومان
              </span>
            </div>
          </Box>
        )}
      </div>

      <div className="w-full fixed bottom-0 right-0 left-0  p-4 bg-light lg:hidden flex justify-end gap-2 mt-6">
        <Button
          onClick={clearFilters}
          variant="ghost"
          size="sm"
          fontWeight="medium"
          className="w-1/2"
        >
          حذف فیلتر
        </Button>
        <Button
          onClick={applyFilters}
          variant="secondary"
          size="sm"
          fontWeight="medium"
          className="w-1/2"
        >
          اعمال فیلتر
        </Button>
      </div>
    </div>
  )
}
