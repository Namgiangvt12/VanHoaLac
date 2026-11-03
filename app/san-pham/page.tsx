import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { 
  PRODUCTS, 
  DEFAULT_SHIPPING_DETAILS, 
  DEFAULT_MERCHANT_RETURN_POLICY 
} from '@/lib/products'
import { ArrowRight, Sparkles, Star, Phone, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Danh Mục Sản Phẩm Bánh Trung Thu | Văn Hòa Lạc Vũng Tàu',
  description: 'Khám phá trọn bộ sản phẩm bánh trung thu thủ công Văn Hòa Lạc Vũng Tàu: Bánh Da Dợp vỏ giòn xốp độc bản (2 trứng, 3 trứng, 6-14 trứng), bánh nướng thập cẩm gà quay, đậu xanh, dừa mè gia truyền từ 1970.',
  alternates: {
    canonical: 'https://vanhoalac.vn/san-pham',
  },
  openGraph: {
    title: 'Danh Mục Sản Phẩm Bánh Trung Thu | Văn Hòa Lạc Vũng Tàu',
    description: 'Trọn bộ bánh trung thu Da Dợp và bánh nướng truyền thống gia truyền từ 1970 tại Văn Hòa Lạc Vũng Tàu. Giao hàng toàn quốc.',
    url: 'https://vanhoalac.vn/san-pham',
    siteName: 'Văn Hòa Lạc Vũng Tàu',
    images: [
      {
        url: '/images/hero-mooncakes.jpg',
        width: 1200,
        height: 630,
        alt: 'Danh mục bánh trung thu Văn Hòa Lạc Vũng Tàu',
      },
    ],
    type: 'website',
  },
}

