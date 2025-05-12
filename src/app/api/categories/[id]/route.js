import connectDB from '@/lib/db'
import Category from '@/models/Category'

export default async function handler(req, res) {
  await connectDB()
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const category = await Category.findById(id).populate('parent')
      if (!category)
        return res.status(404).json({ message: 'Category not found' })
      return res.status(200).json(category)
    } catch {
      return res.status(400).json({ message: 'Invalid ID' })
    }
  }

  res.status(405).json({ message: 'Method Not Allowed' })
}
