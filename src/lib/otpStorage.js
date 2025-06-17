// lib/otpStorage.js

if (!globalThis.otpStorage) {
  globalThis.otpStorage = new Map()
}

const otpStorage = globalThis.otpStorage

export default otpStorage
