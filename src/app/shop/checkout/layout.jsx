import CheckoutGuard from '@/components/CheckoutGuard'

export default function CheckoutLayout({ children }) {
  return <CheckoutGuard>{children}</CheckoutGuard>
}
