import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['بیسیم', 'سیار'],
    required: true,
  },
  condition: {
    type: String,
    enum: ['آکبند', 'استوک'],
    required: true,
  },
  colors: {
    type: [String],
    validate: (val) => val.length <= 2,
  },
  images: {
    type: [String],
    validate: (val) => val.length <= 4,
    required: true,
  },
  video: {
    type: String,
  },
  mainFeatures: {
    type: [String],
    required: true,
  },
  otherFeatures: {
    type: [String],
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product
