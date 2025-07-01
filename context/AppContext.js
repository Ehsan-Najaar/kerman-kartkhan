'use client'

import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const AppContext = createContext({
  user: null,
  setUser: () => {},
  cart: { items: [] },
  loadingCart: false,
  addToCart: () => {},
  removeFromCart: () => {},
})

export function useAppContext() {
  return useContext(AppContext)
}

export default function AppContextProvider({ user = null, children }) {
  const [currentUser, setCurrentUser] = useState(user)
  const router = useRouter()

  // ---------------- Cart State ----------------
  const [cart, setCart] = useState({ items: [] })
  const [loadingCart, setLoadingCart] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch('/api/cart') // header حذف شد
        const data = await res.json()

        if (!Array.isArray(data.items)) {
          setCart({ items: [] })
        } else {
          setCart(data)
        }
      } catch (e) {
        setCart({ items: [] })
      } finally {
        setLoadingCart(false)
      }
    }

    fetchCart()
  }, [])

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
    quantity,
  }) => {
    const res = await fetch('/api/cart', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId,
        selectedColor,
        selectedVariant,
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

  return (
    <AppContext.Provider
      value={{
        user: currentUser,
        setUser: setCurrentUser,
        cart,
        loadingCart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
