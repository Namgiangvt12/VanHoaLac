import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ReviewSection } from "@/components/review-section"
import { BlogSection } from "@/components/blog-section"
import { ProductsSection } from "@/components/products-section"
import { YouTubeSection } from "@/components/youtube-section"
import { Footer } from "@/components/footer"

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://vanhoalac.vn/#business",
      "name": "Bánh Trung Thu Văn Hòa Lạc Vũng Tàu",
      "alternateName": ["Văn Hòa Lạc", "Van Hoa Lac Mooncake", "Văn Hòa Lạc Vũng Tàu", "Bánh Trung Thu Vũng Tàu", "Banh Trung Thu Văn Hòa Lạc"],
      "description": "Thương hiệu bánh trung thu Văn Hòa Lạc Vũng Tàu thủ công cao cấp tại Long Điền. Chuyên cung cấp bánh da dợp (3 lớp nhân) và bánh trung thu gà quay, thập cẩm , đậu xanh.... Giao hàng toàn quốc.",
      "url": "https://vanhoalac.vn",
      "telephone": "+84-971682213",
      "email": "xin-chao@vanhoalac.vn",
      "image": "https://vanhoalac.vn/images/hero-mooncakes.jpg",
      "logo": "https://vanhoalac.vn/logo.png",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Đường Phạm Văn Đồng",
        "addressLocality": "Hà Nội",
        "addressRegion": "Hà Nội",
        "postalCode": "100000",
        "addressCountry": "VN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "21.0285",
        "longitude": "105.8542"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:00",
          "closes": "21:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "sameAs": [
        "https://facebook.com/vanhoalac",
        "https://instagram.com/vanhoalac",
        "https://tiktok.com/@vanhoalac"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1250",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://vanhoalac.vn/#website",
      "url": "https://vanhoalac.vn",
      "name": "Bánh Trung Thu Văn Hòa Lạc Vũng Tàu",
      "description": "Thương hiệu bánh trung thu Vũng Tàu thủ công cao cấp tại Long Điền TPHCM",
      "publisher": { "@id": "https://vanhoalac.vn/#business" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://vanhoalac.vn/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "inLanguage": "vi-VN"
    },
    {
      "@type": "WebPage",
      "@id": "https://vanhoalac.vn/#webpage",
      "url": "https://vanhoalac.vn",
      "name": "Bánh Trung Thu Văn Hòa Lạc | Bánh Trung Thu Vũng Tàu Cao Cấp Thủ Công Long Điền TPHCM",
      "isPartOf": { "@id": "https://vanhoalac.vn/#website" },
      "about": { "@id": "https://vanhoalac.vn/#business" },
      "description": "Bánh Trung Thu Văn Hòa Lạc - Thương hiệu bánh trung thu Vũng Tàu thủ công cao cấp tại Long Điền. Chuyên cung cấp bánh da dợp (3 lớp nhân) và bánh trung thu gà quay, thập cẩm , đậu xanh.... Giao hàng toàn quốc.",
      "breadcrumb": { "@id": "https://vanhoalac.vn/#breadcrumb" },
      "inLanguage": "vi-VN",
      "potentialAction": [
        {
          "@type": "ReadAction",
          "target": ["https://vanhoalac.vn"]
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://vanhoalac.vn/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Trang Chủ",
          "item": "https://vanhoalac.vn"
        }
      ]
    },
    {
      "@type": "ItemList",
      "name": "Sản phẩm Bánh Trung Thu Văn Hòa Lạc",
      "description": "Danh sách bánh trung thu cao cấp thủ công",
      "itemListElement": [
        {
          "@type": "Product",
          "position": 1,
          "name": "Bánh Trung Thu Nhân Hạt Sen Văn Hòa Lạc",
          "description": "Bánh trung thu nhân hạt sen truyền thống with kết cấu mịn màng như lụa. Sản phẩm thủ công cao cấp of Văn Hòa Lạc.",
          "image": "https://vanhoalac.vn/images/mooncake-lotus.jpg",
          "brand": {
            "@type": "Brand",
            "name": "Văn Hòa Lạc"
          },
          "offers": {
            "@type": "Offer",
            "url": "https://vanhoalac.vn/san-pham/banh-hat-sen",
            "priceCurrency": "VND",
            "price": "180000",
            "priceValidUntil": "2026-10-31",
            "availability": "https://schema.org/InStock",
            "seller": { "@id": "https://vanhoalac.vn/#business" }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "420"
          }
        },
        {
          "@type": "Product",
          "position": 2,
          "name": "Bánh Trung Thu Nhân Đậu Đỏ Văn Hòa Lạc",
          "description": "Bánh trung thu nhân đậu đỏ azuki ngọt dịu along with hương vị đất nhẹ. Sản phẩm thủ công cao cấp of Văn Hòa Lạc.",
          "image": "https://vanhoalac.vn/images/mooncake-redbean.jpg",
          "brand": {
            "@type": "Brand",
            "name": "Văn Hòa Lạc"
          },
          "offers": {
            "@type": "Offer",
            "url": "https://vanhoalac.vn/san-pham/banh-dau-do",
            "priceCurrency": "VND",
            "price": "160000",
            "priceValidUntil": "2026-10-31",
            "availability": "https://schema.org/InStock",
            "seller": { "@id": "https://vanhoalac.vn/#business" }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "385"
          }
        },
        {
          "@type": "Product",
          "position": 3,
          "name": "Bánh Trung Thu Trứng Muối Văn Hòa Lạc",
          "description": "Bánh trung thu with lòng đỏ trứng muối vàng óng tượng trưng for trăng tròn. Sản phẩm thủ công cao cấp of Văn Hòa Lạc.",
          "image": "https://vanhoalac.vn/images/mooncake-egg.jpg",
          "brand": {
            "@type": "Brand",
            "name": "Văn Hòa Lạc"
          },
          "offers": {
            "@type": "Offer",
            "url": "https://vanhoalac.vn/san-pham/banh-trung-muoi",
            "priceCurrency": "VND",
            "price": "220000",
            "priceValidUntil": "2026-10-31",
            "availability": "https://schema.org/InStock",
            "seller": { "@id": "https://vanhoalac.vn/#business" }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "512"
          }
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Bánh trung thu Văn Hòa Lạc có giao hàng toàn quốc không?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Có, Văn Hòa Lạc giao hàng bánh trung thu toàn quốc with dịch vụ đóng gói bảo quản lạnh chuyên nghiệp, đảm bảo bánh luôn tươi ngon khi reach tay khách hàng."
          }
        },
        {
          "@type": "Question",
          "name": "Bánh trung thu Văn Hòa Lạc có hạn sử dụng bao lâu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bánh trung thu Văn Hòa Lạc có hạn sử dụng 30 ngày starting from ngày sản xuất when bảo quản at nhiệt độ mát (15-20°C). To tối ưu hương vị, nên thưởng thức within 2 tuần."
          }
        },
        {
          "@type": "Question",
          "name": "Văn Hòa Lạc có nhận đặt bánh trung thu số lượng lớn for doanh nghiệp không?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Có, Văn Hòa Lạc nhận đặt bánh trung thu số lượng lớn for doanh nghiệp along with chiết khấu hấp dẫn. Chúng tôi also hỗ trợ in logo and thiết kế hộp quà follow yêu cầu."
          }
        }
      ]
    }
  ]
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <HeroSection />
        <YouTubeSection />
        <AboutSection />
        <ReviewSection />
        <BlogSection />
        <ProductsSection />
      </main>
      <Footer />
    </>
  )
}
