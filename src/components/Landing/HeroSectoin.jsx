'use client'

import { useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import ProductsSection from '@/components/Landing/ProductsSection'
import ScrollDownArrow from '@/components/Landing/ScrollDownArrow'
import TopSection from './TopSection'

export default function HeroSection() {
  // کنترل انیمیشن‌ها برای بخش‌های چپ و راست
  const controlsLeft = useAnimation()
  const controlsRight = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [loading, setLoading] = useState(true)

  // محصولات دریافتی از API
  const [products, setProducts] = useState([])

  // تب فعال (آکبند یا استوک)
  const [activeTab, setActiveTab] = useState('آکبند')

  // ایندکس مرحله فعال (برای قسمت بعدی اگر خواستی اضافه کنی)
  const [activeStep, setActiveStep] = useState(null)

  // شروع انیمیشن وقتی بخش در صفحه دیده شد
  useEffect(() => {
    if (inView) {
      controlsLeft.start('show')
      controlsRight.start('show')
    }
  }, [inView, controlsLeft, controlsRight])

  // دریافت محصولات از API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        setProducts(Array.isArray(data) ? data : data.products)
      } catch (error) {
        console.error('خطا در دریافت محصولات:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div
      ref={ref}
      className="bg-primary h-[950px] max-w-6xl mx-auto rounded-b-4xl lg:rounded-[48px] -mt-16 lg:-mt-24 p-4 lg:p-0 text-light"
    >
      <TopSection controlsLeft={controlsLeft} controlsRight={controlsRight} />
      <ScrollDownArrow controlsLeft={controlsLeft} />
      <ProductsSection
        products={products}
        activeTab={activeTab}
        loading={loading}
        setActiveTab={setActiveTab}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        controlsRight={controlsRight}
      />
    </div>
  )
}
