'use client'

import Image from 'next/image'
import { FiPlus, FiRefreshCcw, FiTrash2 } from 'react-icons/fi'

function ProductImagesUploader({
  imageFiles,
  setImageFiles,
  videoFile,
  setVideoFile,
}) {
  const handleImageSelection = (e, replaceIndex = null) => {
    const files = Array.from(e.target.files)
    if (!files.length) return

    if (replaceIndex !== null) {
      const updated = [...imageFiles]
      updated[replaceIndex] = files[0]
      setImageFiles(updated)
    } else {
      if (imageFiles.length + files.length > 4)
        return alert('حداکثر ۴ تصویر مجاز است')
      setImageFiles([...imageFiles, ...files.slice(0, 4 - imageFiles.length)])
    }
  }

  const handleRemoveImage = (index) => {
    const updated = [...imageFiles]
    updated.splice(index, 1)
    setImageFiles(updated)
  }

  const handleVideoSelection = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setVideoFile(file)
  }

  const handleRemoveVideo = () => {
    setVideoFile(null)
  }

  return (
    <div className="max-w-max border-l border-lightgray pl-4 space-y-6">
      {/* ویدیو */}
      <div className="w-28 h-28 relative group rounded-lg border-2 border-dashed border-yellow-500 overflow-hidden">
        {videoFile ? (
          <>
            <video
              src={URL.createObjectURL(videoFile)}
              controls
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition">
              <label
                htmlFor="videoUpload"
                className="cursor-pointer p-2 bg-light rounded-full"
              >
                <FiRefreshCcw size={20} />
              </label>
              <button
                type="button"
                onClick={handleRemoveVideo}
                className="cursor-pointer p-2 bg-light rounded-full"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          </>
        ) : (
          <label
            htmlFor="videoUpload"
            className="w-full h-full flex flex-col items-center justify-center text-yellow-500 cursor-pointer"
          >
            <FiPlus size={40} />
            <span className="text-sm">ویدیو</span>
          </label>
        )}

        <input
          type="file"
          id="videoUpload"
          className="hidden"
          onChange={handleVideoSelection}
          accept="video/*"
        />
      </div>

      <div className="h-px w-full bg-lightgray"></div>

      {/* تصاویر */}
      <div className="lg:flex lg:flex-col grid grid-cols-2 sm:grid-cols-4 items-center gap-2">
        {imageFiles.map((file, index) => (
          <div key={index} className="relative group">
            <Image
              src={typeof file === 'string' ? file : URL.createObjectURL(file)}
              alt="Selected Image"
              width={112}
              height={112}
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-black/50 opacity-0 group-hover:opacity-100 transition">
              <label
                htmlFor={`replace-${index}`}
                className="cursor-pointer p-2 bg-light rounded-full"
              >
                <FiRefreshCcw size={20} />
              </label>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="cursor-pointer p-2 bg-light rounded-full"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
            <input
              type="file"
              accept="image/*"
              id={`replace-${index}`}
              className="hidden"
              onChange={(e) => handleImageSelection(e, index)}
            />
          </div>
        ))}

        {imageFiles.length < 4 && (
          <label
            htmlFor="imageUpload"
            className="w-28 h-28 rounded-lg flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 cursor-pointer"
          >
            <FiPlus size={40} />
            <span className="text-sm">تصویر</span>
          </label>
        )}

        <input
          type="file"
          id="imageUpload"
          className="hidden"
          onChange={handleImageSelection}
          accept="image/*"
        />
      </div>
    </div>
  )
}

export default ProductImagesUploader
