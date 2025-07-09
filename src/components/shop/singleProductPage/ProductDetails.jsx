'use client'

import AuthModal from '@/components/shop/AuthModal'
import Button from '@/components/ui/Button'
import { useAppContext } from '@/context/AppContext'
import { formatPriceToPersian } from '@/utils/formatPrice'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import {
  FiArrowLeftCircle,
  FiCheck,
  FiChevronLeft,
  FiList,
  FiLoader,
  FiMinus,
  FiPlus,
  FiShoppingCart,
} from 'react-icons/fi'

export default function ProductDetails({ product }) {
  const { user, loadingCart, addToCart, isInCart } = useAppContext()
  const [selectedImage, setSelectedImage] = useState(product?.images[0] || '')
  const [productNumber, setProductNumber] = useState(1)
  const [cartLoading, setCartLoading] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('features')
  const [activeVariant, setActiveVariant] = useState(
    product?.variants?.[0] || null
  )
  const [activeColor, setActiveColor] = useState(null)

  const productIsInCart =
    !loadingCart && isInCart(product._id, activeVariant?.name || null)

  const colorMap = {
    قرمز: '#ff0000',
    آبی: '#2196f3',
    نارنجی: '#ff9800',
    زرد: '#ffeb3b',
    مشکی: '#000000',
    سفید: '#ffffff',
    'طوسی روشن': '#d3d3d3',
    سورمه‌ای: '#1b1f5e',
    'آبی نفتی': '#3b6978',
    'آبی روشن': '#87cefa',

    // ترکیب‌های دو رنگ
    'سفید/مشکی': `linear-gradient(to right, #ffffff 50%, #000000 50%)`,
    'سفید/طوسی روشن': `linear-gradient(to right, #ffffff 50%, #d3d3d3 50%)`,
    'مشکی/طوسی روشن': `linear-gradient(to right, #000000 50%, #d3d3d3 50%)`,
  }

  const handleImageClick = (image) => setSelectedImage(image)
  const handleQuantityChange = (e) => setProductNumber(Number(e.target.value))

  const updateCart = async () => {
    if (!user) {
      setAuthModalOpen(true)
      return
    }

    if (!activeColor) {
      toast.error('لطفا رنگ را انتخاب کنید')
      return
    }

    setCartLoading(true)
    await addToCart({
      productId: product._id,
      quantity: productNumber,
      selectedColor: Array.isArray(activeColor) ? null : activeColor || null,
      bodyColors: Array.isArray(activeColor) ? activeColor : [],
      selectedVariant: activeVariant?.name || null,
    })
    setCartLoading(false)
  }

  const calculateTotalPrice = () => {
    const price =
      activeVariant?.price != null
        ? Number(activeVariant.price)
        : Number(product?.price)

    return price * productNumber
  }

  const scrollToDescription = () => {
    const tabSection = document.getElementById('product-details-tabs')
    tabSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleColorClick = (color) => {
    setActiveColor(color)
  }

  const handleBodyColorClick = (colors) => {
    setActiveColor(colors)
  }

  function getDualColorGradient(colors) {
    if (!colors || colors.length !== 2) return '#ccc'

    const [color1, color2] = colors
    const hex1 = colorMap[color1] || '#ccc'
    const hex2 = colorMap[color2] || '#ccc'

    return `linear-gradient(to right, ${hex1} 50%, ${hex2} 50%)`
  }

  return (
    <div className="px-24 space-y-16">
      <section className="w-full rounded-2xl overflow-hidden flex flex-col lg:flex-row gap-4 text-dark border border-lightgray/35 shadow">
        <div className="flex flex-col lg:flex-row-reverse gap-4 p-4">
          <figure className="relative flex items-center justify-center border-r border-lightgray/35">
            <Image
              src={selectedImage || '/placeholder.png'}
              alt={`تصویر ${product?.name}`}
              width={800}
              height={800}
              className="object-contain"
              priority
            />
          </figure>

          <div className="flex lg:flex-col gap-2 px-6 lg:px-0">
            {product?.images?.map((image, index) => (
              <div
                key={index}
                className={`w-20 h-20 cursor-pointer overflow-hidden rounded-lg border ${
                  image === selectedImage
                    ? 'border-2 border-section'
                    : 'border-lightgray'
                }`}
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={image}
                  alt={`تصویر کوچک ${index}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full space-y-6 p-4 bg-lightgray/45">
          <nav
            aria-label="breadcrumb"
            className="flex items-center justify-between"
          >
            <ol className="flex items-center text-sm gap-2 text-gray/70">
              <li>
                <Link href="/">خانه</Link>
              </li>
              <FiChevronLeft />
              <li>
                <Link href="/shop">فروشگاه</Link>
              </li>
              <FiChevronLeft />
              <li>
                <Link href={`/shop/type/${product.type}`}>
                  کارتخوان {product.type}
                </Link>
              </li>
              <FiChevronLeft />
              <li>{product.name.toUpperCase()}</li>
            </ol>
            <small className="text-xs font-light text-gray">
              (فعال سازی و اتصال به حساب{' '}
              <b className="text-green-600">رایگان</b> است.)
            </small>
          </nav>

          <h1 className="flex items-center gap-2 text-2xl font-bold">
            کارتخوان {product.name.toUpperCase()}
          </h1>
          <div className="flex gap-4">
            <p className="bg-light p-2 rounded-lg">
              <span className="text-gray">برند : </span>
              <span>{product.brand}</span>
            </p>
            <p className="bg-light p-2 rounded-lg">
              <span className="text-gray">مدل : </span>
              <span>{product.model}</span>
            </p>
            <p className="bg-light p-2 rounded-lg">
              <span className="text-gray">وضعیت : </span>
              <span>{product.condition}</span>
            </p>
            <p className="bg-light p-2 rounded-lg">
              <span className="text-gray">نوع : </span>
              <span>{product.type}</span>
            </p>
          </div>

          <section className="flex justify-between">
            <div className="space-y-2">
              <p className="font-medium flex items-center gap-2">
                انتخاب رنگ:
                <span className="text-dark underline">
                  {Array.isArray(activeColor)
                    ? activeColor.join(' / ')
                    : activeColor || product.colors?.[0]}
                </span>
              </p>
              <div className="flex gap-4">
                {/* رنگ‌های تکی */}
                {product.colors?.length > 0 && (
                  <div className="flex items-center gap-2">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className={`p-1 border rounded-full ${
                          activeColor === color
                            ? 'border-secondary'
                            : 'border-gray/50'
                        }`}
                      >
                        <div
                          onClick={() => handleColorClick(color)}
                          title={color}
                          className="w-8 h-8 rounded-full cursor-pointer relative"
                          style={{
                            backgroundColor: colorMap[color] || '#ccc',
                          }}
                        >
                          {activeColor === color && (
                            <FiCheck
                              size={20}
                              className="text-gray absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* رنگ‌های دو‌تایی */}
                {product.bodyColors?.length === 2 && (
                  <div
                    className={`p-1 border rounded-full ${
                      Array.isArray(activeColor) &&
                      activeColor.join('/') === product.bodyColors.join('/')
                        ? 'border-secondary'
                        : 'border-gray/50'
                    }`}
                  >
                    <div
                      onClick={() => handleBodyColorClick(product.bodyColors)}
                      title={product.bodyColors.join(' / ')}
                      className="w-8 h-8 rounded-full cursor-pointer relative"
                      style={{
                        background: getDualColorGradient(product.bodyColors),
                      }}
                    >
                      {Array.isArray(activeColor) &&
                        activeColor[0] === product.bodyColors[0] &&
                        activeColor[1] === product.bodyColors[1] && (
                          <FiCheck
                            size={20}
                            className="text-gray absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          />
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {product.variants?.length > 0 && (
              <div className="w-1/2 space-y-2">
                <p className="font-medium">انتخاب مدل:</p>
                <div className="flex gap-2">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveVariant(variant)}
                      className={`
                        px-4 py-2 border rounded-lg cursor-pointer
                        ${
                          activeVariant?.name === variant.name
                            ? 'border-secondary bg-secondary text-white'
                            : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                        }
                      `}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <FiList size={20} />
              <p className="font-semibold">ویژگی‌ها:</p>
            </div>
            <ul className="grid lg:grid-cols-2 gap-4 text-gray-700">
              {product.specs?.slice(0, 6).map((spec, index) => (
                <li key={index} className="bg-light rounded-lg p-2 truncate">
                  <span className="text-gray ml-2">{spec.key} :</span>
                  <span>{spec.value}</span>
                </li>
              ))}

              <button
                onClick={scrollToDescription}
                className="flex items-center gap-1 text-sm text-gray cursor-pointer"
              >
                نمایش تمام ویژگی <FiArrowLeftCircle size={16} />
              </button>
            </ul>
          </section>

          <section className="flex items-end justify-between">
            <article>
              <p className="text-gray">قیمت</p>
              <p className="text-2xl font-bold text-dark">
                {formatPriceToPersian(calculateTotalPrice())} تومان
              </p>
            </article>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() =>
                    productNumber > 1 && setProductNumber(productNumber - 1)
                  }
                  className="w-10 h-10 grid place-items-center rounded-full border text-3xl font-bold border-dark text-dark hover:border-primary cursor-pointer"
                >
                  <FiMinus />
                </button>
                <input
                  min="1"
                  value={formatPriceToPersian(productNumber)}
                  onChange={handleQuantityChange}
                  className="w-24 p-2 text-center rounded-full bg-transparent border border-dark text-dark"
                />
                <button
                  onClick={() => setProductNumber(productNumber + 1)}
                  className="w-10 h-10 grid place-items-center rounded-full border text-3xl font-bold border-dark text-dark hover:border-primary cursor-pointer"
                >
                  <FiPlus />
                </button>
              </div>
              <Button
                variant={`${productIsInCart ? 'ghost' : 'primary'}`}
                fontWeight="medium"
                className="w-max"
                onClick={() =>
                  !isInCart(product._id, activeVariant?.name || null) &&
                  updateCart()
                }
                disabled={
                  isInCart(product._id, activeVariant?.name || null) ||
                  cartLoading
                }
              >
                {cartLoading ? (
                  <>
                    در حال افزودن <FiLoader className="animate-spin" />
                  </>
                ) : isInCart(product._id, activeVariant?.name || null) ? (
                  <>
                    موجود در سبد خرید شما <FiCheck />
                  </>
                ) : (
                  <>
                    افزودن به سبد خرید <FiShoppingCart />
                  </>
                )}
              </Button>
            </div>
          </section>
        </div>
      </section>

      <section
        id="product-details-tabs"
        className="bg-lightgray/35 shadow px-4 pb-4 rounded-xl"
      >
        {/* تب‌ها */}
        <div className="flex gap-2 mb-4">
          <button
            className={`p-2 px-4 font-medium rounded-b-lg cursor-pointer ${
              activeTab === 'description'
                ? 'bg-lightgray text-gray'
                : 'bg-secondary text-light'
            }`}
            onClick={() => setActiveTab('features')}
          >
            ویژگی‌ها
          </button>
          <button
            className={`p-2 px-4 font-medium rounded-b-lg cursor-pointer ${
              activeTab === 'description'
                ? 'bg-secondary text-light'
                : 'bg-lightgray text-gray'
            }`}
            onClick={() => setActiveTab('description')}
          >
            توضیحات
          </button>
        </div>

        {/* محتوای تب‌ها */}
        {activeTab === 'description' ? (
          <div>
            <p className="text-gray-700 leading-relaxed">
              {product.description || 'توضیحاتی برای این محصول ثبت نشده است.'}
            </p>
          </div>
        ) : (
          <div>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              {product.specs?.length > 0 ? (
                product.specs.map((spec, index) => (
                  <li key={index}>
                    <strong>{spec.key}:</strong> {spec.value}
                  </li>
                ))
              ) : (
                <p>ویژگی‌ای ثبت نشده است.</p>
              )}
            </ul>
          </div>
        )}
      </section>

      {authModalOpen && (
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      )}
    </div>
  )
}
