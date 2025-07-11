import Image from 'next/image'
import Link from 'next/link'

export default function BannersSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 px-4 md:px-12 lg:px-24 md:pt-10 lg:pt-12">
      {/* big banner */}
      <section className="w-full lg:w-4/5 h-[220px] sm:h-[280px] md:h-[350px] lg:h-[510px] relative">
        <Image
          src="/images/banners/main-banner.jpg"
          alt="بنر"
          fill
          className="rounded-lg object-cover object-[30%_90%]"
          priority
        />
      </section>

      {/* small banners */}
      <section className="w-full lg:w-1/5 flex flex-row lg:flex-col gap-4">
        <div className="relative w-1/2 lg:w-full h-[164px] sm:h-[296px] md:h-[370px] lg:h-[245px] xl:h-1/2">
          <Link href="/shop/type/اندرویدی">
            <Image
              src="/images/banners/android-banner.jpg"
              alt="بنر"
              fill
              className="rounded-lg object-cover"
              priority
            />
          </Link>
        </div>
        <div className="relative w-1/2 lg:w-full h-[164px] sm:h-[296px] md:h-[370px] lg:h-[245px] xl:h-1/2">
          <Link href="/shop/type/سیار">
            <Image
              src="/images/banners/sayar-banner.jpg"
              alt="بنر"
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
