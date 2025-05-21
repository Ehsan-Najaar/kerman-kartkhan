import Image from 'next/image'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

export default function CategoryItem({ category, handleEdit, handleDelete }) {
  return (
    <li className="flex flex-col sm:flex-row justify-between sm:items-center py-4 border-b border-gray-300 last:border-b-0">
      <div className="flex items-center space-x-4">
        {category.image && (
          <figure className="sm:w-20 sm:h-20 rounded-lg overflow-hidden">
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
      <div className="w-full sm:w-max flex justify-end sm:items-center gap-2 text-gray">
        <button
          onClick={() => handleEdit(category)}
          className="p-2 text-gray rounded-lg cursor-pointer border border-lightgray bg-lightgray/35 hover:text-dark hover:border-gray transition-all duration-300"
        >
          <FiEdit size={20} />
        </button>
        <button
          onClick={() => handleDelete(category._id)}
          className="p-2 text-gray rounded-lg cursor-pointer border border-lightgray bg-lightgray/35 hover:text-red-500 hover:border-red-500 transition-all duration-300"
        >
          <FiTrash2 size={20} />
        </button>
      </div>
    </li>
  )
}
