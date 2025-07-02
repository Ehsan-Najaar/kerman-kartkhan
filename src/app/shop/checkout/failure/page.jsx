// app/shop/checkout/failure/page.js

export default function FailurePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        پرداخت ناموفق بود
      </h1>
      <p className="text-gray-700 mb-6">
        متأسفانه عملیات پرداخت شما انجام نشد یا توسط شما لغو شد.
      </p>
      <a
        href="/shop/checkout"
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        بازگشت به صفحه پرداخت
      </a>
    </div>
  )
}
