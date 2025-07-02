import { Eye, UploadCloud } from 'lucide-react'
import Image from 'next/image'
import { FiTrash2 } from 'react-icons/fi'

export default function DocCard({
  imageSrc,
  label,
  name,
  mode = 'summary',
  file,
  setPreviewImage,
  removeFile,
  handleChange,
}) {
  return (
    <div
      className={`relative w-44 h-44  ${
        mode !== 'summary' ? '' : 'border-2 border-dashed'
      } border-gray-300 rounded-lg overflow-hidden bg-white flex items-center justify-center group`}
    >
      {imageSrc ? (
        <>
          <Image
            src={imageSrc}
            alt={label}
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />

          {mode === 'upload' && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex gap-2 items-center justify-center">
              <button
                type="button"
                onClick={() => setPreviewImage(imageSrc)}
                className="bg-white p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
              >
                <Eye size={20} className="text-gray-800" />
              </button>
              <button
                type="button"
                onClick={() => removeFile(name)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 cursor-pointer"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          )}

          {mode === 'summary' && (
            <button
              onClick={() => setPreviewImage(imageSrc)}
              className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded hover:bg-opacity-75 cursor-pointer"
              aria-label={`نمایش بزرگ ${label}`}
              type="button"
            >
              <Eye size={20} />
            </button>
          )}

          <p className="absolute bottom-0 left-0 right-0 p-2 bg-bg text-center text-dark text-xs truncate">
            {label}
          </p>
        </>
      ) : (
        <>
          {mode === 'upload' ? (
            <label
              htmlFor={name}
              className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
            >
              <UploadCloud size={32} className="text-gray-400" />
              <span className="text-sm text-center text-gray-600 mt-2">
                {label} را آپلود کنید
              </span>
              <input
                id={name}
                name={name}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="text-gray-400 text-xs">بدون تصویر</div>
          )}
        </>
      )}
    </div>
  )
}
