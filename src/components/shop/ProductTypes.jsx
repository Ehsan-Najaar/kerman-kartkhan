export default function ProductTypes({ products }) {
  const uniqueTypes = [...new Set(products.map((p) => p.type))]

  return (
    <div className="bg-gray-200 p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-2">انواع محصولات:</h3>
      <div className="flex gap-3">
        {uniqueTypes.map((type) => (
          <div
            key={type}
            className="bg-white text-gray-800 px-4 py-2 rounded shadow text-sm font-medium"
          >
            {type}
          </div>
        ))}
      </div>
    </div>
  )
}
