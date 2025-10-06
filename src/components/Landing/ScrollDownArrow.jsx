'use client'

import { motion, useAnimation } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect } from 'react'
import { fadeIn } from '../../../variants'

export default function ScrollDownArrow() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start('show')
  }, [controls])

  return (
    <motion.div
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      animate={controls}
      className="flex flex-col items-center justify-center pb-4 lg:-mt-14 space-y-4"
    >
      <p className="main-text">کارتخوان تا چه قیمتی میخوای!؟</p>
      <article
        className="-space-y-5 text-section animate-smooth-bounce"
        aria-live="polite"
      >
        <ChevronDown size={32} className="stroke-3" aria-label="Arrow Down" />
        <ChevronDown size={32} className="stroke-3" aria-label="Arrow Down" />
      </article>
    </motion.div>
  )
}
