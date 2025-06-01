import Image from 'next/image'

export default function BannersSection() {
  return (
    <div className="flex gap-4 px-24 py-12">
      {/* big banner */}
      <section className="w-3/4">
        <Image
          src={'/images/banners/main-banner.png'}
          alt="بنر"
          width={300}
          height={300}
          property="true"
          className="w-[920px] h-fit rounded-lg"
        />
      </section>

      {/* small banners */}
      <section className="w-1/4 space-y-4">
        <Image
          src={'/images/banners/android-banner.png'}
          alt="بنر"
          width={300}
          height={300}
          property="true"
          className="rounded-lg object-center object-cover"
        />
        <Image
          src={'/images/banners/sayar-banner.png'}
          alt="بنر"
          width={300}
          height={300}
          property="true"
          className="rounded-lg object-center object-contain"
        />
      </section>
    </div>
  )
}
