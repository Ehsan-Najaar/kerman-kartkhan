import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
        selectedColor: { type: String },
        selectedVariant: { type: String },
        bodyColors: [{ type: String }],
        price: { type: Number, required: true },
      },
    ],

    totalAmount: { type: Number, required: true },

    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },

    paymentRefId: { type: String },

    userName: {
      type: String,
      required: true,
    },

    shippingAddress: {
      address: String,
      phone: String,
      postalCode: String,
      nationalCode: String,
      shopName: String,
    },

    userDocuments: {
      nationalCardFront: String,
      nationalCardBack: String,
      license: String,
      birthCertificate: String,
      bankCard: String,
    },

    orderStatus: {
      type: String,
      enum: ['processing', 'registration', 'shipped', 'cancelled', 'completed'],
      default: 'processing',
    },

    isRegistered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Order || mongoose.model('Order', orderSchema)
