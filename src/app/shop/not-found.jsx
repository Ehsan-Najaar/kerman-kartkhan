import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function ShopNotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6 md:gap-8">
        {/* تصویر 404 */}
        <div className="w-64 h-64 md:w-[492px] md:h-[492px]">
          <img
            src="/images/undraw/undraw_page-not-found_6wni.svg"
            alt="Page not found"
            className="w-full h-full object-contain"
          />
        </div>

        {/* متن و دکمه */}
        <div className="space-y-12 md:space-y-24 text-center">
          <div className="space-y-2">
            <h3 className="text-lg md:text-xl font-semibold">
              متأسفیم! صفحه‌ای که به دنبال آن هستید، وجود ندارد.
            </h3>
            <p className="small-text text-gray">
              ممکن است آدرس را اشتباه وارد کرده باشید یا صفحه حذف شده باشد.
            </p>
          </div>
          <Link href="/">
            <Button variant="secondary" fontWeight="medium">
              بازگشت به صفحه اصلی
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
