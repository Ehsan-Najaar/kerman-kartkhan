import { useEffect, useState } from 'react'
import { FaChevronUp } from 'react-icons/fa'

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`hidden lg:block fixed left-8 bottom-8 p-3 bg-light rounded-md cursor-pointer transition-transform duration-300 ease-in-out
        ${showButton ? 'scale-100' : 'scale-0'} `}
    >
      <FaChevronUp size={20} />
    </button>
  )
}

export default ScrollToTopButton
