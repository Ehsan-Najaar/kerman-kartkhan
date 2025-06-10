import Image from 'next/image'

function Loader1() {
  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      aria-label="Loading content, please wait"
      role="alert"
      aria-busy="true"
    >
      <Image
        src="/images/loader1.png"
        alt="Loading animation"
        width={200}
        height={200}
        priority
        className="animate-smooth-bounce"
      />
    </div>
  )
}

function Loader2() {
  return (
    <div
      className="h-full flex items-center justify-center z-50"
      aria-label="Loading content, please wait"
      role="alert"
      aria-busy="true"
    >
      <section>
        <Image
          src="/images/loader1.png"
          alt="Loading animation"
          width={200}
          height={200}
          priority
          className="animate-smooth-bounce"
        />
        <p className="text-center mt-4 mr-8">در حال بارگذاری ...</p>
      </section>
    </div>
  )
}

function Loader3() {
  return (
    <div
      className="min-h-screen flex bg-light items-center justify-center z-50"
      aria-label="Loading content, please wait"
      role="alert"
      aria-busy="true"
    >
      <section>
        <Image
          src="/images/loader1.png"
          alt="Loading animation"
          width={200}
          height={200}
          priority
          className="animate-smooth-bounce"
        />
        <p className="text-center mt-4 mr-8">در حال بارگذاری ...</p>
      </section>
    </div>
  )
}

// حالت اول: named export
export { Loader1, Loader2, Loader3 }
