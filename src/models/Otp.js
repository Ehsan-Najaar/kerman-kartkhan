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
      required: true, // برای اعتبار ۱ دقیقه
    },
    // فیلد اختیاری برای حذف بعد از ۲۴ ساعت
    deleteAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

// TTL فقط روی deleteAt برای حذف خودکار بعد از ۲۴ ساعت
otpSchema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 })

export default mongoose.models.Otp || mongoose.model('Otp', otpSchema)
