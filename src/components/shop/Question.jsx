import Button from '@/components/ui/Button'
import Image from 'next/image'

export default function Question() {
  return (
    <div className="bg-gray-200 h-96 flex items-center justify-center px-8">
      {/* Image */}
      <div className="w-1/2 flex justify-center">
        <Image src="/images/question.png" alt="سوال" width={350} height={350} />
      </div>

      {/* Text & Buttons */}
      <div className="w-1/2 flex flex-col justify-center items-start text-right space-y-4">
        <h2 className="text-2xl font-bold">سوالی دارید؟</h2>
        <p className="text-gray-700">
          اگر سوالی در ذهن دارید یا نیاز به راهنمایی بیشتر دارید، ما اینجا هستیم
          تا کمک کنیم.
        </p>
        <div className="flex gap-4 mt-4">
          <Button variant="light" fontWeight="medium" size="sm">
            سوالات متداول
          </Button>
          <Button variant="secondary" fontWeight="medium" size="sm">
            گفتگو با ما
          </Button>
        </div>
      </div>
    </div>
  )
}
