import CategoryItem from '@/components/CategoryItem'

export default function CategoryList({ categories, handleEdit, handleDelete }) {
  return (
    <div className="h-96 overflow-hidden">
      <ul className="h-full overflow-auto space-y-2">
        {categories.length === 0 ? (
          <p className="text-center">دسته‌بندی‌ای موجود نیست.</p>
        ) : (
          categories.map((category) => (
            <CategoryItem
              key={category._id}
              category={category}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        )}
      </ul>
    </div>
  )
}
