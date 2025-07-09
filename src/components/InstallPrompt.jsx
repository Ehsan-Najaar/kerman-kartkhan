'use client'

import { useEffect, useState } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)
    })
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
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#ff697c',
            color: '#fff',
            padding: '1rem',
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={handleInstall}
        >
          اپلیکیشن را نصب کنید!
        </div>
      )}
    </>
  )
}
