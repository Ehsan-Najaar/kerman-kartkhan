import Button from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'

export default function Question() {
  return (
    <div className="bg-gray-200 h-96 flex flex-col md:flex-row items-center justify-center px-8">
      {/* Image */}
      <div className="w-1/2 sm:w-1/3 flex justify-center">
        <Image src="/images/question.png" alt="سوال" width={350} height={350} />
      </div>

      {/* Text & Buttons */}
      <div className="sm:w-1/2 flex flex-col justify-center items-start text-right space-y-4">
        <h3 className="w-full text-center lg:text-right lg:text-xl px-4 lg:px-0 font-semibold mb-2">
          سوالی دارید؟
        </h3>
        <p className="text-gray text-center lg:text-right">
          اگر سوالی در ذهن دارید یا نیاز به راهنمایی بیشتر دارید، ما اینجا هستیم
          تا کمک کنیم.
        </p>
        <div className="w-full flex items-center justify-center lg:justify-start gap-4 mt-4">
          <Link href={'/faq'}>
            <Button variant="light" fontWeight="medium" size="sm">
              سوالات متداول
            </Button>
          </Link>
          <Link href={'/contact-us'}>
            <Button variant="secondary" fontWeight="medium" size="sm">
              گفتگو با ما
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
