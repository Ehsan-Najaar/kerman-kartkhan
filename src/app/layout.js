import UserWrapper from '@/app/UserWrapper'
import InstallPrompt from '@/components/InstallPrompt'
import Layout from '@/components/Layout'
import '@/styles/globals.css'

export const metadata = {
  title: 'کرمان کارتخوان',
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
  other: {
    'application-name': 'کرمان کارتخوان',
    'apple-mobile-web-app-title': 'کرمان کارتخوان',
    'og:site_name': 'کرمان کارتخوان',
    'og:type': 'website',
    'og:title': 'کرمان کارتخوان',
    'og:description':
      'کرمان کارتخوان، همراه هوشمند پرداخت شما در کرمان؛ کارتخوان‌های سریع، امن و قابل اعتماد برای کسب‌وکارها.',
    'og:url': 'https://kerman-kartkhan.com',
    'og:image':
      'https://kerman-kartkhan-2.storage.c2.liara.space/android-icon-192x192.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        {/* PWA & Branding */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff697c" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        {/* Structured Data for Google */}
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
            }),
          }}
        />
      </head>

      <body className="bg-bg overflow-x-hidden">
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
