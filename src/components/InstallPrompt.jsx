'use client'

import { useEffect, useState } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)

      // بعد از 15 ثانیه toast رو مخفی کن
      setTimeout(() => {
        setShowInstall(false)
      }, 15000)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted install')
        } else {
          console.log('User dismissed install')
        }
      })
      setShowInstall(false)
    }
  }

  return (
    <>
      {showInstall && (
        <div
          onClick={handleInstall}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#ff697c',
            color: '#fff',
            padding: '1rem 2rem',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            transition: 'opacity 0.3s ease-in-out',
            zIndex: 9999,
          }}
        >
          اپلیکیشن را نصب کنید!
        </div>
      )}
    </>
  )
}
