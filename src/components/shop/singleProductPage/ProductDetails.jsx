'use client'

import Button from '@/components/ui/Button'
import { formatPriceToPersian } from '@/utils/formatPrice'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
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

export default function ProductDetails({
  product,
  addToCart,
  inCart,
  isLoading,
  isLoggedIn,
}) {
  const [selectedImage, setSelectedImage] = useState(product?.images[0] || '')
  const [productNumber, setProductNumber] = useState(1)
  const [isInCart, setIsInCart] = useState(inCart)
  const [cartLoading, setCartLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('features')

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
  }

  useEffect(() => {
    setIsInCart(inCart)
  }, [inCart])

  const descriptionRef = useRef(null)

  const handleImageClick = (image) => setSelectedImage(image)
  const handleQuantityChange = (e) => setProductNumber(Number(e.target.value))
  const updateCart = (quantity) => {
    addToCart(quantity)
    isLoggedIn && setIsInCart(true)
  }
  const calculateTotalPrice = () => product?.price * productNumber
  const scrollToDescription = () => {
    const tabSection = document.getElementById('product-details-tabs')
    tabSection?.scrollIntoView({ behavior: 'smooth' })
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
                <Link href="/products">محصولات</Link>
              </li>
              <FiChevronLeft />
              <li>
                <Link href="/products">کارتخوان {product.type}</Link>
              </li>
              <FiChevronLeft />
              <li>{product.name.toUpperCase()}</li>
            </ol>
            <small className="text-xs font-light text-gray">
              (فعال سازی و اتصال به حساب{' '}
              <b className="text-yellow-600">رایگان</b> است.)
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

          {(product.colors?.length > 0 || product.bodyColors?.length > 0) && (
            <div className="space-y-2">
              <p className="font-medium">رنگ محصول:</p>
              <div className="flex items-center">
                {/* رنگ‌های موجود (تک‌رنگ‌ها) */}
                {product.colors?.length > 0 && (
                  <div className="flex items-center gap-2">
                    {product.colors.map((color, index) => (
                      <div
                        key={`color-${index}`}
                        title={color}
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: colorMap[color] || '#ccc' }}
                      />
                    ))}
                  </div>
                )}

                {/* فاصله بین رنگ‌ها و بدنه */}
                {product.colors?.length > 0 &&
                  product.bodyColors?.length > 0 && <div className="w-4" />}

                {/* رنگ بدنه */}
                {product.bodyColors?.length > 0 && (
                  <div className="flex items-center gap-2">
                    {product.bodyColors.length === 1 ? (
                      <div
                        title={product.bodyColors[0]}
                        className="w-6 h-6 rounded-full border"
                        style={{
                          backgroundColor:
                            colorMap[product.bodyColors[0]] || '#ccc',
                        }}
                      />
                    ) : (
                      <div
                        title={`${product.bodyColors[0]} و ${product.bodyColors[1]}`}
                        className="w-6 h-6 rounded-full border border-gray-400 bg-gray-200 overflow-hidden relative"
                      >
                        {/* سمت چپ (نیمه اول) */}
                        <div
                          className="absolute top-0 left-0 w-1/2 h-full"
                          style={{
                            backgroundColor:
                              colorMap[product.bodyColors[0]] || '#ccc',
                          }}
                        />
                        {/* سمت راست (نیمه دوم) */}
                        <div
                          className="absolute top-0 right-0 w-1/2 h-full"
                          style={{
                            backgroundColor:
                              colorMap[product.bodyColors[1]] || '#ccc',
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

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
              <div className="flex items-center gap-3">
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
                variant="primary"
                fontWeight="medium"
                className="w-max"
                onClick={() => !isInCart && updateCart(productNumber)}
                disabled={isInCart || cartLoading}
              >
                {cartLoading ? (
                  <>
                    در حال افزودن <FiLoader className="animate-spin" />
                  </>
                ) : isInCart ? (
                  <>
                    اضافه شد <FiCheck />
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
    </div>
  )
}
