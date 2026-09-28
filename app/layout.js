'use client'

import Head from 'next/head';
import Menu from './components/menu';
import './Global.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <Head>
            <title>Big Sky Elements</title>
            <link rel="icon" href="/favicon.ico" />
            {/* Tailwind CSS responsive setup */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>

          <main className='overflow-hidden'>
            <Menu></Menu>
            {children}
          </main>

          <footer></footer>
      </body>
    </html>
  )
}

