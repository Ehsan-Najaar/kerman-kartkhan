import Image from 'next/image'

export default function BannersSection() {
  return (
    <div className="flex gap-4 px-24 pt-12">
      {/* big banner */}
      <section className="w-4/5 h-[510px] relative">
        <Image
          src="/images/banners/main-banner.jpg"
          alt="بنر"
          fill
          className="rounded-lg object-cover object-[30%_70%]"
        />
      </section>

      {/* small banners */}
      <section className="w-1/5 flex flex-col gap-4">
        <div className="relative h-1/2">
          <Image
            src="/images/banners/android-banner.jpg"
            alt="بنر"
            width={250}
            height={250}
            className="rounded-lg object-cover"
            priority
          />
        </div>
        <div className="relative h-1/2">
          <Image
            src="/images/banners/sayar-banner.jpg"
            alt="بنر"
            width={250}
            height={250}
            className="rounded-lg object-contain"
            priority
          />
        </div>
      </section>
    </div>
  )
}
