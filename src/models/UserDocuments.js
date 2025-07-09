import mongoose from 'mongoose'

const UserDocumentsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    shopName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    address: { type: String, default: '' },

    nationalCode: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    birthCertificate: {
      type: String,
      default: '',
    },
    nationalCardFront: {
      type: String,
      default: '',
    },
    nationalCardBack: {
      type: String,
      default: '',
    },
    bankCard: {
      type: String,
      default: '',
    },

    license: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['draft', 'completed'],
      default: 'draft',
    },
  },
  { timestamps: true }
)

export default mongoose.models.UserDocuments ||
  mongoose.model('UserDocuments', UserDocumentsSchema)
