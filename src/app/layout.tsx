import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import './globals.css'

import { Navbar, ThemeProvider } from '@/components/layout'

import { AtomicState } from 'atomic-state'
import { FetchConfig } from 'http-react'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Home | Courta',
  description: 'Home page'
}

export default function MainLayout({ children }) {
  return (
    <html className='scroll-smooth' suppressHydrationWarning>
      <head>
        <title>Courta</title>
        <meta
          name='description'
          content='A 10-days challenge from my lecturer for Advanced Web subject, Courta is a web app for sports venue reservation using Next.js and MongoDB.'
        />
      </head>

      <body className={GeistSans.className}>
        <ThemeProvider attribute='class' defaultTheme='light'>
          <main className='min-h-screen'>
            <AtomicState>
              <FetchConfig baseUrl='/api'>
                <Navbar />
                {children}
                <Footer />
              </FetchConfig>
            </AtomicState>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
