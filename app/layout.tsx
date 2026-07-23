import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { FloatingCTA } from '@/components/floating-cta'
import { VisitorTracker } from '@/components/visitor-tracker'
import { GoogleAnalytics } from '@/components/google-analytics'
import './globals.css'


const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif"
});


export const metadata: Metadata = {
  title: 'Bánh Trung Thu Văn Hòa Lạc | Bánh Trung Thu Vũng Tàu Thủ Công Gia Truyền',
  description: 'Bánh Trung Thu Văn Hòa Lạc - Bánh trung thu Vũng Tàu thủ công cao cấp tại Long Điền. Nhân Da Dợp , Đậu Xanh, Gà Quay, Thập Cẩm... Giao hàng toàn quốc. Đặt bánh Tết Trung Thu 2026.',
  keywords: ['van hoa lac', 'văn hòa lạc', 'banh trung thu van hoa lac', 'banh trung thu văn hòa lạc', 'bánh trung thu vũng tàu', 'văn hòa lạc vũng tàu', 'van hoa lac vung tau', 'bánh trung thu long điền', 'bánh da dợp văn hòa lạc', 'bánh trung thu thủ công'],
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
    icon: '/icon-dark-32x32.png',
    shortcut: '/icon-dark-32x32.png',
    apple: '/icon-dark-32x32.png',
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  "name": "Bánh Trung Thu Văn Hòa Lạc",
  "image": "https://vanhoalac.vn/images/hero-mooncakes.jpg",
  "@id": "https://vanhoalac.vn",
  "url": "https://vanhoalac.vn",
  "telephone": "0971682213",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "53/12/20 Lê Hồng Phong",
    "addressLocality": "Vũng Tàu",
    "addressRegion": "Bà Rịa - Vũng Tàu",
    "postalCode": "790000",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 10.3566764,
    "longitude": 107.0827754
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "07:00",
    "closes": "21:00"
  },
  "priceRange": "$$"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${playfair.variable}`}>
      <head>
        <meta name="google-site-verification" content="RMSB0OSydag4gIrvd75hYd8UPgvCY0rE_pTvGUm7A_4" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <GoogleAnalytics />
        {children}
        <VisitorTracker />
        <FloatingCTA />
        <Analytics />
      </body>


    </html>
  )
}
