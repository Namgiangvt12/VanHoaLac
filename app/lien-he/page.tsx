import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Liên Hệ Văn Hòa Lạc | Điểm Bán Bánh Trung Thu Vũng Tàu",
  description: "Trang liên hệ và thông tin bản đồ, hotline của hiệu bánh trung thu Văn Hòa Lạc tại Vũng Tàu. Hỗ trợ đặt bánh trực tuyến và giải đáp khách hàng.",
  alternates: {
    canonical: "https://vanhoalac.vn/lien-he",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://vanhoalac.vn/lien-he/#webpage",
  "url": "https://vanhoalac.vn/lien-he",
  "name": "Liên Hệ Bánh Trung Thu Văn Hòa Lạc Vũng Tàu",
  "isPartOf": { "@id": "https://vanhoalac.vn/#website" },
  "about": { "@id": "https://vanhoalac.vn/#business" }
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-28 md:pt-32 pb-24 px-4 sm:px-6 min-h-screen bg-[#F7F3EC]">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={[{ label: "Liên Hệ", href: "/lien-he" }]} />

          <div className="bg-[#FFFCF7] border border-[#E8E1D5] rounded-[28px] md:rounded-[36px] p-6 sm:p-10 md:p-14 shadow-xs mt-4">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Thông tin liên hệ */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F3EC] border border-[#E8E1D5] text-[#7A2935] text-xs font-bold uppercase tracking-[0.2em] mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B58A4A]" />
                    Kết Nối Với Chúng Tôi
                  </div>

                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#30251F] tracking-tight leading-tight">
                    Liên Hệ Với Văn Hòa Lạc
                  </h1>
                  <p className="text-base sm:text-lg text-[#30251F]/75 mb-10 leading-relaxed">
                    Hãy liên lạc với bộ phận hỗ trợ khách hàng của chúng tôi để được tư vấn mua bánh lẻ hoặc đặt hàng sỉ doanh nghiệp.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F7F3EC]/70 border border-[#E8E1D5]">
                      <div className="p-3 bg-[#7A2935]/10 rounded-xl text-[#7A2935] shrink-0 mt-0.5">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-[#30251F]">Địa Chỉ Mua Trực Tiếp</h3>
                        <p className="text-[#30251F]/70 text-sm mt-0.5">174 Nguyễn Văn Trỗi, Phường Vũng Tàu, TP. Hồ Chí Minh</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F7F3EC]/70 border border-[#E8E1D5]">
                      <div className="p-3 bg-[#7A2935]/10 rounded-xl text-[#7A2935] shrink-0 mt-0.5">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-[#30251F]">Hotline Toàn Quốc</h3>
                        <p className="text-[#30251F]/70 text-sm mt-0.5">0971 682 213 (Zalo/iMessage)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F7F3EC]/70 border border-[#E8E1D5]">
                      <div className="p-3 bg-[#7A2935]/10 rounded-xl text-[#7A2935] shrink-0 mt-0.5">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-[#30251F]">Email & CSKH</h3>
                        <p className="text-[#30251F]/70 text-sm mt-0.5">xin-chao@vanhoalac.vn</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F7F3EC]/70 border border-[#E8E1D5]">
                      <div className="p-3 bg-[#7A2935]/10 rounded-xl text-[#7A2935] shrink-0 mt-0.5">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-[#30251F]">Giờ Mở Cửa (Mùa Trung Thu)</h3>
                        <p className="text-[#30251F]/70 text-sm mt-0.5">Thứ 2 - Thứ 7: 08:00 - 21:00<br/>Chủ Nhật: 09:00 - 18:00</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://zalo.me/0971682213"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#7A2935] text-[#FFFCF7] font-semibold px-6 py-3.5 rounded-full hover:bg-[#631f29] transition-all shadow-sm text-sm"
                  >
                    Nhắn Tin Zalo Ngay
                  </a>
                  <a
                    href="tel:0971682213"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#FFFCF7] border border-[#7A2935] text-[#7A2935] font-semibold px-6 py-3.5 rounded-full hover:bg-[#7A2935]/5 transition-all text-sm"
                  >
                    Gọi: 0971.682.213
                  </a>
                </div>
              </div>

              {/* Bản Đồ Google Map */}
              <div className="lg:col-span-6 min-h-[420px] lg:min-h-full rounded-[24px] overflow-hidden relative border border-[#E8E1D5] shadow-xs">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d493876.87854994397!2d106.2749405590492!3d10.760837067423681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31756f7c553778ed%3A0x932f5ef477b3d205!2zQsOhbmggVHJ1bmcgVGh1IFbEg24gSMOyYSBM4bqhYyBMb25nIMSQaeG7gW4!5e1!3m2!1sen!2s!4v1787454828241!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Bản đồ đường đi đến Bánh Trung Thu Văn Hòa Lạc Long Điền"
                ></iframe>
              </div>
            </div>

            {/* Liên kết nội bộ: Sản phẩm & Hướng dẫn đặt mua */}
            <div className="mt-12 pt-10 border-t border-[#E8E1D5] grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-serif text-xl font-bold text-[#30251F]">
                    Sản Phẩm Đặt Nhiều Nhất
                  </h2>
                  <Link href="/san-pham" className="text-xs font-bold uppercase tracking-wider text-[#7A2935] hover:underline inline-flex items-center gap-1">
                    Bảng giá đầy đủ <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <Link href="/san-pham/da-dop-2-trung" className="flex items-center justify-between p-3 rounded-xl bg-[#F7F3EC]/70 border border-[#E8E1D5] hover:border-[#7A2935] transition-colors">
                      <span className="font-semibold text-[#30251F]">Bánh Da Dợp Thập Cẩm 2 Trứng</span>
                      <span className="text-[#7A2935] font-bold">130.000đ</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/san-pham/da-dop-3-trung" className="flex items-center justify-between p-3 rounded-xl bg-[#F7F3EC]/70 border border-[#E8E1D5] hover:border-[#7A2935] transition-colors">
                      <span className="font-semibold text-[#30251F]">Bánh Da Dợp Thập Cẩm 3 Trứng</span>
                      <span className="text-[#7A2935] font-bold">165.000đ</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/san-pham/da-dop-big" className="flex items-center justify-between p-3 rounded-xl bg-[#F7F3EC]/70 border border-[#E8E1D5] hover:border-[#7A2935] transition-colors">
                      <span className="font-semibold text-[#30251F]">Bánh Da Dợp Ngoại Cỡ 6 - 14 Trứng</span>
                      <span className="text-[#7A2935] font-bold">460.000đ</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/san-pham/trung-thu-ga-quay" className="flex items-center justify-between p-3 rounded-xl bg-[#F7F3EC]/70 border border-[#E8E1D5] hover:border-[#7A2935] transition-colors">
                      <span className="font-semibold text-[#30251F]">Bánh Nướng Thập Cẩm Gà Quay</span>
                      <span className="text-[#7A2935] font-bold">140.000đ</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-serif text-xl font-bold text-[#30251F]">
                    Cẩm Nang Đặt Bánh & Quà Biếu
                  </h2>
                  <Link href="/bai-viet" className="text-xs font-bold uppercase tracking-wider text-[#7A2935] hover:underline inline-flex items-center gap-1">
                    Tất cả bài viết <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <Link href="/bai-viet/tu-lo-banh-gia-truyen-1970-den-thuong-hieu-chinh-hang-hom-nay" className="block p-3 rounded-xl bg-[#F7F3EC]/70 border border-[#E8E1D5] hover:border-[#7A2935] transition-colors font-medium text-[#30251F] hover:text-[#7A2935]">
                      Từ lò bánh gia truyền 1970 đến thương hiệu chính hãng hôm nay
                    </Link>
                  </li>
                  <li>
                    <Link href="/bai-viet/goi-y-set-qua-bieu-cuoi-nam-tu-thuong-hieu-chinh-hang-56-nam-van-hoa-lac" className="block p-3 rounded-xl bg-[#F7F3EC]/70 border border-[#E8E1D5] hover:border-[#7A2935] transition-colors font-medium text-[#30251F] hover:text-[#7A2935]">
                      Gợi ý set quà biếu cuối năm từ thương hiệu chính hãng 56 năm Văn Hòa Lạc
                    </Link>
                  </li>
                  <li>
                    <Link href="/bai-viet/banh-trung-thu-lam-qua-tang-cuoi-nam-cho-doanh-nghiep" className="block p-3 rounded-xl bg-[#F7F3EC]/70 border border-[#E8E1D5] hover:border-[#7A2935] transition-colors font-medium text-[#30251F] hover:text-[#7A2935]">
                      Bánh trung thu làm quà tặng cuối năm cho doanh nghiệp
                    </Link>
                  </li>
                  <li>
                    <Link href="/bai-viet/dai-ly-van-hoa-lac-174-nguyen-van-troi-vung-tau" className="block p-3 rounded-xl bg-[#F7F3EC]/70 border border-[#E8E1D5] hover:border-[#7A2935] transition-colors font-medium text-[#30251F] hover:text-[#7A2935]">
                      Điểm bán Văn Hòa Lạc 174 Nguyễn Văn Trỗi, Vũng Tàu
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
