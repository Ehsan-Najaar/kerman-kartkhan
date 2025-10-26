'use client'

import BlogHeroSecScroller from '@/components/blog/BlogHeroSecScroller'
import BlogPageHeader from '@/components/blog/BlogPageHeader'
import BlogsList from '@/components/blog/BlogsList'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function BlogClient({ blogs }) {
  return (
    <div className="relative min-h-screen bg-light pt-28">
      <div className="absolute -top-96 -left-12 blur-[1800px] w-[1400px] h-[900px] bg-section/50 rounded-full noise-background z-10"></div>

      <BlogPageHeader />

      <section
        id="top"
        className="flex flex-col items-center justify-center gap-4 relative z-40"
      >
        <p className="flex items-center justify-center gap-1">
          <Image
            src={'/icons/custom/Home-blog.svg'}
            alt="آیکون خانه"
            width={24}
            height={24}
            className="ml-1 mb-1"
          />
          <span className="text-gray text-lg">خانه</span>
          <span className="text-gray text-lg">/</span>
          <span className="text-dark font-medium text-lg">مقالات</span>
        </p>

        <h1 className="font-bold text-6xl text-center">
          پرداخت سریع ، <br /> ساده & امن
        </h1>

        <p className="max-w-1/3 text-gray-700 text-center">
          با کارتخوان‌ها و راهکارهای کش‌لس ما، پرداخت‌های شما سریع، ساده و
          کاملاً امن انجام می‌شوند، بدون هیچ دغدغه‌ای.
        </p>
      </section>

      <BlogHeroSecScroller />

      <BlogsList blogs={blogs} />

      <div className="px-24">
        <Footer />
      </div>
    </div>
  )
}
