'use client'

import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const AppContext = createContext({
  user: null,
  setUser: () => {},
  userDocks: null,
  loadingUserDocks: false,
  cart: { items: [] },
  loadingCart: false,
  addToCart: () => {},
  updateCartQuantity: () => {},
  removeFromCart: () => {},
  isInCart: () => {},
  handleLogout: () => {},
})

export function useAppContext() {
  return useContext(AppContext)
}

export default function AppContextProvider({ user = null, children }) {
  const router = useRouter()

  const [currentUser, setCurrentUser] = useState(user)
  const [loadingUser, setLoadingUser] = useState(true)

  // ----------- User Documents State -----------
  const [userDocuments, setUserDocuments] = useState(null)
  const [loadingUserDocuments, setLoadingUserDocuments] = useState(true)

  // ---------------- Cart State ----------------
  const [cart, setCart] = useState({ items: [] })
  const [loadingCart, setLoadingCart] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me', {
          credentials: 'include',
        })
        if (!res.ok) {
          setCurrentUser(null)
          setLoadingUser(false)
          return
        }
        const user = await res.json()
        setCurrentUser(user)
      } catch (err) {
        console.error(err)
        setCurrentUser(null)
      } finally {
        setLoadingUser(false)
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    const fetchUserDocuments = async () => {
      if (!currentUser) {
        // کاربر لاگین نیست، نیازی نیست API بزنی
        setUserDocuments(null)
        setLoadingUserDocuments(false)
        return
      }

      try {
        const res = await fetch('/api/user-documents')
        const data = await res.json()

        if (data.exists === false) {
          setUserDocuments(null)
        } else {
          setUserDocuments(data.document)
        }
      } catch (error) {
        console.error(error)
        setUserDocuments(null)
      } finally {
        setLoadingUserDocuments(false)
      }
    }

    fetchUserDocuments()
  }, [currentUser])

  useEffect(() => {
    const fetchCart = async () => {
      if (!currentUser) {
        setCart({ items: [] })
        setLoadingCart(false)
        return
      }

      try {
        const res = await fetch('/api/cart')
        const data = await res.json()
        if (!Array.isArray(data.items)) {
          setCart({ items: [] })
        } else {
          setCart(data)
        }
      } catch {
        setCart({ items: [] })
      } finally {
        setLoadingCart(false)
      }
    }

    fetchCart()
  }, [currentUser])

  const isInCart = (productId) => {
    return cart.items.some((item) => {
      const itemId =
        typeof item.productId === 'object' ? item.productId._id : item.productId

      return itemId?.toString() === productId?.toString()
    })
  }

  const addToCart = async (item) => {
    try {
      console.log('item to add:', item)

      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      })

      if (!res.ok) {
        const errorMessage = await res.text()
        console.log('خطا در افزودن به سبد خرید:', errorMessage)
        toast.error('خطا در افزودن محصول به سبد خرید.')
        return
      }

      const updated = await res.json()
      setCart(updated)
      toast.success('محصول به سبد خرید شما افزوده شد.')
    } catch (error) {
      console.log('خطا در ارتباط با سرور:', error)
      toast.error('خطا در ارتباط با سرور.')
    }
  }

  const updateCartQuantity = async ({
    productId,
    selectedColor,
    selectedVariant,
    bodyColors,
    quantity,
  }) => {
    const res = await fetch('/api/cart', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId,
        selectedColor,
        selectedVariant,
        bodyColors,
        quantity,
      }),
    })
    const updated = await res.json()
    setCart(updated)
  }

  const removeFromCart = async (item) => {
    const res = await fetch('/api/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })

    if (!res.ok) {
      console.log('خطا در حذف از سبد خرید:', await res.text())
      return
    }

    const updated = await res.json()
    setCart(updated)
    location.reload()
  }

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if (res.ok) {
        setCurrentUser(null)
        router.push('/shop')
        toast.success('خروج از حساب کاربری موفقیت‌آمیز بود')
      } else {
        console.error('خطا در خروج از حساب')
        toast.error('خطا در خروج از حساب')
      }
    } catch (err) {
      console.error('خطای خروج از حساب:', err)
      toast.error('خطا در خروج از حساب')
    }
  }

  return (
    <AppContext.Provider
      value={{
        user: currentUser,
        loadingUser,
        setUser: setCurrentUser,
        userDocks: userDocuments,
        loadingUserDocks: loadingUserDocuments,
        cart,
        setCart,
        isInCart,
        loadingCart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        logout: handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
