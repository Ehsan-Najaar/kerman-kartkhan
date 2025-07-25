import Image from 'next/image'
import Link from 'next/link'

export default function BannersSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 px-4 md:px-12 lg:px-24 md:pt-10 lg:pt-12">
      {/* big banner */}
      <section className="w-full lg:w-4/5 relative h-[220px] sm:h-[280px] md:h-[350px] lg:h-[510px]">
        <Image
          src="/images/banners/main-banner.jpg"
          alt="بنر اصلی"
          fill
          className="rounded-lg object-cover object-[30%_90%]"
          priority
        />
      </section>

      {/* small banners */}
      <section className="w-full lg:w-1/5 flex flex-row lg:flex-col gap-4 h-auto lg:h-[510px]">
        {/* بنر اندرویدی */}
        <div className="relative w-1/2 lg:w-full h-[120px] sm:h-[150px] md:h-[180px] lg:h-1/2">
          <Link href="/shop/type/اندرویدی">
            <Image
              src="/images/banners/android-banner.jpg"
              alt="بنر اندرویدی"
              fill
              className="rounded-lg object-cover"
              priority
            />
          </Link>
        </div>

        {/* بنر سیار */}
        <div className="relative w-1/2 lg:w-full h-[120px] sm:h-[150px] md:h-[180px] lg:h-1/2">
          <Link href="/shop/type/سیار">
            <Image
              src="/images/banners/sayar-banner.jpg"
              alt="بنر سیار"
              fill
              className="rounded-lg object-cover"
              priority
            />
          </Link>
        </div>
      </section>
    </div>
  )
}
