'use client'

import Footer from '@/components/Footer'
import { Loader3 } from '@/components/Loader'
import CartItemCard from '@/components/shop/cart/CartItemCard'
import CartSummary from '@/components/shop/cart/CartSummary'
import EmptyCart from '@/components/shop/cart/EmptyCart'
import ShopPageHeader from '@/components/shop/ShopPageHeader'
import { useAppContext } from '@/context/AppContext'

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, loadingCart } =
    useAppContext()

  const totalItems =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0

  const totalPrice =
    cart?.items?.reduce((sum, item) => {
      const variants = item.productId?.variants || []
      const matchedVariant = variants.find(
        (v) => v.name === item.selectedVariant
      )
      const unitPrice = matchedVariant?.price || item.productId?.price || 0

      return sum + unitPrice * item.quantity
    }, 0) || 0

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart({
        productId: item.productId._id,
        selectedColor: item.selectedColor,
        selectedVariant: item.selectedVariant,
        bodyColors: item.bodyColors,
      })
    } else {
      updateCartQuantity({
        productId: item.productId._id,
        selectedColor: item.selectedColor,
        selectedVariant: item.selectedVariant,
        bodyColors: item.bodyColors,
        quantity: newQuantity,
      })
    }
  }

  if (loadingCart) {
    return <Loader3 />
  }

  if (!cart?.items?.length) {
    return (
      <div className="min-h-screen bg-light">
        <ShopPageHeader />
        <EmptyCart />
        <div className="max-w-7xl mx-auto mt-24">
          <Footer />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light">
      <ShopPageHeader />

      <section className="flex gap-12 px-4 sm:px-6 lg:px-24 pt-12 min-h-96">
        <ul className="lg:w-[70%] space-y-4">
          {cart.items.map((item, index) =>
            item.productId ? (
              <li key={index}>
                <CartItemCard
                  product={item}
                  onUpdateQuantity={(newQuantity) =>
                    handleUpdateQuantity(item, newQuantity)
                  }
                  onRemove={() =>
                    removeFromCart({
                      productId: item.productId._id,
                      selectedColor: item.selectedColor,
                      selectedVariant: item.selectedVariant,
                      bodyColors: item.bodyColors || [],
                    })
                  }
                />
              </li>
            ) : null
          )}
        </ul>

        <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
      </section>

      <div className="max-w-7xl mx-auto mt-52">
        <Footer />
      </div>
    </div>
  )
}
