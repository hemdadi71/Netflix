import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthContext from './context/AuthContext'
import ToasterContext from './context/ToasterContext'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import Navbar from './components/Navbar'
import getCurrentUser from './actions/getCurrentUser'
import { headers } from 'next/headers'
import Modal from './components/Modal'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <head>
        <title>Netflix</title>
        <link rel="shortcut icon" href="/images/netflix-icon.png" />
      </head>
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <Modal />
          <Navbar />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
