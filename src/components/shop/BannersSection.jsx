import Image from 'next/image'

export default function BannersSection() {
  return (
    <div className="flex gap-4 px-24 py-12 h-[516px]">
      {/* big banner */}
      <section className="w-5/6 relative">
        <Image
          src="/images/banners/main-banner.png"
          alt="بنر"
          fill
          className="rounded-lg object-cover"
        />
      </section>

      {/* small banners */}
      <section className="w-1/6 flex flex-col gap-4">
        <div className="relative h-1/2">
          <Image
            src="/images/banners/android-banner.png"
            alt="بنر"
            width={200}
            height={200}
            className="rounded-lg object-cover"
            priority
          />
        </div>
        <div className="relative h-1/2">
          <Image
            src="/images/banners/sayar-banner.png"
            alt="بنر"
            width={200}
            height={200}
            className="rounded-lg object-contain"
            priority
          />
        </div>
      </section>
    </div>
  )
}
