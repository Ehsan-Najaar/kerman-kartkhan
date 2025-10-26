'use client'

import AuthModal from '@/components/shop/AuthModal'
import TomanIcon from '@/components/TomanIcon'
import Button from '@/components/ui/Button'
import { useAppContext } from '@/context/AppContext'
import { formatPriceToPersian } from '@/utils/formatPrice'
import { BadgeCheck, CreditCard, Headphones, MapPin, Truck } from 'lucide-react'
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

  const benefits = [
    {
      icon: Truck,
      title: 'ارسال به سراسر کشور',
    },
    {
      icon: Headphones,
      title: '24 ساعته، 7 روز هفته',
    },
    {
      icon: MapPin,
      title: 'امکان پرداخت در محل',
    },
    {
      icon: CreditCard,
      title: 'امکان خرید اقساطی در محل',
    },
    {
      icon: BadgeCheck,
      title: 'ضمانت اصل بودن کالا',
    },
  ]

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
    <div className="lg:px-24 space-y-16">
      <section className="w-full rounded-2xl overflow-hidden flex flex-col lg:flex-row gap-4 text-dark lg:border border-lightgray/35 lg:shadow">
        <div className="flex flex-col lg:flex-row-reverse gap-4 p-4">
          <figure className="w-full sm:w-1/2 lg:w-full relative flex items-center justify-center lg:border-r border-lightgray/35">
            <Image
              src={selectedImage || '/images/logo.png'}
              alt={`${product?.name} ${product.type} از برند ${product.brand}`}
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
                <Link href={`/shop/type/${product.type}`}>{product.type}</Link>
              </li>
              <FiChevronLeft />
              <li>{product.name.toUpperCase()}</li>
            </ol>
            <small className="hidden lg:block text-xs font-light text-gray">
              (فعال سازی و اتصال به حساب{' '}
              <b className="text-green-600">رایگان</b> است.)
            </small>
          </nav>

          <h1 className="flex items-center gap-2 text-2xl font-bold">
            {['کارتخوان', 'کش لس'].includes(product.category.title)
              ? `${
                  product.type
                } مدل ${product.model.toUpperCase()} از برند ${product.brand.toUpperCase()} - ${
                  product.condition
                }`
              : product.name.toUpperCase()}
          </h1>

          <div className="md:flex grid grid-cols-2 gap-4 text-sm md:text-base">
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

          <section className="hidden md:flex items-end justify-between">
            <article>
              <p className="text-gray">قیمت</p>
              <p className="flex items-center gap-1 text-2xl font-bold text-dark">
                {formatPriceToPersian(calculateTotalPrice())}
                <TomanIcon width={18} height={18} className="fill-dark" />
              </p>
            </article>

            <div className="space-y-4 text-center">
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
                variant={
                  product.stock === 0
                    ? 'ghost'
                    : productIsInCart
                    ? 'ghost'
                    : 'primary'
                }
                fontWeight="medium"
                className="w-max"
                onClick={() =>
                  !isInCart(product._id, activeVariant?.name || null) &&
                  updateCart()
                }
                disabled={
                  product.stock === 0 ||
                  isInCart(product._id, activeVariant?.name || null) ||
                  cartLoading
                }
              >
                {product.stock === 0 ? (
                  <div>ناموجود</div>
                ) : cartLoading ? (
                  <>
                    در حال افزودن <FiLoader className="animate-spin" />
                  </>
                ) : isInCart(product._id, activeVariant?.name || null) ? (
                  <>
                    موجود در سبد خرید شما <FiCheck />
                  </>
                ) : (
                  <>
                    افزودن به سبد خرید{' '}
                    <Image
                      src="/icons/custom/Basket-white.svg"
                      alt="سبد خرید"
                      width={20}
                      height={20}
                      className="object-contain grayscale-100"
                    />
                  </>
                )}
              </Button>
            </div>
          </section>

          {/* حالت موبایل تا md */}
          <div
            className="
                  fixed bottom-16 left-0 right-0 z-20
                  bg-light
                  p-4 flex sm:flex-row items-center justify-between
                  gap-4
                  md:hidden
                    "
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-gray">قیمت</span>
              <span className="flex items-center gap-1 text-sm text-dark">
                {formatPriceToPersian(calculateTotalPrice())}
                <TomanIcon width={16} height={16} className="fill-dark" />
              </span>
            </div>

            <Button
              variant={
                product.stock === 0
                  ? 'ghost'
                  : productIsInCart
                  ? 'ghost'
                  : 'primary'
              }
              fontWeight="medium"
              size="sm"
              className="w-full sm:w-max text-xs sm:text-sm"
              onClick={() =>
                !isInCart(product._id, activeVariant?.name || null) &&
                updateCart()
              }
              disabled={
                product.stock === 0 ||
                isInCart(product._id, activeVariant?.name || null) ||
                cartLoading
              }
            >
              {product.stock === 0 ? (
                <>ناموجود</>
              ) : cartLoading ? (
                <>
                  در حال افزودن <FiLoader className="animate-spin" />
                </>
              ) : isInCart(product._id, activeVariant?.name || null) ? (
                <>
                  موجود در سبد خرید شما <FiCheck />
                </>
              ) : (
                <>
                  افزودن به سبد خرید{' '}
                  <Image
                    src="/icons/custom/Basket-white.svg"
                    alt="سبد خرید"
                    width={18}
                    height={18}
                    className="object-contain grayscale-100"
                  />
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-6 bg-lightgray/35 rounded-lg">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-6 text-center text-sm text-gray-600">
          {benefits.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <Icon className="w-6 h-6 text-gray-500" />
                <span>{item.title}</span>
              </div>
            )
          })}
        </div>
      </section>

      <section
        id="product-details-tabs"
        className="bg-lightgray/35 px-4 pb-4 lg:rounded-xl"
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
