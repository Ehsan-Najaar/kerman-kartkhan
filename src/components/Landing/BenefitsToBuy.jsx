import { ChevronDown } from 'lucide-react'

const Benefits = [
  {
    title: 'تحویل کارتخوان فعال‌شده، کمتر از ۲ روز کاری',
    icon: '/images/truck.png',
  },
  {
    title: 'ضمانت 1 ساله تمامی کارتخوان ها',
    icon: '/images/shiedl-2.png',
  },
  {
    title: 'خرید اقساطی با چک، با بازپرداخت تا 6 ماه',
    icon: '/images/check.png',
  },
]

export default function BenefitsToBuy() {
  return (
    <div
      className="w-[calc(100%+320px)] -mr-40 h-80 rounded-b-4xl pt-12 px-12"
      style={{
        background: 'linear-gradient(to bottom, #f8243f -10%, #fbf5f6 120%)',
      }}
    >
      {/* title */}
      <div className="flex flex-col items-center justify-center pb-12 space-y-4">
        <p className="title-text text-light">مزایای خرید از ما</p>
        <article className="-space-y-5 text-section animate-smooth-bounce">
          <ChevronDown size={32} className="stroke-3" />
          <ChevronDown size={32} className="stroke-3" />
        </article>
      </div>

      {/* benefits */}
      <section className="flex items-center justify-center gap-32">
        {Benefits.map((benefit, index) => (
          <div
            key={index}
            className="w-56 h-52 rounded-2xl shadow-lg backdrop-blur-2xl flex flex-col items-center justify-center p-8 -mt-4"
          >
            <img
              src={benefit.icon}
              alt={benefit.title}
              width={72}
              height={72}
              className="mb-4"
            />
            <p className="main-text text-dark text-center">{benefit.title}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
