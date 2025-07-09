'use client'

import Button from '@/components/ui/Button'
import { DownloadCloud } from 'lucide-react'
import { FiSearch } from 'react-icons/fi'

export default function OrdersHeader({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  total,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4">
      {/* Right: Title */}
      <div className="w-1/3 flex items-center gap-2 text-dark">
        <h3 className="h3">مدیریت سفارشات</h3>
        <small>({total} سفارش)</small>
      </div>

      {/* Center: Search */}
      <div className="w-1/3 flex items-center gap-2 px-4 py-2 bg-light rounded-lg border border-lightgray placeholder:text-gray/50">
        <input
          type="text"
          placeholder="جستجو کد ملی یا موبایل کاربر..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent focus:outline-none"
        />
        <FiSearch size={24} className="text-gray-500" />
      </div>

      {/* Left: Export & Filters */}
      <div className="w-1/3 flex items-center justify-end gap-2">
        <Button variant="secondary" outline="true" size="sm">
          استخراج اکسل
          <DownloadCloud size={18} />
        </Button>

        {/* فیلتر وضعیت سفارش */}
        {/* 
          اگر Dropdown کامپوننت آماده‌ات را داشته باشی، این کد را آنکامنت کن:
          
          <Dropdown
            items={[
              { value: 'all', label: 'همه سفارشات' },
              { value: 'paid', label: 'پرداخت شده' },
              { value: 'unpaid', label: 'پرداخت نشده' },
              { value: 'processing', label: 'در حال پردازش' },
              { value: 'shipped', label: 'ارسال شده' },
              { value: 'completed', label: 'تکمیل شده' },
              { value: 'canceled', label: 'لغو شده' },
            ]}
            selectedValue={filterStatus}
            onSelect={(item) => setFilterStatus(item.value)}
            label="وضعیت سفارش"
          />
        */}
      </div>
    </div>
  )
}
