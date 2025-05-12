import Image from 'next/image'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

export default function CategoryItem({ category, handleEdit, handleDelete }) {
  return (
    <li className="flex justify-between items-center py-4 border-b border-gray-300">
      <div className="flex items-center space-x-4">
        {/* استفاده از کامپوننت Image برای بهینه‌سازی بارگذاری تصویر */}
        {category.image && (
          <figure className="w-20 h-20 rounded-lg overflow-hidden">
            <Image
              src={category.image}
              alt={category.title}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </figure>
        )}
        <p className="flex flex-col">
          <span className="text-lg">{category.title}</span>
          <span className="small-text text-gray">{category._id}</span>
        </p>
      </div>
      <div className="flex items-center gap-2 text-gray">
        <button
          onClick={() => handleEdit(category)}
          className="p-3 bg-lightgray rounded-md cursor-pointer hover:text-dark transition duration-200"
        >
          <FaEdit size={20} />
        </button>
        <button
          onClick={() => handleDelete(category._id)}
          className="p-3 bg-lightgray rounded-md cursor-pointer hover:text-red-500 transition duration-200"
        >
          <FaTrashAlt size={20} />
        </button>
      </div>
    </li>
  )
}
