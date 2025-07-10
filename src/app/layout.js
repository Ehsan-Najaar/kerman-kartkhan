import UserWrapper from '@/app/UserWrapper'
import InstallPrompt from '@/components/InstallPrompt'
import Layout from '@/components/Layout'
import '../../styles/globals.css'

export const metadata = {
  title: 'kerman-kartkhan',
  description: 'kerman-kartkhan',
  icons: '/images/browser-tab-logo.png',
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
