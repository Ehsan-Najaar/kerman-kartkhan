// models/Cart.js
import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    selectedColor: {
      type: String,
    },
    selectedVariant: {
      type: String,
    },
    bodyColors: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
)

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  items: [cartItemSchema],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema)
