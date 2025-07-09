import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import AppContextProvider from '../context/AppContext' // default import

export default async function UserWrapper({ children }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  let user = null

  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
      console.error('توکن نامعتبر:', err.message)
    }
  }

  return <AppContextProvider user={user}>{children}</AppContextProvider>
}
