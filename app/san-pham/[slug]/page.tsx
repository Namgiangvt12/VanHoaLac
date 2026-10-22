import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { 
  getProductBySlug, 
  getAllProductSlugs, 
  PRODUCTS 
} from '@/lib/products'
import { 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Package, 
  CheckCircle2, 
  Flame,
  ArrowRight
} from 'lucide-react'

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params
  const product = getProductBySlug(resolvedParams.slug)

  if (!product) {
    return {
      title: 'Sản Phẩm Không Tồn Tại | Văn Hòa Lạc Vũng Tàu',
      description: 'Không tìm thấy thông tin sản phẩm yêu cầu tại tiệm bánh Văn Hòa Lạc Vũng Tàu.'
    }
  }

  const title = `${product.name} | Văn Hòa Lạc Vũng Tàu`
  const description = `${product.description} Giá: ${product.price}. Trọng lượng: ${product.weight}. Gia truyền từ 1970 tại Văn Hòa Lạc Vũng Tàu. Hotline đặt bánh: 0971.682.213.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://vanhoalac.vn/san-pham/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://vanhoalac.vn/san-pham/${product.slug}`,
      siteName: 'Văn Hòa Lạc Vũng Tàu',
      images: [
        {
          url: product.image,
          width: 800,
          height: 1000,
          alt: `${product.name} - Văn Hòa Lạc Vũng Tàu`,
        },
      ],
      type: 'website',
    },
  }
}

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params
  const product = getProductBySlug(resolvedParams.slug)

  if (!product) {
    notFound()
  }

  // Schema.org Product structured data
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://vanhoalac.vn/san-pham/${product.slug}/#product`,
    "name": `${product.name} - Văn Hòa Lạc Vũng Tàu`,
    "alternateName": product.shortName,
    "image": `https://vanhoalac.vn${product.image}`,
    "description": product.longDescription,
    "category": product.category,
    "brand": {
      "@type": "Brand",
      "name": "Văn Hòa Lạc Vũng Tàu"
    },
    "manufacturer": {
      "@type": "Bakery",
      "name": "Văn Hòa Lạc Vũng Tàu",
      "url": "https://vanhoalac.vn",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "174 Nguyễn Văn Trỗi",
        "addressLocality": "Phường Vũng Tàu",
        "addressRegion": "TP. Hồ Chí Minh",
        "postalCode": "700000",
        "addressCountry": "VN"
      }
    },
    "offers": {
      "@type": "Offer",
      "url": `https://vanhoalac.vn/san-pham/${product.slug}`,
      "priceCurrency": "VND",
      "price": product.priceValue.toString(),
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Bakery",
        "name": "Văn Hòa Lạc Vũng Tàu",
        "telephone": "+84-971682213",
        "url": "https://vanhoalac.vn"
      }
    }
  }

  const relatedProducts = PRODUCTS.filter(p => p.slug !== product.slug).slice(0, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Header />
      <main className="pt-28 md:pt-32 pb-24 px-4 sm:px-6 min-h-screen bg-[#F7F3EC]">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[
              { label: "Sản Phẩm", href: "/#products" },
              { label: product.name, href: `/san-pham/${product.slug}` }
            ]} 
          />

          {/* Product Canvas Container */}
          <div className="bg-[#FFFCF7] border border-[#E8E1D5] rounded-[28px] md:rounded-[36px] p-6 sm:p-10 md:p-14 shadow-xs mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left: Product Image */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-[#F7F3EC] border border-[#E8E1D5] shadow-xs sticky top-28">
                  <Image
                    src={product.image}
                    alt={`${product.name} - Văn Hòa Lạc Vũng Tàu`}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-[#7A2935] text-[#FFFCF7] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                      {product.category}
                    </span>
                    <span className="bg-[#B58A4A] text-[#FFFCF7] text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Văn Hòa Lạc Vũng Tàu
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Product Info & Order CTAs */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#B58A4A] font-bold mb-2">
                    Bánh Trung Thu Thủ Công Gia Truyền Từ 1970
                  </p>
                  <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#30251F] leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-sm text-[#30251F]/70 mt-2 font-medium">
                    Thương hiệu chính gốc: <span className="text-[#30251F] font-semibold">Văn Hòa Lạc Vũng Tàu</span>
                  </p>

                  {/* Price Display */}
                  <div className="mt-6 p-4 rounded-2xl bg-[#F7F3EC] border border-[#E8E1D5] flex items-baseline gap-3">
                    <span className="text-3xl md:text-4xl font-serif font-bold text-[#7A2935]">
                      {product.price}
                    </span>
                    <span className="text-xs text-[#30251F]/70">
                      / chiếc ({product.weight}) • Đã gồm đóng gói cao cấp
                    </span>
                  </div>

                  {/* Highlight Chip */}
                  <div className="mt-4 flex items-center gap-2 text-sm text-[#30251F] font-medium bg-[#B58A4A]/10 border border-[#B58A4A]/25 px-3.5 py-2 rounded-xl">
                    <Flame className="w-4 h-4 text-[#B58A4A] shrink-0" />
                    <span>{product.highlight}</span>
                  </div>

                  {/* Description */}
                  <div className="mt-6 space-y-3 text-[#30251F]/75 leading-relaxed">
                    <p className="text-base text-[#30251F] font-medium">
                      {product.description}
                    </p>
                    <p className="text-sm">
                      {product.longDescription}
                    </p>
                  </div>

                  {/* CTA Order Buttons */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link
                      href="https://zalo.me/0971682213"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#7A2935] text-[#FFFCF7] font-semibold px-6 py-4 rounded-full hover:bg-[#631f29] transition-all shadow-sm text-sm uppercase tracking-wider"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Đặt Bánh Qua Zalo
                    </Link>

                    <Link
                      href="tel:0971682213"
                      className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#FFFCF7] border border-[#7A2935] text-[#7A2935] font-semibold px-6 py-4 rounded-full hover:bg-[#7A2935]/5 transition-all text-sm uppercase tracking-wider"
                    >
                      <Phone className="w-5 h-5" />
                      Hotline: 0971.682.213
                    </Link>
                  </div>
                  <p className="text-xs text-[#30251F]/60 mt-2.5 text-center sm:text-left">
                    * Hỗ trợ tư vấn số lượng lớn, in logo thiệp chúc cho doanh nghiệp & giao tận nơi toàn quốc.
                  </p>
                </div>

                {/* Specifications Table (AI Overview & RAG Optimized) */}
                <div className="border border-[#E8E1D5] rounded-2xl p-5 bg-[#F7F3EC]/50 space-y-4">
                  <h3 className="font-serif font-bold text-lg text-[#30251F] flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#7A2935]" />
                    Thông Số & Đặc Điểm Sản Phẩm
                  </h3>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div className="border-b border-[#E8E1D5] pb-2">
                      <dt className="text-[#30251F]/60 text-xs uppercase tracking-wider">Trọng Lượng</dt>
                      <dd className="font-semibold text-[#30251F] mt-0.5">{product.weight}</dd>
                    </div>
                    <div className="border-b border-[#E8E1D5] pb-2">
                      <dt className="text-[#30251F]/60 text-xs uppercase tracking-wider">Hạn Bảo Quản</dt>
                      <dd className="font-semibold text-[#30251F] mt-0.5">{product.shelfLife}</dd>
                    </div>
                    <div className="border-b border-[#E8E1D5] pb-2 sm:col-span-2">
                      <dt className="text-[#30251F]/60 text-xs uppercase tracking-wider">Thành Phần Chọn Lọc</dt>
                      <dd className="font-medium text-[#30251F] mt-0.5">
                        {product.ingredients.join(' • ')}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-[#30251F]/60 text-xs uppercase tracking-wider">Hướng Dẫn Bảo Quản</dt>
                      <dd className="font-medium text-[#30251F]/80 mt-0.5">{product.storage}</dd>
                    </div>
                  </dl>
                </div>

                {/* E-E-A-T Trust Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F7F3EC] border border-[#E8E1D5] text-xs text-[#30251F]">
                    <CheckCircle2 className="w-4 h-4 text-[#7A2935] shrink-0" />
                    <span>100% Nguyên liệu tươi tuyển chọn</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F7F3EC] border border-[#E8E1D5] text-xs text-[#30251F]">
                    <ShieldCheck className="w-4 h-4 text-[#7A2935] shrink-0" />
                    <span>Không chất bảo quản độc hại</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F7F3EC] border border-[#E8E1D5] text-xs text-[#30251F]">
                    <Clock className="w-4 h-4 text-[#7A2935] shrink-0" />
                    <span>Gia truyền hơn 50 năm (từ 1970)</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F7F3EC] border border-[#E8E1D5] text-xs text-[#30251F]">
                    <Sparkles className="w-4 h-4 text-[#B58A4A] shrink-0" />
                    <span>Chính gốc Văn Hòa Lạc Vũng Tàu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-16 bg-[#FFFCF7] border border-[#E8E1D5] rounded-[28px] md:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-xs">
            <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 gap-2">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B58A4A] font-bold">Khám Phá Thêm</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#30251F] mt-1">
                  Các Loại Bánh Trung Thu Khác Tại Văn Hòa Lạc Vũng Tàu
                </h2>
              </div>
              <Link 
                href="/#products" 
                className="text-xs uppercase tracking-wider font-bold text-[#7A2935] hover:underline inline-flex items-center gap-1"
              >
                Xem tất cả bánh <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <Link 
                  key={item.id} 
                  href={`/san-pham/${item.slug}`}
                  className="group block rounded-[24px] bg-[#F7F3EC]/70 border border-[#E8E1D5] overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E1D5]/40">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B58A4A]">
                      {item.category}
                    </span>
                    <h3 className="font-serif font-bold text-base text-[#30251F] group-hover:text-[#7A2935] transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#7A2935]">
                      {item.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
