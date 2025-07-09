'use client'

import AdminPanelNavbar from '@/components/AdminPanelNavbar'
import ProductList from '@/components/admin/products/ProductList'
import ProductsFilters from '@/components/admin/products/ProductsFilters'
import ProductsManagementHeader from '@/components/admin/products/ProductsManagementHeader'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

export default function ProductsManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [allProducts, setAllProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({})

  const fetchProducts = () => {
    setLoading(true)
    fetch('/api/admin/products', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
          setAllProducts([])
          setLoading(false)
          return
        }
        setAllProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('خطا در دریافت محصولات:', err)
        toast.error('خطا در دریافت محصولات')
        setLoading(false)
      })
  }

  const fetchCategories = () => {
    fetch('/api/admin/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {
        toast.error('خطا در دریافت دسته‌بندی‌ها')
      })
  }

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('خطا در حذف محصول')
      setAllProducts((prev) => prev.filter((p) => p._id !== id))
      toast.success('محصول با موفقیت حذف شد')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        const matchSearch = searchTerm
          ? product.name?.toLowerCase().includes(searchTerm.toLowerCase())
          : true

        const matchCategory = filters.category
          ? product.category === filters.category
          : true

        const matchBrand = filters.brand
          ? product.brand === filters.brand
          : true

        const matchCondition = filters.condition
          ? product.condition === filters.condition
          : true

        const matchType = filters.type ? product.type === filters.type : true

        const matchStock =
          filters.stock === 'in'
            ? product.stock > 3
            : filters.stock === 'low'
            ? product.stock > 0 && product.stock <= 3
            : filters.stock === 'out'
            ? product.stock === 0
            : true

        return (
          matchSearch &&
          matchCategory &&
          matchBrand &&
          matchCondition &&
          matchType &&
          matchStock
        )
      })
      .sort((a, b) => {
        if (filters.sort === 'price-asc') return a.price - b.price
        if (filters.sort === 'price-desc') return b.price - a.price
        if (filters.sort === 'sold-desc') return b.sold - a.sold
        if (filters.sort === 'views-desc') return b.views - a.views
        return 0
      })
  }, [allProducts, searchTerm, filters])

  // برندها رو از محصولات استخراج کن
  const uniqueBrands = useMemo(() => {
    const brands = allProducts.map((p) => p.brand).filter(Boolean)
    return [...new Set(brands)].map((b) => ({ label: b, value: b }))
  }, [allProducts])

  useEffect(() => {
    console.log('filteredProducts', filteredProducts)
    fetchProducts()
    fetchCategories()
  }, [])

  return (
    <div className="min-h-screen flex md:p-6 gap-12">
      <AdminPanelNavbar />

      <div className="w-full lg:w-4/5 lg:h-[750px] bg-light px-2 lg:p-4 rounded-2xl shadow-lg space-y-4 overflow-hidden">
        <ProductsManagementHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          products={filteredProducts}
        />

        <ProductsFilters
          categories={categories}
          brands={uniqueBrands}
          onFilterChange={(newFilters) => setFilters(newFilters)}
        />

        <ProductList
          products={filteredProducts}
          loading={loading}
          searchTerm={searchTerm}
          onDelete={deleteProduct}
          categories={categories}
        />
      </div>
    </div>
  )
}
