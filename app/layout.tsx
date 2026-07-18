import type { Metadata } from 'next'
import { Playfair_Display, Be_Vietnam_Pro } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif"
});

const beVietnam = Be_Vietnam_Pro({ 
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: 'Bánh Trung Thu Văn Hòa Lạc | Bánh Trung Thu Vũng Tàu Thủ Công Gia Truyền',
  description: 'Bánh Trung Thu Văn Hòa Lạc - Bánh trung thu Vũng Tàu thủ công cao cấp tại Long Điền. Nhân Da Dợp , Đậu Xanh, Gà Quay, Thập Cẩm... Giao hàng toàn quốc. Đặt bánh Tết Trung Thu 2026.',
  keywords: ['banh trung thu văn hòa lạc', 'bánh trung thu vũng tàu', 'văn hòa lạc', 'văn hòa lạc vũng tàu', 'bánh trung thu long điền', 'bánh da dợp văn hòa lạc', 'bánh trung thu thủ công', 'mua bánh trung thu', 'đặt bánh trung thu', 'tết trung thu 2026'],
  authors: [{ name: 'Văn Hòa Lạc Vũng Tàu' }],
  creator: 'Văn Hòa Lạc Vũng Tàu',
  publisher: 'Văn Hòa Lạc Vũng Tàu',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://vanhoalac.vn'),
  alternates: {
    canonical: '/',
    languages: {
      'vi-VN': '/',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'Bánh Trung Thu Văn Hòa Lạc | Bánh Trung Thu Vũng Tàu Thủ Công',
    description: 'Bánh Trung Thu Văn Hòa Lạc - Thương hiệu bánh trung thu Vũng Tàu thủ công cao cấp. Chuyên bánh da dợp. Giao hàng toàn quốc.',
    url: 'https://vanhoalac.vn',
    siteName: 'Bánh Trung Thu Văn Hòa Lạc Vũng Tàu',
    images: [
      {
        url: '/images/hero-mooncakes.jpg',
        width: 1200,
        height: 630,
        alt: 'Bánh Trung Thu Văn Hòa Lạc - Bánh trung thu cao cấp thủ công',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bánh Trung Thu Văn Hòa Lạc | Bánh Trung Thu Vũng Tàu',
    description: 'Bánh Trung Thu Văn Hòa Lạc - Thương hiệu bánh trung thu Vũng Tàu thủ công cao cấp. Giao hàng toàn quốc.',
    images: ['/images/hero-mooncakes.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${beVietnam.variable}`}>
      <head>
        <meta name="google-site-verification" content="RMSB0OSydag4gIrvd75hYd8UPgvCY0rE_pTvGUm7A_4" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
