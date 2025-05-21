import Button from '@/components/ui/Button'
import Link from 'next/link'
import { useState } from 'react'
import {
  FaBookOpen,
  FaChevronUp,
  FaInfo,
  FaInfoCircle,
  FaInstagram,
  FaMapMarkerAlt,
  FaMobile,
  FaPhone,
  FaTelegramPlane,
  FaTimes,
  FaWhatsapp,
} from 'react-icons/fa'

const FooterLink = ({ href, icon, label }) => (
  <Link
    href={href}
    className="flex items-center gap-2 h-10 p-2 bg-lightgray/30 rounded-md cursor-pointer"
  >
    {icon}
    <span>{label}</span>
  </Link>
)

const FooterPageLink = ({ href, label }) => (
  <Link
    href={href}
    className="max-h-9 p-1 bg-lightgray/30 text-center rounded-md cursor-pointer"
  >
    {label}
  </Link>
)

export default function Footer() {
  const [open, setOpen] = useState(false)
  return (
    <footer className="mt-12">
      <section className="bg-light text-dark small-text rounded-4xl border border-lightgray shadow-md overflow-hidden">
        {/* بخش بالایی شامل: برند، دسترسی سریع، صفحات، نمادها */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 gap-8 p-4">
          {/* برند و توضیحات */}
          <div className="lg:w-2/4 lg:h-48 space-y-4 lg:border-l border-lightgray pl-4">
            <div className="flex items-center gap-2 text-primary font-bold text-xl">
              <img
                src="/images/logo.png"
                alt="لوگوی کرمان کارتخوان"
                width={150}
                height={150}
                draggable="false"
              />
            </div>
            <p className="small-text text-justify bg-lightgray/30 p-3 rounded-xl">
              کرمان کارتخوان با ارائه دستگاه‌های پرداخت و خدماتی چون فروش اقساطی
              و مشاوره مالیاتی، به کسب‌وکارها خدمات سریع و امن ارائه می‌دهد.
            </p>
          </div>

          {/* لینک‌های دسترسی سریع */}
          <div className="lg:w-2/4 lg:h-48 space-y-4 lg:border-l border-lightgray pl-4">
            <h3 className="text-primary main-text">دسترسی سریع</h3>
            <ul className="space-y-4 text-sm">
              <FooterLink
                href="/contact"
                icon={<FaPhone size={20} />}
                label="ارتباط با ما"
              />
              <FooterLink
                href="/about"
                icon={<FaInfoCircle size={20} />}
                label="درباره ما"
              />
              <FooterLink
                href="/rules"
                icon={<FaBookOpen size={20} />}
                label="قوانین و مقررات"
              />
            </ul>
          </div>

          {/* صفحات مختلف سایت */}
          <div className="lg:w-2/4 lg:h-48 space-y-4 lg:border-l border-lightgray pl-4">
            <h3 className="text-primary main-text">صفحات</h3>
            <ul className="space-y-[14px] grid grid-cols-2 gap-2">
              <FooterPageLink href="/faq" label="سوالات متداول" />
              <FooterPageLink href="/shop" label="فروشگاه کارتخوان" />
              <FooterPageLink href="/about" label="درباره ما" />
              <FooterPageLink href="/contact-us" label="ارتباط با ما" />
              <FooterPageLink href="/guide" label="راهنما" />
              <FooterPageLink href="/rules" label="قوانین و مقررات" />
            </ul>
          </div>

          {/* نمایش نمادهای اعتماد */}
          <div className="lg:w-1/4 lg:h-48 space-y-4">
            <h3 className="text-primary main-text">نماد ها</h3>
            <div className="flex lg:flex-col gap-3 items-center justify-center">
              <a
                referrerPolicy="origin"
                target="_blank"
                href="https://trustseal.enamad.ir/?id=609824&Code=BnvdJImbxIiAeEeBC3zKmsvRUMsJ0M6V"
              >
                <img
                  referrerPolicy="origin"
                  src="https://trustseal.enamad.ir/logo.aspx?id=609824&Code=BnvdJImbxIiAeEeBC3zKmsvRUMsJ0M6V"
                  alt="نماد"
                  width={70}
                  height={70}
                  className="bg-lightgray/30 rounded-md p-2 cursor-pointer"
                  code="BnvdJImbxIiAeEeBC3zKmsvRUMsJ0M6V"
                />
              </a>

              <img
                src="/images/.png"
                alt="زرین‌پال"
                width={70}
                height={70}
                draggable="false"
                className="bg-lightgray/30 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        {/* بخش میانی شامل اطلاعات تماس و آیکون‌های شبکه‌های اجتماعی */}
        <div className="bg-primary text-light py-5 px-4">
          <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-6">
            {/* شماره تماس */}
            <div
              dir="ltr"
              className="hidden lg:flex items-center gap-2 small-text p-2 bg-light/30 rounded-md"
            >
              <span>034 3272 6099</span>
              <FaPhone size={20} />
            </div>

            <div className="w-full lg:w-max flex items-center justify-between lg:justify-center gap-2">
              <Button
                onClick={() => setOpen(true)}
                variant="light"
                fontWeight="medium"
                size="sm"
                customColor={'bg-light/30 text-white'}
              >
                <FaMapMarkerAlt />
                آدرس تمام شعبه های کرمان کارتخوان
              </Button>

              {open && (
                <div
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center px-4"
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-light w-full max-w-md rounded-xl p-6 relative text-center"
                  >
                    <button
                      onClick={() => setOpen(false)}
                      className="absolute top-3 left-3 text-gray hover:text-dark cursor-pointer"
                    >
                      <FaTimes size={20} />
                    </button>
                    <h3 className="text-xl text-secondary font-bold mb-4 flex items-center gap-2">
                      <FaMapMarkerAlt />
                      لیست آدرس شعبه‌ها
                    </h3>
                    <ul className="text-sm space-y-3 list-disc pr-4 text-dark text-right">
                      <li>
                        <b className="font-semibold">شعبه مرکزی:</b> کرمان،
                        بلوار جهاد، کوچه ۲۳
                      </li>
                      <li>
                        <b className="font-semibold">شعبه زرند:</b> چهار راه
                        مصلی، ابتدای خیابان ولیعصر
                      </li>
                      <li>
                        <b className="font-semibold">شعبه راور:</b> خیابان امام
                        خمینی، نبش کوچه 21
                      </li>
                    </ul>

                    <Link href={'/landing/contact-us'}>
                      <Button
                        variant="secondary"
                        size="sm"
                        fontWeight="medium"
                        outline
                        className="mt-6"
                      >
                        <FaInfo />
                        جزئیات بیشتر
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* آیکون‌های شبکه اجتماعی */}
            <div className="w-full lg:w-max flex items-center justify-between">
              <section
                dir="ltr"
                className="flex lg:hidden items-center gap-2 small-text p-2 bg-light/30 rounded-md ml-8"
              >
                <span>0913 710 1002</span>
                <FaMobile size={20} />
              </section>
              <section className="flex items-center gap-2">
                <a
                  href="https://t.me/kerman.kartkhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="تلگرام"
                  draggable="false"
                  className="bg-light/30 p-3 rounded-md cursor-pointer hover:shadow-sm hover:-mt-2 transition-all duration-300"
                >
                  <FaTelegramPlane size={20} />
                </a>
                <a
                  href="https://instagram.com/kerman.kartkhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="اینستاگرام"
                  draggable="false"
                  className="bg-light/30 p-3 rounded-md cursor-pointer hover:shadow-sm hover:-mt-2 transition-all duration-300"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://wa.me/989137131002"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="واتساپ"
                  draggable="false"
                  className="bg-light/30 p-3 rounded-md cursor-pointer hover:shadow-sm hover:-mt-2 transition-all duration-300"
                >
                  <FaWhatsapp size={20} />
                </a>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* دکمه برای اسکرول به بالای صفحه */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="lg:fixed left-8 bottom-8 p-3 bg-light/30 rounded-md cursor-pointer transition-all duration-500 ease-in-out"
      >
        <FaChevronUp size={20} />
      </button>

      {/* کپی‌رایت پایین سایت */}
      <div className="text-center text-xs py-3 text-dark/60">
        © تمامی حقوق برای کرمان کارتخوان محفوظ است.
      </div>
    </footer>
  )
}
