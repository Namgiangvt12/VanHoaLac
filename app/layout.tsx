import type { Metadata } from 'next'
import { Playfair_Display, Be_Vietnam_Pro } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { FloatingCTA } from '@/components/floating-cta'
import { CookieConsent } from '@/components/cookie-consent'
import { VisitorTracker } from '@/components/visitor-tracker'
import { GoogleAnalytics } from '@/components/google-analytics'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { IntroCurtainLoader } from '@/components/intro-curtain-loader'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: 'swap',
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: 'swap',
});


export const metadata: Metadata = {
  title: 'Văn Hòa Lạc Vũng Tàu | Bánh Trung Thu Gia Truyền Thủ Công Độc Bản',
  description: 'Văn Hòa Lạc Vũng Tàu - Thương hiệu bánh trung thu thủ công gia truyền từ năm 1970. Nổi tiếng với bánh Da Dợp vỏ giòn xốp độc bản, bánh nướng thập cẩm gà quay và giao hàng toàn quốc.',
  keywords: ['văn hòa lạc vũng tàu', 'van hoa lac vung tau', 'văn hòa lạc', 'bánh trung thu văn hòa lạc vũng tàu', 'banh trung thu van hoa lac vung tau', 'tiệm bánh văn hòa lạc vũng tàu', 'bánh trung thu vũng tàu', 'bánh da dợp văn hòa lạc'],
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
    title: 'Văn Hòa Lạc Vũng Tàu | Bánh Trung Thu Gia Truyền Thủ Công',
    description: 'Văn Hòa Lạc Vũng Tàu - Thương hiệu bánh trung thu thủ công gia truyền từ năm 1970. Nổi tiếng với bánh Da Dợp vỏ giòn xốp độc bản, bánh nướng thập cẩm gà quay và giao hàng toàn quốc.',
    url: 'https://vanhoalac.vn',
    siteName: 'Văn Hòa Lạc Vũng Tàu',
    images: [
      {
        url: '/images/hero-mooncakes.jpg',
        width: 1200,
        height: 630,
        alt: 'Văn Hòa Lạc Vũng Tàu - Bánh trung thu gia truyền cao cấp',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Văn Hòa Lạc Vũng Tàu | Bánh Trung Thu Gia Truyền',
    description: 'Văn Hòa Lạc Vũng Tàu - Thương hiệu bánh trung thu thủ công gia truyền từ năm 1970. Nổi tiếng với bánh Da Dợp vỏ giòn xốp độc bản.',
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
    icon: '/icon-dark-32x32.png',
    shortcut: '/icon-dark-32x32.png',
    apple: '/icon-dark-32x32.png',
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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3196172423187525"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <SmoothScrollProvider>
          <IntroCurtainLoader />
          <GoogleAnalytics />
          {children}
          <VisitorTracker />
          <FloatingCTA />
          <CookieConsent />
          <Analytics />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}

