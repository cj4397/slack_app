import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import FirebaseAuth from './firebase/FirebaseAuth'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Slack App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body><FirebaseAuth>{children}</FirebaseAuth></body>
    </html>
  )
}
