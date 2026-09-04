import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HotSetSection } from "@/components/hot-set-section"
import { AboutSection } from "@/components/about-section"
import { ReviewSection } from "@/components/review-section"
import { BlogSection } from "@/components/blog-section"
import { ProductsSection } from "@/components/products-section"
import { YouTubeSection } from "@/components/youtube-section"
import { Footer } from "@/components/footer"

export const dynamic = 'force-dynamic'

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Bakery", "LocalBusiness"],
      "@id": "https://vanhoalac.vn/#business",
      "name": "Bánh Trung Thu Văn Hòa Lạc Vũng Tàu",
      "alternateName": ["Van Hoa Lac", "Văn Hòa Lạc", "Van Hoa Lac Mooncake", "Văn Hòa Lạc Vũng Tàu", "Bánh Trung Thu Vũng Tàu", "Banh Trung Thu Văn Hòa Lạc"],
      "description": "Thương hiệu bánh trung thu Văn Hòa Lạc Vũng Tàu thủ công cao cấp tại Long Điền. Chuyên cung cấp bánh da dợp (3 lớp nhân) và bánh trung thu gà quay, thập cẩm, đậu xanh... Giao hàng toàn quốc.",
      "url": "https://vanhoalac.vn",
      "telephone": "+84-971682213",
      "email": "xin-chao@vanhoalac.vn",
      "image": "https://vanhoalac.vn/images/hero-mooncakes.JPG",
      "logo": "https://vanhoalac.vn/logo.png",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "174 Nguyễn Văn Trỗi",
        "addressLocality": "Phường Vũng Tàu",
        "addressRegion": "TP. Hồ Chí Minh",
        "postalCode": "700000",
        "addressCountry": "VN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "10.3585353",
        "longitude": "107.0790819"
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
        "https://www.facebook.com/banh.vanhoalac",
        "https://instagram.com/vanhoalac",
        "https://tiktok.com/@vanhoalac",
        "https://www.google.com/maps?cid=10604868065099837957"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://vanhoalac.vn/#website",
      "url": "https://vanhoalac.vn",
      "name": "Bánh Trung Thu Văn Hòa Lạc Vũng Tàu",
      "description": "Thương hiệu bánh trung thu Vũng Tàu thủ công cao cấp tại Long Điền - Vũng Tàu",
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
      "name": "Bánh Trung Thu Văn Hòa Lạc | Bánh Trung Thu Vũng Tàu Cao Cấp Thủ Công Long Điền",
      "isPartOf": { "@id": "https://vanhoalac.vn/#website" },
      "about": { "@id": "https://vanhoalac.vn/#business" },
      "description": "Bánh trung thu Da Dợp Văn Hòa Lạc chính gốc Vũng Tàu. Đặt sớm nhận ưu đãi, giao tận nơi. Xem bảng giá & đặt hàng ngay hôm nay!",
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
      "description": "Danh sách bánh trung thu cao cấp thủ công chính hãng",
      "itemListElement": [
        {
          "@type": "Product",
          "position": 1,
          "name": "Bánh Da Dợp Thập Cẩm 2 Trứng Văn Hòa Lạc",
          "description": "Bánh trung thu da dợp đặc sắc 2 trứng hòa quyện hương vị gia truyền Văn Hòa Lạc. Sản phẩm thủ công cao cấp.",
          "image": "https://vanhoalac.vn/images/banh-da-dop-2-trung.png",
          "brand": {
            "@type": "Brand",
            "name": "Văn Hòa Lạc"
          },
          "offers": {
            "@type": "Offer",
            "url": "https://vanhoalac.vn/#products",
            "priceCurrency": "VND",
            "price": "130000",
            "validFrom": "2024-01-01",
            "priceValidUntil": "2026-10-31",
            "availability": "https://schema.org/InStock",
            "seller": { "@id": "https://vanhoalac.vn/#business" },
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingRate": {
                "@type": "MonetaryAmount",
                "value": "30000",
                "currency": "VND"
              },
              "shippingDestination": {
                "@type": "DefinedRegion",
                "addressCountry": "VN"
              },
              "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "handlingTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 0,
                  "maxValue": 1,
                  "unitCode": "DAY"
                },
                "transitTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 1,
                  "maxValue": 3,
                  "unitCode": "DAY"
                }
              }
            },
            "hasMerchantReturnPolicy": {
              "@type": "MerchantReturnPolicy",
              "applicableCountry": "VN",
              "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
              "merchantReturnDays": 7,
              "returnMethod": "https://schema.org/ReturnByMail",
              "returnFees": "https://schema.org/ReturnShippingFees"
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.95",
            "reviewCount": "128",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": "Quyên Bùi"
              },
              "datePublished": "2025-08-15",
              "reviewBody": "Bánh nó ngon lắm mn ơi, chủ nhiệt tình dễ thương nữa"
            }
          ]
        },
        {
          "@type": "Product",
          "position": 2,
          "name": "Bánh Da Dợp Thập Cẩm 3 Trứng Văn Hòa Lạc",
          "description": "Bánh trung thu da dợp cao cấp 3 trứng thơm ngon đặc biệt từ thương hiệu gia truyền Văn Hòa Lạc.",
          "image": "https://vanhoalac.vn/images/banh-da-dop-3-trung.png",
          "brand": {
            "@type": "Brand",
            "name": "Văn Hòa Lạc"
          },
          "offers": {
            "@type": "Offer",
            "url": "https://vanhoalac.vn/#products",
            "priceCurrency": "VND",
            "price": "165000",
            "validFrom": "2024-01-01",
            "priceValidUntil": "2026-10-31",
            "availability": "https://schema.org/InStock",
            "seller": { "@id": "https://vanhoalac.vn/#business" },
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingRate": {
                "@type": "MonetaryAmount",
                "value": "30000",
                "currency": "VND"
              },
              "shippingDestination": {
                "@type": "DefinedRegion",
                "addressCountry": "VN"
              },
              "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "handlingTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 0,
                  "maxValue": 1,
                  "unitCode": "DAY"
                },
                "transitTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 1,
                  "maxValue": 3,
                  "unitCode": "DAY"
                }
              }
            },
            "hasMerchantReturnPolicy": {
              "@type": "MerchantReturnPolicy",
              "applicableCountry": "VN",
              "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
              "merchantReturnDays": 7,
              "returnMethod": "https://schema.org/ReturnByMail",
              "returnFees": "https://schema.org/ReturnShippingFees"
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.95",
            "reviewCount": "96",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": "Trâm Trần"
              },
              "datePublished": "2025-08-18",
              "reviewBody": "Bánh ăn ngon lắm, năm nào cũng chờ tới mùa mới đc ăn. Bé chủ tiệm dễ thương lại nhiệt tình, sẽ ủng hộ shop nữa nha"
            }
          ]
        },
        {
          "@type": "Product",
          "position": 3,
          "name": "Bánh Da Dợp Ngoại Cỡ 6-10-12-14 Trứng Văn Hòa Lạc",
          "description": "Bánh trung thu da dợp ngoại cỡ cao cấp thượng hạng, biểu trưng cho sự viên mãn đoàn viên.",
          "image": "https://vanhoalac.vn/images/banh-da-dop-big.png",
          "brand": {
            "@type": "Brand",
            "name": "Văn Hòa Lạc"
          },
          "offers": {
            "@type": "Offer",
            "url": "https://vanhoalac.vn/#products",
            "priceCurrency": "VND",
            "price": "460000",
            "validFrom": "2024-01-01",
            "priceValidUntil": "2026-10-31",
            "availability": "https://schema.org/InStock",
            "seller": { "@id": "https://vanhoalac.vn/#business" },
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingRate": {
                "@type": "MonetaryAmount",
                "value": "30000",
                "currency": "VND"
              },
              "shippingDestination": {
                "@type": "DefinedRegion",
                "addressCountry": "VN"
              },
              "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "handlingTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 0,
                  "maxValue": 1,
                  "unitCode": "DAY"
                },
                "transitTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 1,
                  "maxValue": 3,
                  "unitCode": "DAY"
                }
              }
            },
            "hasMerchantReturnPolicy": {
              "@type": "MerchantReturnPolicy",
              "applicableCountry": "VN",
              "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
              "merchantReturnDays": 7,
              "returnMethod": "https://schema.org/ReturnByMail",
              "returnFees": "https://schema.org/ReturnShippingFees"
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.95",
            "reviewCount": "72",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": "Diễm Phạm"
              },
              "datePublished": "2025-08-20",
              "reviewBody": "Bánh ngọt vừa phải, ko hương liệu ko chất bảo quản nên cả nhà yên tâm về chất lượng. Tư vấn và giao hàng nhiệt tình"
            }
          ]
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
            "text": "Có, Văn Hòa Lạc giao hàng bánh trung thu toàn quốc với dịch vụ đóng gói bảo quản an toàn chuyên nghiệp, đảm bảo bánh luôn tươi ngon khi tới tay khách hàng."
          }
        },
        {
          "@type": "Question",
          "name": "Bánh trung thu Văn Hòa Lạc có hạn sử dụng bao lâu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bánh trung thu Văn Hòa Lạc có hạn sử dụng 30 ngày kể từ ngày sản xuất khi bảo quản ở nhiệt độ mát (15-20°C). Để tối ưu hương vị thơm ngon nhất, nên thưởng thức trong vòng 2 tuần."
          }
        },
        {
          "@type": "Question",
          "name": "Văn Hòa Lạc có nhận đặt bánh trung thu số lượng lớn cho doanh nghiệp không?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Có, Văn Hòa Lạc nhận đặt bánh trung thu số lượng lớn cho doanh nghiệp cùng chính sách chiết khấu hấp dẫn. Chúng tôi cũng hỗ trợ in logo và thiết kế hộp quà theo yêu cầu riêng."
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
        <HotSetSection />
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
