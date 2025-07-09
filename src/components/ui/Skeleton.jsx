export default function ProductCardSkeleton() {
  return (
    <div className="w-56 bg-light p-2 rounded-lg border border-lightgray/50 shadow-sm space-y-4 animate-pulse">
      <section>
        <figure className="rounded-lg border-b-2 border-lightgray p-1 flex justify-center">
          <div className="h-36 w-36 bg-lightgray rounded-md" />
        </figure>

        <div className="flex items-center gap-1 mt-4">
          <div className="w-16 h-4 bg-lightgray rounded" />
          <div className="w-12 h-4 bg-lightgray rounded" />
        </div>
      </section>

      <section className="text-xs text-gray mt-2 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-lightgray rounded-full" />
          <div className="w-24 h-3 bg-lightgray rounded" />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-lightgray rounded-full" />
          <div className="w-10 h-3 bg-lightgray rounded" />
          <div className="w-10 h-3 bg-lightgray rounded" />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-lightgray rounded-full" />
          <div className="w-10 h-3 bg-lightgray rounded" />
          <div className="w-10 h-3 bg-lightgray rounded" />
        </div>
      </section>

      <div className="h-4 w-24 bg-lightgray rounded mt-2" />

      <section className="flex items-center gap-2 mt-2">
        <div className="w-24 h-8 bg-lightgray rounded-md" />
        <div className="w-10 h-10 bg-lightgray rounded-lg" />
      </section>
    </div>
  )
}
