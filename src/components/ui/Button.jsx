import clsx from 'clsx'

export default function Button({
  children,
  variant = 'primary',
  outline = false,
  fullWidth = false,
  size = 'md',
  fontWeight = 'semibold',
  iconLeft = null,
  iconRight = null,
  className = '',
  customColor,
  hoverColor,
  ...props
}) {
  const isPrimaryGradient = variant === 'primary' && !outline

  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-300 cursor-pointer',
        {
          // حذف کلاس bg-primary وقتی گرادیانت داریم
          'text-light hover:bg-secondary': isPrimaryGradient,
          'bg-secondary text-light hover:bg-primary':
            variant === 'secondary' && !outline,
          'bg-light text-secondary': variant === 'light' && !outline,
          'border-2 border-light text-light hover:bg-light hover:text-secondary':
            variant === 'light' && outline,
          'border-2 border-primary text-primary hover:bg-primary hover:text-light':
            variant === 'primary' && outline,
          'border-2 border-secondary text-secondary hover:bg-secondary hover:text-light':
            variant === 'secondary' && outline,
          'bg-lightgray text-dark hover:bg-gray-200': variant === 'ghost',

          'w-full': fullWidth,
          'px-4 py-2 small-text': size === 'sm',
          'px-6 py-3 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',

          // فونت وزن
          'font-light': fontWeight === 'light',
          'font-normal': fontWeight === 'normal',
          'font-medium': fontWeight === 'medium',
          'font-semibold': fontWeight === 'semibold',
          'font-bold': fontWeight === 'bold',
        },
        customColor,
        className
      )}
      style={
        isPrimaryGradient
          ? {
              background: `linear-gradient(to left, var(--color-primary), var(--color-secondary))`,
            }
          : {}
      }
      {...props}
    >
      {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
      {children}
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </button>
  )
}
