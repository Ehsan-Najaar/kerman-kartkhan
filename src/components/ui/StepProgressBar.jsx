'use client'

import clsx from 'clsx'

export default function StepProgressBar({
  steps = [],
  currentStep = 1,
  activeColor = 'bg-primary',
  pendingColor = 'bg-gray-300',
  height = 'h-1',
  className = '',
}) {
  return (
    <div className={clsx('flex justify-between', className)}>
      {steps.map((step) => {
        const isActive = step.id <= currentStep

        return (
          <div key={step.id} className="flex flex-col items-center flex-1 px-1">
            <span
              className={clsx(
                'mb-2 text-center font-medium',
                isActive ? 'text-secondary' : 'text-gray-400'
              )}
            >
              {step.label}
            </span>
            <div
              className={clsx(
                'w-full rounded-full',
                height,
                isActive ? activeColor : pendingColor
              )}
            ></div>
          </div>
        )
      })}
    </div>
  )
}
