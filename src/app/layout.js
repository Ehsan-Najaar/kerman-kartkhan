import UserWrapper from '@/app/UserWrapper'
import InstallPrompt from '@/components/InstallPrompt'
import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { Vazirmatn } from 'next/font/google'

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-vazirmatn',
  display: 'swap',
})

export const metadata = {
  title: 'کرمان کارتخوان | Kerman Kartkhan',
  description:
    'کرمان کارتخوان، همراه هوشمند پرداخت شما در کرمان؛ کارتخوان‌های سریع، امن و قابل اعتماد برای کسب‌وکارها.',
  icons: {
    icon: [
      {
        url: 'https://kerman-kartkhan-2.storage.c2.liara.space/android-icon-192x192.png',
        type: 'image/png',
        sizes: '192x192',
      },
    ],
  },
  openGraph: {
    title: 'کرمان کارتخوان | Kerman Kartkhan',
    description:
      'کرمان کارتخوان، همراه هوشمند پرداخت شما در کرمان؛ کارتخوان‌های سریع، امن و قابل اعتماد برای کسب‌وکارها.',
    url: 'https://kerman-kartkhan.com',
    siteName: 'کرمان کارتخوان',
    type: 'website',
    images: [
      {
        url: 'https://kerman-kartkhan-2.storage.c2.liara.space/android-icon-192x192.png',
        width: 192,
        height: 192,
        alt: 'لوگوی کرمان کارتخوان',
      },
    ],
  },
  other: {
    'application-name': 'کرمان کارتخوان',
    'apple-mobile-web-app-title': 'کرمان کارتخوان',
    'theme-color': '#ff697c',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        {/* ✅ PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff697c" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        {/* ✅ Structured Data: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'کرمان کارتخوان',
              alternateName: 'Kerman Kartkhan',
              url: 'https://kerman-kartkhan.com',
              logo: 'https://kerman-kartkhan-2.storage.c2.liara.space/android-icon-192x192.png',
              sameAs: [
                'https://instagram.com/kerman_kartkhan',
                'https://t.me/kerman_kartkhan',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+98-913-713-1002',
                contactType: 'customer service',
                areaServed: 'IR',
                availableLanguage: ['fa', 'en'],
              },
            }),
          }}
        />

        {/* ✅ Structured Data: BreadcrumbList (برای صفحه اصلی و داخلی) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'کرمان کارتخوان',
                  item: 'https://kerman-kartkhan.com',
                },
              ],
            }),
          }}
        />
      </head>

      <body className={`bg-bg overflow-x-hidden ${vazirmatn.className}`}>
        <UserWrapper>
          <Layout>
            {children}
            <InstallPrompt />
          </Layout>
        </UserWrapper>
      </body>
    </html>
  )
}
