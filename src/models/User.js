import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      default: '',
      trim: true,
    },
    street: {
      type: String,
      default: '',
      trim: true,
    },
    postalCode: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { _id: false }
)

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^09\d{9}$/, 'شماره موبایل معتبر نیست'],
      minlength: [11, 'شماره موبایل باید ۱۱ رقم باشد'],
      maxlength: [11, 'شماره موبایل باید ۱۱ رقم باشد'],
    },
    name: {
      type: String,
      default: '',
    },
    roles: {
      type: [String],
      enum: ['user', 'admin'],
      default: ['user'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastLogin: {
      type: Date,
    },
    address: {
      type: [addressSchema],
      default: [],
      validate: [(val) => val.length <= 3, '{PATH} exceeds the limit of 3'],
    },
  },
  { versionKey: false }
)

export default mongoose.models.User || mongoose.model('User', userSchema)
