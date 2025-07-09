'use client'

import { Loader3 } from '@/components/Loader'
import AuthModal from '@/components/shop/AuthModal'
import Button from '@/components/ui/Button'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [accessDenied, setAccessDenied] = useState(false)
  const [loading, setLoading] = useState(true)

  const { logout } = useAppContext()

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/check')
        const data = await res.json()

        if (!data.loggedIn) {
          setIsModalOpen(true)
          setAccessDenied(false)
        } else if (!data.roles.includes('admin')) {
          setAccessDenied(true)
          setIsModalOpen(false)
        } else {
          window.location.href = '/admin'
        }
      } catch (err) {
        setIsModalOpen(true)
        setAccessDenied(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) return <Loader3 />

  if (accessDenied)
    return (
      <div className="min-h-screen grid place-items-center">
        <section className="max-w-xl w-full text-center">
          <Image
            src="/images/undraw/undraw_security-on_btwg.svg"
            alt="اجازه دسترسی ندارید"
            width={300}
            height={300}
            className="mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            شما اجازه دسترسی به این بخش را ندارید
          </h2>
          <p className="text-gray-600 mb-8">
            برای دسترسی به این بخش، باید حساب ادمین داشته باشید. لطفاً به صفحه
            اصلی بازگردید یا از حساب خود خارج شوید.
          </p>
          <div className="flex justify-center gap-4">
            <Link href={'/shop'}>
              <Button variant="secondary">بازگشت به سایت</Button>
            </Link>
            <Button variant="ghost" outline="true" onClick={logout}>
              خروج از حساب
            </Button>
          </div>
        </section>
      </div>
    )

  return (
    <div className="min-h-screen grid place-items-center">
      <section className="space-x-2">
        <Link href={'/shop'}>
          <Button variant="ghost" outline="true">
            بازشگت به سایت
          </Button>
        </Link>
        <Button
          variant="secondary"
          onClick={() => {
            setIsModalOpen(true)
          }}
        >
          ورود / ثبت نام
        </Button>
      </section>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
