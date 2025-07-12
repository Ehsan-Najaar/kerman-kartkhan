import { useAppContext } from '@/context/AppContext'
import { ListChecks, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FiEdit, FiLogOut, FiMap, FiSettings } from 'react-icons/fi'

export default function DashboardPanelNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAppContext()

  const Tabs = [
    {
      name: 'ویرایش اطلاعات',
      icon: <FiEdit size={24} />,
      route: '/shop/dashboard/edit-account',
    },
    {
      name: 'سفارشات من',
      icon: <ListChecks size={24} />,
      route: '/shop/dashboard/my-orders',
    },
    {
      name: 'آدرس ها',
      icon: <FiMap size={24} />,
      route: '/shop/dashboard/my-addresses',
    },
    // نمایش گزینه "پنل ادمین" فقط برای کاربران ادمین
    ...(user?.roles?.includes('admin')
      ? [
          {
            name: 'پنل ادمین',
            icon: <FiSettings size={24} />,
            route: '/admin/products',
          },
        ]
      : []),

    {
      name: 'خروج از حساب کاربری',
      icon: <FiLogOut size={24} />,
      action: async () => {
        await logout()
        toast.success('شما با موفقیت از حساب خود خارج شدید.')
        router.push('/')
      },
    },
  ]

  return (
    <div
      className={`${
        pathname.startsWith('/dashboard/edit-account') ||
        pathname.startsWith('/dashboard/addresses') ||
        pathname.startsWith('/dashboard/my-orders')
          ? 'hidden lg:flex'
          : ''
      } 
         lg:h-[440px] lg:w-[250px] bg-light text-dark rounded-2xl flex flex-col items-center p-4 lg:shadow lg:border border-lightgray/35`}
    >
      <figure className="p-4 bg-bg rounded-full mb-4">
        <User size={40} />
      </figure>

      <nav className="w-full space-y-4">
        {Tabs.map((item, index) =>
          item.route ? (
            <Link
              key={index}
              href={item.route}
              className={`flex items-center gap-2 p-3 w-full rounded-lg transition border border-lightgray/35 bg-bg ${
                pathname === item.route
                  ? 'bg-secondary text-light'
                  : 'lg:bg-transparent hover:bg-bg hover:pr-6 transition-all duration-300'
              }`}
            >
              {item.icon}
              <span className="body-text">{item.name}</span>
            </Link>
          ) : (
            <button
              key={index}
              onClick={item.action}
              className="flex items-center gap-2 p-3 w-full rounded-lg bg-bg border border-red-500 text-red-500 hover:pr-6 transition-all duration-300 cursor-pointer"
            >
              {item.icon}
              <span className="body-text">{item.name}</span>
            </button>
          )
        )}
      </nav>
    </div>
  )
}
