import Button from '@/components/ui/Button'

export default function ConfirmDialog({
  isOpen,
  title = 'تایید',
  message = 'آیا مطمئن هستید؟',
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-dark/70 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-700">{message}</p>

        <div className="flex justify-end gap-3">
          <Button onClick={onCancel} variant="ghost" fontWeight="medium">
            لغو
          </Button>

          <Button
            onClick={onConfirm}
            variant="light"
            fontWeight="medium"
            customColor={'bg-red-500 text-white'}
          >
            حذف کن
          </Button>
        </div>
      </div>
    </div>
  )
}
