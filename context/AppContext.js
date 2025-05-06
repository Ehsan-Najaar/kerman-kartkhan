import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: '',
    type: '',
    isVisible: false,
    duration: 5000, // مدت زمان نمایش Toast
    timeLeft: 5000, // زمان باقی‌مانده
  })

  const showToast = (message, type) => {
    const duration = 5000 // مدت زمان دلخواه برای نمایش Toast

    setToast((prev) => ({
      message,
      type,
      isVisible: true,
      duration,
      timeLeft: duration,
    }))

    // تایمر کاهش زمان
    const timer = setInterval(() => {
      setToast((prev) => {
        if (prev.timeLeft <= 0) {
          clearInterval(timer)
          return { ...prev, isVisible: false }
        }
        return { ...prev, timeLeft: prev.timeLeft - 100 }
      })
    }, 100)

    // پاک کردن تایمر در صورت unmount شدن
    return () => clearInterval(timer)
  }

  return (
    <AppContext.Provider
      value={{
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
