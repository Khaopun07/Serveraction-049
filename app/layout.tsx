// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ระบบจัดการนักศึกษา',
  description: 'ระบบจัดการนักศึกษา Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body>
        {children}
      </body>
    </html>
  )
}
