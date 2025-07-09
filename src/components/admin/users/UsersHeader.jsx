'use client'

import Button from '@/components/ui/Button'
import { DownloadCloud } from 'lucide-react'
import { FiSearch } from 'react-icons/fi'

export default function UsersHeader({
  search,
  setSearch,
  filterRole,
  setFilterRole,
  total,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 border-b border-gray-200">
      {/* Right: Title */}
      <div className="w-1/3 flex items-center gap-2 text-dark">
        <h3 className="h3">مدیریت کاربران</h3>
        <small>({total} کاربر)</small>
      </div>

      {/* Center: Search */}
      <div className="w-1/3 flex items-center gap-2 px-4 py-2 bg-light rounded-lg border border-lightgray placeholder:text-gray/50">
        <input
          type="text"
          placeholder="جستجو نام یا موبایل کاربر..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent focus:outline-none"
        />
        <FiSearch size={24} className="text-gray-500" />
      </div>

      {/* Left: Filter dropdown */}
      <div className="w-1/3 flex items-center justify-end">
        <Button variant="secondary" outline="true" size="sm">
          استخراج اکسل
          <DownloadCloud size={18} />
        </Button>

        {/* <Dropdown
          items={[
            { value: 'all', label: 'همه کاربران' },
            { value: 'admin', label: 'فقط ادمین‌ها' },
            { value: 'user', label: 'فقط کاربران عادی' },
          ]}
          selectedValue={filterRole}
          onSelect={(item) => setFilterRole(item.value)}
          label="نقش کاربر"
        /> */}
      </div>
    </div>
  )
}
