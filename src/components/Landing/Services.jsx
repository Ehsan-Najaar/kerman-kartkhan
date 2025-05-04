import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

const services = [
  {
    icon: '/images/register.png',
    title: 'درخواست آنلاین کارتخوان',
  },
  {
    icon: '/images/install-apk.png',
    title: 'نصب نرم افزار در شرکت',
  },
  {
    icon: '/images/shield.png',
    title: 'ضمانت معتبر',
  },
  {
    icon: '/images/check.png',
    title: 'خریداقساطی با چک',
  },
  {
    icon: '/images/services.png',
    title: 'خدمات تعمیر و نگهداری',
  },
]

export default function Services() {
  return (
    <section className="relative py-12">
      <div className="w-full px-4 text-center">
        {/* title */}
        <div className="flex flex-col items-center justify-center pb-12 space-y-4">
          <p className="title-text">چرا کرمان کارتخوان؟</p>
          <article className="-space-y-5 text-section animate-smooth-bounce">
            <ChevronDown size={32} className="stroke-3" />
            <ChevronDown size={32} className="stroke-3" />
          </article>
        </div>

        <div className="overflow-x-auto xl:overflow-visible p-4 -mx-4">
          <div className="flex gap-6 flex-nowrap min-w-max">
            {services.map((service, index) => {
              let positionClass = ''

              if (index === 0) positionClass = 'xl:top-[-48px]'
              if (index === 1) positionClass = 'xl:top-[-24px]'
              if (index === 3) positionClass = 'xl:top-[-24px]'
              if (index === 4) positionClass = 'xl:top-[-48px]'
              // index 2 تغییری نداره

              return (
                <div
                  key={index}
                  className={`relative w-52 h-52 bg-light rounded-4xl shadow-md shadow-section hover:shadow-lg p-6 flex-shrink-0 flex flex-col items-center justify-center transition-all duration-300 ${positionClass}`}
                >
                  <div className="mb-4">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={72}
                      height={72}
                      draggable="false"
                      className="object-contain"
                    />
                  </div>
                  <h3 className="main-text">{service.title}</h3>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* rectangle bg */}
      <div className="hidden xl:block w-[calc(100%+28%)] absolute top-0 -right-[170px] -z-10">
        <Image
          src={'/images/middle-rectangle.png'}
          alt=""
          width={1500}
          height={700}
          draggable="false"
        />
      </div>
    </section>
  )
}
