import { Loader1 } from '@/components/Loader'
import AuthModal from '@/components/shop/AuthModal'
import { useAppContext } from '@/context/AppContext'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useAppContext()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthModalOpen, setAuthModalOpen] = useState(false)
  const router = useRouter()
  // چک کردن دسترسی ادمین
  const pathname = usePathname()

  useEffect(() => {
    // فرض کنیم که اگر user نبود، یعنی لاگین نیست
    if (user === null) {
      setAuthModalOpen(true)
      setIsLoading(false)
    } else {
      setAuthModalOpen(false)
      setIsLoading(false)
    }
  }, [user])

  if (isLoading) return <Loader1 />

  if (!user) {
    return (
      <>
        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setAuthModalOpen(false)}
          />
        )}
        <div className="absolute grid place-items-center top-0 right-0 w-screen bg-light min-h-[calc(100vh+250px)] lg:min-h-screen">
          <button
            onClick={() => setAuthModalOpen(true)}
            className="btn-primary"
          >
            ورود
          </button>
          <Link href={'/'} className="btn-outline">
            بازگشت به سایت
          </Link>
        </div>
      </>
    )
  }

  if (pathname.startsWith('/admin') && !user.roles.includes('admin')) {
    router.push('/')
    return null
  }

  return children
}

export default ProtectedRoute
