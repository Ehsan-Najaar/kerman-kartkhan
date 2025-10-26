'use client'

import moment from 'moment-jalaali'
import Image from 'next/image'
import { CalendarBlank } from 'phosphor-react'

export default function BlogsList({ blogs }) {
  return (
    <div className="px-24 py-24">
      <h1 className="font-semibold text-2xl mb-6">مقالات ما</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex flex-col bg-light border border-lightgray rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            {/* تصویر کاور */}
            <Image
              src={blog.coverImage}
              alt="تصویر مقاله"
              width={400}
              height={200}
              className="w-full h-40 object-cover rounded-t-xl"
            />

            {/* محتوای کارت */}
            <div className="flex flex-col flex-grow justify-between p-4">
              <div className="flex flex-col gap-2">
                <p className="font-semibold line-clamp-2 leading-snug">
                  {blog.title}
                </p>
                <small className="text-gray text-sm line-clamp-3 leading-relaxed">
                  {blog.description}
                </small>
              </div>

              <div className="flex items-center text-gray text-sm gap-1 mt-3">
                <CalendarBlank size={18} />
                {moment(blog.createdAt).format('jYYYY/jMM/jDD')}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
