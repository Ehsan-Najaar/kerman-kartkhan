import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

const documents = [
  {
    title: 'شماره تلفن به نام خود',
    icon: '/images/mobile.png',
  },
  {
    title: 'برگه مالیاتی',
    icon: '/images/document.png',
  },
  {
    title: 'جواز کسب و کار',
    icon: '/images/license.png',
    optional: true, // اضافه کردن فیلد optional برای "الزامی نیست"
  },
  {
    title: 'تصاویر کارت ملی و شناسنامه',
    icon: '/images/user-id.png',
  },
  {
    title: 'شماره شبا یا حساب بانکی',
    icon: '/images/card.png',
  },
]

export default function RequiredDocuments() {
  return (
    <div
      id="RequiredDocuments"
      className="relative flex flex-col items-center justify-center"
    >
      {/* title */}
      <div className="flex flex-col items-center justify-center pb-12 space-y-4 p-4 xl:p-0">
        <p className="title-text text-center">
          موارد مورد نیاز برای دریافت کارتخوان
        </p>
        <article className="-space-y-5 text-section animate-smooth-bounce">
          <ChevronDown size={32} className="stroke-3" />
          <ChevronDown size={32} className="stroke-3" />
        </article>
      </div>

      {/* list of documents */}
      <div className="w-full xl:w-max overflow-x-auto p-4 xl:overflow-visible">
        <div className="flex gap-6 flex-nowrap min-w-max">
          {documents.map((doc) => (
            <div
              key={doc.title} // استفاده از title به عنوان key
              className={`w-52 h-40 flex-shrink-0 flex flex-col items-center justify-center gap-4 p-4 bg-light rounded-2xl shadow-md hover:shadow-lg transition ${
                doc.optional ? 'xl:mt-6' : ''
              }`}
            >
              <Image src={doc.icon} alt={doc.title} width={72} height={72} />
              <span className="main-text text-dark text-center">
                {doc.title}
              </span>
              {/* نمایش متن "الزامی نیست" */}
              {doc.optional && (
                <span className="small-text text-gray -mt-3">
                  (الزامی نیست)
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -right-80 -z-10 opacity-10 blur-[3px]">
        <Image
          src={'/images/browser-tab-logo.png'}
          alt=""
          width={400}
          height={400}
        />
      </div>
    </div>
  )
}
