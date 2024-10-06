import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import './globals.css'

import { AuthProvider, Navbar, ThemeProvider } from '@/components/layout'

import { AtomicState } from 'atomic-state'
import { FetchConfig } from 'http-react'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page '
}

export default function MainLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <title>Courta</title>
        <meta
          name='description'
          content='A 10-days challenge from my lecturer for Advanced Web subject, Courta is a web app for sports venue reservation using Next.js and MongoDB.'
        />
      </head>

      <body className={GeistSans.className}>
        <ThemeProvider attribute='class' defaultTheme='system'>
          <main className='min-h-screen'>
            <AuthProvider>
              <AtomicState>
                <FetchConfig baseUrl='/api'>
                  <Navbar />
                  <div className='container mx-auto py-8 px-6 md:px-8'>
                    {children}
                  </div>
                </FetchConfig>
              </AtomicState>
            </AuthProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
