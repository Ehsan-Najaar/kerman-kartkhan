import UserWrapper from '@/app/UserWrapper'
import InstallPrompt from '@/components/InstallPrompt'
import Layout from '@/components/Layout'
import '@/styles/globals.css'

export const metadata = {
  title: 'کرمان کارتخوان | همراه هوشمند پرداخت',
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
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#ff697c" />
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />

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
