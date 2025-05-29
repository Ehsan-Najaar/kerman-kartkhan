'use client'

import Footer from '@/components/Footer'
import LandingHeaderPage from '@/components/Landing/LandingHeaderPage'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

export default function AbouutUs() {
  return (
    <div className="space-y-12">
      <LandingHeaderPage />

      {/* title */}
      <div className="flex flex-col items-center justify-center pb-12 space-y-4 p-4 xl:p-0">
        <p className="title-text text-center">درباره ما</p>
        <article className="-space-y-5 text-section animate-smooth-bounce">
          <ChevronDown size={32} className="stroke-3" />
          <ChevronDown size={32} className="stroke-3" />
        </article>
      </div>

      <section className="flex gap-4 space-y-12">
        <Image
          src={'/images/undraw/undraw_about-us-page_dbh0.svg'}
          alt="aboutus"
          width={500}
          height={500}
          property="true"
          className="mx-auto"
        />
        <article className="space-y-4">
          <Image
            src={'/images/logo.png'}
            alt="aboutus"
            width={200}
            height={200}
            property="true"
            className="mx-auto"
          />
          <p className="text-justify leading-8 text-gray">
            مجموعه کرمان کارتخوان با بیش از ۱۰ سال سابقه درخشان در
            توزیع،تعمیر،پشتیبانی و خدمات پس از فروش انواع کارتخوان ، دستگاه های
            کشلس و عابر بانک های موجود در بازار ، و با بهره مندی از سه شعبهی
            فعال در کرمان ، راور و زرند، همچنین چندین نمایندگی در شهرستان های بم
            ، جیرفت ، کهنوج و کوهبنان ، موفق شده است بیش از ۳۰ درصد از سهم بازار
            استان کرمان رو به خود اختصاص دهد. این موفقیت تنها با اعتماد و حمایت
            هم استانی های عزیز و اصناف محترم استان محقق شده است.
          </p>
          <h3 className="text-center">
            با تشکر از اعتماد شما مدیریت مجموعه کرمان کارتخوان
          </h3>
        </article>
      </section>

      <Footer />
    </div>
  )
}
