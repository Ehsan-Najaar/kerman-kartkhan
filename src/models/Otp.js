import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^09\d{9}$/, 'شماره موبایل معتبر نیست'],
    },
    code: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 6,
      trim: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

// TTL index: رکوردها بعد از زمان expiresAt حذف می‌شوند
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export default mongoose.models.Otp || mongoose.model('Otp', otpSchema)
