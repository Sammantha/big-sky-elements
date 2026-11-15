'use client'

import Head from 'next/head';
import Menu from './components/menu';
import './Global.css';
import Link from 'next/link';

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

          <footer className='flex justify-around bg-black py-5 text-center'>
            <small className='text-white'>© 2026 Big Sky Elements</small>
            <small className='text-white'>
              website by
              <Link href='http://samthedev.com' className='pl-1 no-underline'>vbstudios</Link>
            </small>
          </footer>
      </body>
    </html>
  )
}

