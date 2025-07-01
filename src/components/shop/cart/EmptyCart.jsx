import Button from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function EmptyCart() {
  return (
    <div className="text-center h-max mx-auto my-32">
      <div className="relative w-96 h-96 mx-auto">
        <Image
          src="/images/undraw/undraw_empty_4zx0.svg"
          alt="سبد خرید خالی"
          fill
          className="object-contain"
        />
      </div>
      <p className="text-gray-500 text-lg mb-4">سبد خرید شما خالی است.</p>
      <Link
        href="/shop"
        className="btn-primary text-center inline-block py-2 px-6 rounded-lg"
      >
        <Button variant="secondary">
          شروع خرید
          <ArrowLeft size={18} />
        </Button>
      </Link>
    </div>
  )
}
