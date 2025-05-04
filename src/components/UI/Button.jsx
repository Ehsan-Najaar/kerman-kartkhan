'use client'

import clsx from 'clsx'

export default function Button({
  children,
  variant = 'primary',
  outline = false,
  fullWidth = false,
  size = 'md',
  iconLeft = null,
  iconRight = null,
  className = '',
  customColor,
  hoverColor,
  ...props
}) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 cursor-pointer',
        {
          'bg-primary text-light hover:bg-secondary':
            variant === 'primary' && !outline,
          'bg-secondary text-light hover:bg-primary':
            variant === 'secondary' && !outline,
          'bg-light text-dark': variant === 'light' && !outline,
          'border-2 border-light text-light hover:bg-light hover:text-dark':
            variant === 'light' && outline,
          'border-2 border-primary text-primary hover:bg-primary hover:text-light':
            variant === 'primary' && outline,
          'border-2 border-secondary text-secondary hover:bg-secondary hover:text-light':
            variant === 'secondary' && outline,
          'w-full': fullWidth,
          'px-4 py-2 small-text': size === 'sm',
          'px-6 py-3 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
          // افزودن کلاس رنگ سفارشی
          [customColor]: customColor,
          // افزودن کلاس رنگ هاور اگر پراپ hoverColor وجود داشته باشد
          [hoverColor && `hover:${hoverColor}`]: hoverColor,
        },
        className
      )}
      {...props}
    >
      {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
      {children}
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </button>
  )
}
