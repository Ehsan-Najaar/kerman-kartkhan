import Link from 'next/link'
import {
  FaChevronUp,
  FaInstagram,
  FaMapMarkerAlt,
  FaMobile,
  FaTelegramPlane,
  FaWhatsapp,
} from 'react-icons/fa'

export default function Footer() {
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
                loading="lazy"
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
            <ul className="space-y-[14px] grid grid-cols-2 gap-2">
              <li>
                <Link
                  href="/faq"
                  draggable="false"
                  aria-label="سوالات متداول"
                  className="max-h-9 p-1 bg-lightgray/30 text-center rounded-md cursor-pointer"
                >
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  draggable="false"
                  aria-label="فروشگاه کارتخوان"
                  className="max-h-9 p-1 bg-lightgray/30 text-center rounded-md cursor-pointer"
                >
                  فروشگاه کارتخوان
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  draggable="false"
                  aria-label="درباره ما"
                  className="max-h-9 p-1 bg-lightgray/30 text-center rounded-md cursor-pointer"
                >
                  درباره ما
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  draggable="false"
                  aria-label="ارتباط با ما"
                  className="max-h-9 p-1 bg-lightgray/30 text-center rounded-md cursor-pointer"
                >
                  ارتباط با ما
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  draggable="false"
                  aria-label="راهنما"
                  className="max-h-9 p-1 bg-lightgray/30 text-center rounded-md cursor-pointer"
                >
                  راهنما
                </Link>
              </li>
              <li>
                <Link
                  href="/rules"
                  draggable="false"
                  aria-label="قوانین و مقررات"
                  className="max-h-9 p-1 bg-lightgray/30 text-center rounded-md cursor-pointer"
                >
                  قوانین و مقررات
                </Link>
              </li>
            </ul>
          </div>

          {/* صفحات مختلف سایت */}
          <div className="lg:w-2/4 lg:h-48 space-y-4 lg:border-l border-lightgray pl-4">
            <h3 className="text-primary main-text">صفحات</h3>
            <ul className="space-y-[14px] grid grid-cols-2 gap-2">
              <li>
                <Link
                  href="/faq"
                  draggable="false"
                  aria-label="سوالات متداول"
                  className="max-h-9 p-1 bg-lightgray/30 text-center rounded-md cursor-pointer"
                >
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  draggable="false"
                  aria-label="فروشگاه کارتخوان"
                  className="max-h-9 p-1 bg-lightgray/30 text-center rounded-md cursor-pointer"
                >
                  فروشگاه کارتخوان
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  draggable="false"
                  aria-label="درباره ما"
                  className="max-h-9 p-1 bg-lightgray/30 text-center rounded-md cursor-pointer"
                >
                  درباره ما
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  draggable="false"
                  aria-label="ارتباط با ما"
                  className="max-h-9 p-1 bg-lightgray/30 text-center rounded-md cursor-pointer"
                >
                  ارتباط با ما
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  draggable="false"
                  aria-label="راهنما"
                  className="max-h-9 p-1 bg-lightgray/30 text-center rounded-md cursor-pointer"
                >
                  راهنما
                </Link>
              </li>
              <li>
                <Link
                  href="/rules"
                  draggable="false"
                  aria-label="قوانین و مقررات"
                  className="max-h-9 p-1 bg-lightgray/30 text-center rounded-md cursor-pointer"
                >
                  قوانین و مقررات
                </Link>
              </li>
            </ul>
          </div>

          {/* نمایش نمادهای اعتماد */}
          <div className="lg:w-1/4 lg:h-48 space-y-4">
            <h3 className="text-primary main-text">نماد ها</h3>
            <div className="flex lg:flex-col gap-3 items-center justify-center">
              <img
                src="/images/enamad.png"
                alt="نماد اعتماد الکترونیکی"
                width={70}
                height={70}
                draggable="false"
                className="bg-lightgray/30 rounded-md p-2"
              />
              <img
                src="/images/zarinpall.png"
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
              <span>0913 710 1002</span>
              <FaMobile size={20} />
            </div>

            <div className="w-full lg:w-max flex items-center justify-between lg:justify-center gap-2">
              {/* آدرس فیزیکی شرکت */}
              <div className="flex items-center gap-2 small-text p-2 bg-light/30 rounded-md">
                <FaMapMarkerAlt size={20} />
                کرمان، بلوار جهاد، کوچه ۲۳
              </div>

              {/* دکمه برای اسکرول به بالای صفحه */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="ml-1 p-3 bg-light/30 rounded-md cursor-pointer transition-all duration-500 ease-in-out"
                aria-label="بازگشت به بالا"
              >
                <FaChevronUp size={20} />
              </button>
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

      {/* کپی‌رایت پایین سایت */}
      <div className="text-center text-xs py-3 text-dark/60">
        © تمامی حقوق برای کرمان کارتخوان محفوظ است.
      </div>
    </footer>
  )
}
