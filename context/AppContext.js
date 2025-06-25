'use client'

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
    console.log('item to add:', item)
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization حذف شد
      },
      body: JSON.stringify(item),
    })
    toast.success('محصول به سبد خرید شما افزوده شد.')

    if (!res.ok) {
      console.log('خطا در افزودن به سبد خرید:', await res.text())
      return
    }

    const updated = await res.json()
    setCart(updated)
  }

  const removeFromCart = async (item) => {
    const res = await fetch('/api/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Authorization حذف شد
      },
      body: JSON.stringify(item),
    })

    if (!res.ok) {
      console.log('خطا در حذف از سبد خرید:', await res.text())
      return
    }

    const updated = await res.json()
    setCart(updated)
  }

  return (
    <AppContext.Provider
      value={{
        user: currentUser,
        setUser: setCurrentUser,
        cart,
        loadingCart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
