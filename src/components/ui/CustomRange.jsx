export default function CustomRange({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  direction = 'ltr',
  isDescending = false,
  trackColor = '#ff697c',
  trackBackground = '#ddd',
  thumbSize = 28,
  trackHeight = 12,
  className = '',
  ...rest
}) {
  const percentage = isDescending
    ? ((value - min) * 100) / (max - min)
    : ((value - min) * 100) / (max - min)

  const gradientDirection = isDescending
    ? direction === 'rtl'
      ? 'right'
      : 'left'
    : direction === 'rtl'
    ? 'left'
    : 'right'

  return (
    <>
      <style>{`
        .custom-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: ${trackHeight}px;
          border-radius: ${trackHeight / 2}px;
          background: transparent;
          cursor: pointer;
          direction: ${direction};
        }
        .custom-range::-webkit-slider-runnable-track {
          height: ${trackHeight}px;
          border-radius: ${trackHeight / 2}px;
          background: linear-gradient(to ${gradientDirection}, ${trackColor} 0%, ${trackColor} ${percentage}%, ${trackBackground} ${percentage}%, ${trackBackground} 100%);
        }
        .custom-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: ${thumbSize}px;
          height: ${thumbSize}px;
          background: ${trackColor};
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 4px rgba(0,0,0,0.2);
          margin-top: ${(trackHeight - thumbSize) / 2}px;
          cursor: pointer;
        }
        .custom-range::-moz-range-track {
          height: ${trackHeight}px;
          border-radius: ${trackHeight / 2}px;
          background: linear-gradient(to ${gradientDirection}, ${trackColor} 0%, ${trackColor} ${percentage}%, ${trackBackground} ${percentage}%, ${trackBackground} 100%);
        }
        .custom-range::-moz-range-thumb {
          width: ${thumbSize}px;
          height: ${thumbSize}px;
          background: ${trackColor};
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 4px rgba(0,0,0,0.2);
          cursor: pointer;
        }
      `}</style>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className={`custom-range ${className}`}
        {...rest}
      />
    </>
  )
}
