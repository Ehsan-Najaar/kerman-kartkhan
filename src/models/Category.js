import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null, // دسته‌های اصلی parent ندارند
  },
})

const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema)

export default Category
