'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi'

export default function ArticleAccordion({ articles, onEdit, onDelete }) {
  const [openId, setOpenId] = useState(null)

  const toggleArticle = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="space-y-3">
      {articles.map((article) => (
        <div
          key={article._id}
          className="border border-lightgray rounded-xl py-4 px-6 shadow-sm transition-all"
        >
          {/* Header */}
          <div
            onClick={() => toggleArticle(article._id)}
            className="flex justify-between items-center cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Image
                src={article.coverImage || '/images/default-thumb.jpg'}
                alt="تصویر مقاله"
                width={72}
                height={72}
                className="rounded-md object-cover w-16 h-16"
              />
              <div className="flex flex-col justify-between">
                <p className="font-semibold text-dark text-base">
                  {article.title}
                </p>
                <small className="text-gray-500">{article.description}</small>
                <small className="space-x-2 text-[8px] mt-2 text-gray-500">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 py-px px-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </small>
              </div>
            </div>

            <div className="w-32 flex items-center justify-end gap-4">
              <small
                className={`py-1 px-3 rounded text-xs ${
                  article.published
                    ? 'bg-green-50 text-green-400'
                    : 'bg-red-50 text-red-400'
                }`}
              >
                {article.published ? 'منتشر شده' : 'منتشر نشده'}
              </small>

              <FiPlus
                className={`text-gray-500 transition-transform duration-300 ${
                  openId === article._id ? 'rotate-45' : ''
                }`}
                size={20}
              />
            </div>
          </div>

          {/* Content */}
          <AnimatePresence initial={false}>
            {openId === article._id && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.2, ease: 'linear' }}
                className="overflow-hidden"
              >
                <div className="px-2 pb-2 pt-8 text-gray-700 leading-relaxed text-sm">
                  <p>{article.content}</p>
                </div>

                <div className="flex gap-2 my-4 items-center justify-end">
                  <button
                    onClick={() => onEdit(article)}
                    className="p-2 text-gray rounded-lg cursor-pointer border border-lightgray bg-lightgray/35 hover:text-dark hover:border-gray transition-all duration-300"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    onClick={() => {
                      onDelete(article._id)
                    }}
                    className="p-2 text-gray rounded-lg cursor-pointer border border-lightgray bg-lightgray/35 hover:text-red-500 hover:border-red-500 transition-all duration-300"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </section>
  )
}
