import Providers from '@/components/Providers'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata = {
  title: 'Blabber',
  description: 'Focused, real-time chat for professionals.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={GeistSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}