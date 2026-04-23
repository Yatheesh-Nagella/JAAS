import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jester-as-a-Service',
  description: 'AI-powered joke delivery with cache reconciliation',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 antialiased">
        {children}
      </body>
    </html>
  )
}
