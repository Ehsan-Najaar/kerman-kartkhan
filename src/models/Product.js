import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  brand: { type: String, trim: true },
  model: { type: String, trim: true },

  price: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  stock: { type: Number, default: 0 },

  condition: {
    type: String,
    enum: ['آکبند', 'استوک'],
    required: true,
  },

  type: {
    type: String,
    trim: true,
    required: true,
    enum: ['ثابت', 'سیار', 'اندرویدی'],
  },

  colors: { type: [String] },
  bodyColors: {
    type: [String],
    validate: (val) => val.length === 0 || val.length === 2,
  },

  images: {
    type: [String],
    validate: (val) => val.length <= 4,
    required: true,
  },
  video: { type: String },

  specs: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],

  description: { type: String, trim: true },
  tags: { type: [String], index: true },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  views: { type: Number, default: 0 },
  soldCount: { type: Number, default: 0 },
  isBestSeller: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
})

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product
