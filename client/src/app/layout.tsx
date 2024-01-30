import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import AuthProvider from './context/AuthProvider'
import StoreProvider from './StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Auction App',
  description: 'Using Nextjs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="flex justify-center items-start p-6 min-h-screen">
            <StoreProvider>
              {children}
            </StoreProvider>
          </main>
        </AuthProvider>
      </body>
    </html >
  )
}
