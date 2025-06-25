'use client'

import Footer from '@/components/Footer'
import CartItemCard from '@/components/shop/cart/CartItemCard'
import ShopPageHeader from '@/components/shop/ShopPageHeader'
import { useAppContext } from '../../../../context/AppContext'

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, loadingCart } =
    useAppContext()

  const totalItems =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0

  const totalPrice = cart?.items?.reduce((sum, item) => {
    const price = item.productId?.price || 0
    return sum + price * item.quantity
  }, 0)

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart({ productId })
    } else {
      updateCartQuantity(productId, newQuantity)
    }
  }

  if (loadingCart) {
    return <div className="p-6 text-center">در حال بارگذاری سبد خرید...</div>
  }

  if (!cart?.items?.length) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-2">سبد خرید شما خالی است 🛒</h2>
        <a href="/" className="text-blue-600 hover:underline">
          بازگشت به فروشگاه
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light">
      <ShopPageHeader />

      <section className="px-4 sm:px-6 lg:px-24 pt-12">
        <ul className="lg:w-3/4 space-y-4">
          {cart.items.map((item, index) => (
            <li key={index}>
              <CartItemCard
                product={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={() => removeFromCart(item)}
              />
            </li>
          ))}
        </ul>

        <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="text-lg font-semibold">
            مجموع ({totalItems} مورد):
          </span>
          <span className="text-2xl font-bold text-green-600">
            {totalPrice.toLocaleString()} تومان
          </span>
        </div>

        <div className="mt-6 text-left">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            ادامه فرآیند خرید
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto mt-24">
        <Footer />
      </div>
    </div>
  )
}
