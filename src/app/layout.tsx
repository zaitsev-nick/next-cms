import '@/assets/scss/tailwind.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/providers/AuthProvider';
import LayoutMain from '@/components/layout/LayoutMain';
import { Nunito, Work_Sans, EB_Garamond, Kaushan_Script, Alex_Brush } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['300','400','500','600', '700'],
  display: 'swap',
})
const work_sans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['300','400','500','600', '700'],
  display: 'swap',
})
const eb_garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  weight: ['400'],
  display: 'swap',
})
const kaushan = Kaushan_Script({
  subsets: ['latin'],
  variable: '--font-kaushan',
  weight: ['400'],
  display: 'swap',
})
const alex = Alex_Brush({
  subsets: ['latin'],
  variable: '--font-alex',
  weight: ['400'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Next CMS',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${work_sans.variable} ${eb_garamond.variable} ${kaushan.variable} ${alex.variable} font-nunito text-base text-black dark:text-white dark:bg-slate-900`}>
        <AuthProvider>
          <LayoutMain>
            {children}
          </LayoutMain>
        </AuthProvider>
      </body>
    </html>
  )
}
