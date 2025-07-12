import AddressModal from '@/components/shop/userDashboard/AddressModal'
import Button from '@/components/ui/Button'
import { useAppContext } from '@/context/AppContext'
import { MapPin, Plus, Signpost } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FaRoad } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'

export default function UserAddresses() {
  const { user, setUser } = useAppContext()
  const [isOpen, setIsOpen] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user || user.address) return // اگه آدرس داره یا user نیست، کاری نکن

    setLoading(true)
    fetch(`/api/user/${user.userId}`) // فرض کردم API شما این مسیر رو داره
      .then((res) => res.json())
      .then((fullUser) => {
        setUser(fullUser) // داده کامل کاربر رو توی کانتکست ست کن
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [user, setUser])

  if (!user) return <p>لطفا وارد شوید.</p>
  if (loading) return <p>در حال بارگذاری اطلاعات کاربر...</p>

  // بقیه کد کامپوننت مثل قبل

  const handleEdit = (index) => {
    setEditIndex(index)
    setIsOpen(true)
  }

  const handleAdd = () => {
    setEditIndex(null)
    setIsOpen(true)
  }

  return (
    <div className="h-96 lg:h-auto lg:w-4/5 bg-light text-dark rounded-2xl lg:p-6 p-4 flex flex-col items-center lg:shadow lg:border border-lightgray/35">
      <div className="w-full max-w-3xl">
        {user?.address?.length === 0 && (
          <div className="flex flex-col items-center gap-4">
            <p className="mt-28 text-center">شما هنوز آدرسی ثبت نکرده‌اید.</p>
            {user?.address?.length < 3 && (
              <Button
                onClick={handleAdd}
                variant="primary"
                fontWeight="medium"
                size="sm"
              >
                افزودن آدرس جدید
                <Plus size={18} />
              </Button>
            )}
          </div>
        )}

        {user?.address?.map((addr, i) => (
          <div
            key={i}
            className="border border-lightgray p-4 rounded-md mb-4 flex flex-col lg:flex-row justify-between items-center"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-gray-600" />
                <span className="text-black font-medium">شهر:</span>
                <span className="text-gray-500">{addr.city || '-'}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaRoad size={18} className="text-gray-600" />
                <span className="text-black font-medium">خیابان:</span>
                <span className="text-gray-500">{addr.street || '-'}</span>
              </div>

              <div className="flex items-center gap-2">
                <Signpost size={18} className="text-gray-600" />
                <span className="text-black font-medium">کد پستی:</span>
                <span className="text-gray-500">{addr.postalCode || '-'}</span>
              </div>
            </div>
            <div className="w-full lg:w-max flex justify-end mt-4 lg:mt-0">
              <Button onClick={() => handleEdit(i)} variant="ghost" size="sm">
                ویرایش
                <FiEdit size={17} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {user?.address?.length > 0 && user.address.length < 3 && (
        <Button
          onClick={handleAdd}
          variant="primary"
          fontWeight="medium"
          size="sm"
          className="mb-4"
        >
          افزودن آدرس جدید
          <Plus size={18} />
        </Button>
      )}

      <AddressModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        editIndex={editIndex}
      />
    </div>
  )
}
