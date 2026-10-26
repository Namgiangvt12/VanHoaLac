import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HeritageTiltedShowcase } from "@/components/heritage-tilted-showcase"
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
      "name": "Văn Hòa Lạc Vũng Tàu",
      "alternateName": [
        "Văn Hòa Lạc Vũng Tàu",
        "Bánh Trung Thu Văn Hòa Lạc Vũng Tàu",
        "Van Hoa Lac Vung Tau",
        "Văn Hòa Lạc",
        "Van Hoa Lac",
        "Tiệm Bánh Văn Hòa Lạc Vũng Tàu"
      ],
      "description": "Văn Hòa Lạc Vũng Tàu là thương hiệu bánh trung thu thủ công gia truyền từ năm 1970. Chuyên cung cấp bánh Da Dợp độc bản vỏ giòn xốp, bánh nướng thập cẩm gà quay, đậu xanh hạt sen và giao hàng toàn quốc.",
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
          "name": "Văn Hòa Lạc Vũng Tàu là gì và có nguồn gốc từ đâu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Văn Hòa Lạc Vũng Tàu là thương hiệu bánh trung thu thủ công gia truyền có lịch sử từ năm 1970 (hơn 50 năm). Văn Hòa Lạc Vũng Tàu nức tiếng với phương pháp làm bánh thủ công truyền thống, sử dụng nguyên liệu tuyển chọn tươi sạch và đặc biệt là dòng bánh Da Dợp độc bản với lớp vỏ nhiều lớp giòn xốp."
          }
        },
        {
          "@type": "Question",
          "name": "Văn Hòa Lạc Vũng Tàu có những sản phẩm bánh nào nổi bật?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Văn Hòa Lạc Vũng Tàu chuyên các dòng bánh trung thu thủ công cao cấp: Bánh Da Dợp thập cẩm xá xíu 2 trứng và 3 trứng, bánh nướng thập cẩm gà quay ngũ nhân, bánh nướng đậu xanh sầu riêng, hạt sen và các hộp quà biếu tặng sang trọng."
          }
        },
        {
          "@type": "Question",
          "name": "Địa chỉ mua bánh và hotline của Văn Hòa Lạc Vũng Tàu ở đâu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Khách hàng có thể mua bánh Văn Hòa Lạc Vũng Tàu trực tiếp tại điểm bán: 174 Nguyễn Văn Trỗi, Phường Vũng Tàu, TP. Hồ Chí Minh (Hotline/Zalo: 0971.682.213), mở cửa từ 08:00 - 21:00 hàng ngày, hoặc đặt hàng trực tuyến giao tận nơi toàn quốc qua website chính thức vanhoalac.vn."
          }
        },
        {
          "@type": "Question",
          "name": "Bánh trung thu Văn Hòa Lạc Vũng Tàu bảo quản được trong bao lâu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bánh trung thu thủ công Văn Hòa Lạc Vũng Tàu có hạn sử dụng tốt nhất từ 20 đến 30 ngày kể từ ngày sản xuất khi còn nguyên bao bì hút chân không, bảo quản ở nơi khô ráo thoáng mát (15-20°C). Sau khi mở gói hoặc cắt bánh, quý khách nên bọc kín bằng màng bọc thực phẩm, bảo quản trong ngăn mát tủ lạnh và dùng ngon nhất trong vòng 4 đến 6 ngày. Bánh hoàn toàn không sử dụng chất bảo quản độc hại."
          }
        },
        {
          "@type": "Question",
          "name": "Văn Hòa Lạc Vũng Tàu có chính sách đặt hàng cho doanh nghiệp không?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Có, Văn Hòa Lạc Vũng Tàu cung cấp dịch vụ đặt bánh trung thu số lượng lớn cho công ty và doanh nghiệp, hỗ trợ in logo thương hiệu trên hộp quà, xuất hóa đơn VAT đầy đủ và chính sách chiết khấu hấp dẫn."
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
        <HeritageTiltedShowcase />
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