export default function ProductsCatalogPage() {
  const daDopProducts = PRODUCTS.filter(p => p.category.toLowerCase().includes('da dợp'))
  const nuongProducts = PRODUCTS.filter(p => !daDopProducts.includes(p))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://vanhoalac.vn/san-pham/#webpage",
        "url": "https://vanhoalac.vn/san-pham",
        "name": "Danh Mục Sản Phẩm Bánh Trung Thu Văn Hòa Lạc Vũng Tàu",
        "description": "Danh sách toàn bộ sản phẩm bánh trung thu thủ công gia truyền từ năm 1970 tại Văn Hòa Lạc Vũng Tàu.",
        "isPartOf": { "@id": "https://vanhoalac.vn/#website" },
        "about": { "@id": "https://vanhoalac.vn/#business" }
      },
      {
        "@type": "ItemList",
        "name": "Danh Mục Bánh Trung Thu Văn Hòa Lạc Vũng Tàu",
        "numberOfItems": PRODUCTS.length,
        "itemListElement": PRODUCTS.map((product, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Product",
            "@id": `https://vanhoalac.vn/san-pham/${product.slug}/#product`,
            "name": `${product.name} - Văn Hòa Lạc Vũng Tàu`,
            "url": `https://vanhoalac.vn/san-pham/${product.slug}`,
            "image": `https://vanhoalac.vn${product.image}`,
            "description": product.description,
            "brand": {
              "@type": "Brand",
              "name": "Văn Hòa Lạc Vũng Tàu"
            },
            "offers": {
              "@type": "Offer",
              "url": `https://vanhoalac.vn/san-pham/${product.slug}`,
              "priceCurrency": "VND",
              "price": product.priceValue.toString(),
              "priceValidUntil": "2027-12-31",
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition",
              "shippingDetails": DEFAULT_SHIPPING_DETAILS,
              "hasMerchantReturnPolicy": DEFAULT_MERCHANT_RETURN_POLICY
            }
          }
        }))
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-28 md:pt-32 pb-24 px-4 sm:px-6 min-h-screen bg-[#F7F3EC]">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={[{ label: 'Sản Phẩm', href: '/san-pham' }]} />

          <div className="bg-[#FFFCF7] border border-[#E8E1D5] rounded-[28px] md:rounded-[36px] p-6 sm:p-10 md:p-14 shadow-xs mt-4">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F3EC] border border-[#E8E1D5] text-[#7A2935] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#B58A4A]" />
                <span>Gia Truyền Từ Năm 1970</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#30251F] tracking-tight leading-tight mb-4">
                Danh Mục Bánh Trung Thu Văn Hòa Lạc
              </h1>
              <p className="text-base sm:text-lg text-[#30251F]/75 leading-relaxed">
                Tất cả dòng bánh trung thu thủ công chính hãng tại Văn Hòa Lạc Vũng Tàu: từ tuyệt phẩm <strong>Bánh Da Dợp</strong> vỏ nhiều tầng giòn xốp độc bản đến dòng <strong>Bánh Nướng truyền thống</strong> chuẩn vị xưa.
              </p>
            </div>

            {/* Nhóm 1: Bánh Da Dợp */}
            <section className="mb-14" aria-labelledby="cat-da-dop">
              <div className="flex items-center gap-4 mb-6">
                <h2 id="cat-da-dop" className="px-5 py-2 rounded-full bg-[#7A2935] text-[#FFFCF7] text-xs font-bold uppercase tracking-widest">
                  Bánh Da Dợp Thập Cẩm Độc Bản
                </h2>
                <div className="flex-1 h-px bg-[#E8E1D5]" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {daDopProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/san-pham/${product.slug}`}
                    className="group flex flex-col justify-between rounded-[24px] bg-[#F7F3EC]/60 border border-[#E8E1D5] hover:border-[#B58A4A] p-4 transition-all hover:shadow-lg"
                  >
                    <div>
                      <div className="relative aspect-[4/5] rounded-[18px] overflow-hidden bg-[#EFE9DF] mb-4">
                        <Image
                          src={product.image}
                          alt={`${product.name} - Văn Hòa Lạc Vũng Tàu`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FFFCF7]/95 text-[#7A2935] border border-[#E8E1D5]">
                          <Star size={11} className="text-[#B58A4A] fill-[#B58A4A]" />
                          <span>Da Dợp Độc Bản</span>
                        </div>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#30251F] group-hover:text-[#7A2935] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#766960] mt-1 font-medium">
                        Trọng lượng: {product.weight}
                      </p>
                      <p className="text-sm text-[#30251F]/75 mt-2 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#E8E1D5] flex items-center justify-between">
                      <span className="font-serif text-lg font-bold text-[#7A2935]">{product.price}</span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#B58A4A] group-hover:translate-x-0.5 transition-transform">
                        Xem chi tiết <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Nhóm 2: Bánh Nướng Truyền Thống */}
            <section className="mb-12" aria-labelledby="cat-nuong">
              <div className="flex items-center gap-4 mb-6">
                <h2 id="cat-nuong" className="px-5 py-2 rounded-full bg-[#30251F] text-[#FFFCF7] text-xs font-bold uppercase tracking-widest">
                  Bánh Trung Thu Nướng Truyền Thống
                </h2>
                <div className="flex-1 h-px bg-[#E8E1D5]" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {nuongProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/san-pham/${product.slug}`}
                    className="group flex flex-col justify-between rounded-[24px] bg-[#F7F3EC]/60 border border-[#E8E1D5] hover:border-[#B58A4A] p-4 transition-all hover:shadow-lg"
                  >
                    <div>
                      <div className="relative aspect-[4/5] rounded-[18px] overflow-hidden bg-[#EFE9DF] mb-4">
                        <Image
                          src={product.image}
                          alt={`${product.name} - Văn Hòa Lạc Vũng Tàu`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FFFCF7]/95 text-[#30251F] border border-[#E8E1D5]">
                          {product.category}
                        </div>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#30251F] group-hover:text-[#7A2935] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#766960] mt-1 font-medium">
                        Trọng lượng: {product.weight}
                      </p>
                      <p className="text-xs text-[#30251F]/75 mt-2 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#E8E1D5] flex items-center justify-between">
                      <span className="font-serif text-base font-bold text-[#7A2935]">{product.price}</span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#B58A4A]">
                        Chi tiết <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA & Internal Links */}
            <div className="rounded-[24px] bg-[#F7F3EC] border border-[#E8E1D5] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-xl">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#30251F]">
                  Đặt Bánh Lẻ & Quà Biếu Doanh Nghiệp
                </h2>
                <p className="text-sm text-[#30251F]/75">
                  Tìm hiểu thêm về <Link href="/bai-viet/tu-lo-banh-gia-truyen-1970-den-thuong-hieu-chinh-hang-hom-nay" className="text-[#7A2935] font-semibold underline underline-offset-2">hành trình từ lò bánh gia truyền 1970</Link> hoặc <Link href="/bai-viet/goi-y-set-qua-bieu-cuoi-nam-tu-thuong-hieu-chinh-hang-56-nam-van-hoa-lac" className="text-[#7A2935] font-semibold underline underline-offset-2">gợi ý set quà biếu chính hãng Văn Hòa Lạc</Link>.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <a
                  href="https://zalo.me/0971682213"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#7A2935] hover:bg-[#581C25] text-[#FFFCF7] text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full transition-colors"
                >
                  <MessageCircle size={15} />
                  <span>Đặt Qua Zalo</span>
                </a>
                <a
                  href="tel:0971682213"
                  className="inline-flex items-center gap-2 bg-[#FFFCF7] border border-[#7A2935] text-[#7A2935] text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full hover:bg-[#7A2935]/5 transition-colors"
                >
                  <Phone size={15} />
                  <span>0971.682.213</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
