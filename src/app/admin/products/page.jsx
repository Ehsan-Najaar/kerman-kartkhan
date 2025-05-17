// app/admin/products/page.js
'use client'

import AdminPanelNavbar from '@/components/AdminPanelNavbar'
import ProductList from '@/components/admin/products/ProductList'
import ProductsManagementHeader from '@/components/admin/products/ProductsManagementHeader'
import { useState } from 'react'

export default function ProductsManagement() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="min-h-screen flex p-6 gap-12">
      <AdminPanelNavbar />

      <div className="w-full lg:w-4/5 lg:h-[750px] bg-light px-2 lg:p-4 rounded-2xl shadow-lg space-y-20 overflow-hidden">
        <ProductsManagementHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <ProductList searchTerm={searchTerm} />
      </div>
    </div>
  )
}
