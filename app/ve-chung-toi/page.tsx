import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import Image from "next/image"

export const metadata = {
  title: "Về Văn Hòa Lạc | Bánh Trung Thu Vũng Tàu Chuyên Nghiệp",
  description: "Lịch sử và câu chuyện của thương hiệu bánh trung thu Văn Hòa Lạc tại Vũng Tàu. Chúng tôi gìn giữ hương vị truyền thống qua hơn nửa thế kỷ.",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Bakery", "Organization"],
      "@id": "https://vanhoalac.vn/#business",
      "name": "Văn Hòa Lạc Vũng Tàu",
      "alternateName": ["Bánh Trung Thu Văn Hòa Lạc Vũng Tàu", "Văn Hòa Lạc", "Van Hoa Lac Vung Tau"],
      "url": "https://vanhoalac.vn",
      "logo": "https://vanhoalac.vn/logo.png",
      "description": "Văn Hòa Lạc Vũng Tàu là thương hiệu bánh trung thu thủ công gia truyền từ năm 1970, nổi tiếng với bánh Da Dợp vỏ giòn xốp và các dòng bánh nướng truyền thống.",
      "sameAs": [
        "https://www.facebook.com/banh.vanhoalac",
        "https://www.google.com/maps?cid=10604868065099837957"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "174 Nguyễn Văn Trỗi",
        "addressLocality": "Phường Vũng Tàu",
        "addressRegion": "TP. Hồ Chí Minh",
        "postalCode": "700000",
        "addressCountry": "VN"
      }
    },
    {
      "@type": "AboutPage",
      "@id": "https://vanhoalac.vn/ve-chung-toi/#webpage",
      "url": "https://vanhoalac.vn/ve-chung-toi",
      "name": "Về Văn Hòa Lạc | Bánh Trung Thu Vũng Tàu Chuyên Nghiệp",
      "isPartOf": { "@id": "https://vanhoalac.vn/#website" },
      "about": { "@id": "https://vanhoalac.vn/#business" }
    }
  ]
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-28 md:pt-32 pb-24 px-4 sm:px-6 min-h-screen bg-[#F7F3EC]">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: "Về Chúng Tôi", href: "/ve-chung-toi" }]} />
          
          <div className="bg-[#FFFCF7] border border-[#E8E1D5] rounded-[28px] md:rounded-[36px] p-6 sm:p-10 md:p-14 shadow-xs">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F3EC] border border-[#E8E1D5] text-[#7A2935] text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B58A4A]" />
              Thương Hiệu Gia Truyền Vũng Tàu
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#30251F] tracking-tight leading-tight">
              Câu Chuyện Của Văn Hòa Lạc
            </h1>

            <p className="text-base sm:text-lg text-[#30251F]/80 max-w-2xl mb-10 leading-relaxed">
              Hành trình gìn giữ phong vị bánh trung thu truyền thống, tôn vinh nghệ thuật làm bánh thủ công đất Vũng Tàu qua hơn nửa thế kỷ.
            </p>
            
            {/* Framed Hero Image */}
            <div className="relative aspect-video w-full mb-12 rounded-[22px] md:rounded-[28px] overflow-hidden border border-[#E8E1D5] shadow-sm">
              <Image
                src="/images/hero-mooncakes.jpg"
                alt="Hương vị truyền thống Văn Hòa Lạc Vũng Tàu"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#FFFCF7]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-[#E8E1D5]/60 text-xs font-semibold text-[#30251F]">
                Lò bánh thủ công • Văn Hòa Lạc Vũng Tàu
              </div>
            </div>

            {/* Editorial Story Layout */}
            <div className="space-y-10 text-[#30251F]/85 leading-relaxed text-base sm:text-lg">
              <div className="p-6 sm:p-8 rounded-[24px] bg-[#F7F3EC]/70 border border-[#E8E1D5]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-serif text-2xl font-bold text-[#B58A4A]">01</span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#7A2935]">
                    Nơi lưu giữ nét đẹp truyền thống của Tết Đoàn Viên
                  </h2>
                </div>
                <p className="mb-4">
                  Hơn một thập niên, <strong className="text-[#30251F] font-semibold">Văn Hòa Lạc</strong> đã trở thành cái tên bảo chứng cho chất lượng và 
                  hương vị bánh trung thu truyền thống đích thực tại Vũng Tàu. 
                </p>
                <p>
                  Từ những mẻ bánh nướng đầu tiên bằng lò than củi cho đến quy trình sản xuất hiện đại và đạt chuẩn 
                  VSATTP ngày nay, triết lý kinh doanh của chúng tôi vẫn không bao giờ thay đổi: "Làm bằng cái tâm, trao tinh hoa nghệ thuật".
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-[24px] bg-[#F7F3EC]/70 border border-[#E8E1D5]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-serif text-2xl font-bold text-[#B58A4A]">02</span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#7A2935]">
                    Chữ "Tín" trong từng nguyên liệu
                  </h2>
                </div>
                <p>
                  Nghệ nhân của Văn Hòa Lạc đích thân chọn lọc kỹ lưỡng từng hạt sen bùi béo, quả trứng muối vàng ươm, cho tới lớp mỡ đường trong trẻo.
                  Không chất bảo quản, không hương liệu công nghiệp, bánh trung thu Văn Hòa Lạc tự hào mang đến cho gia đình bạn
                  sự an tâm tuyệt đối về chất lượng.
                </p>
              </div>
              
              <div className="p-6 sm:p-8 rounded-[24px] bg-[#F7F3EC]/70 border border-[#E8E1D5]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-serif text-2xl font-bold text-[#B58A4A]">03</span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#7A2935]">
                    Cột mốc chứng nhận
                  </h2>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-[#30251F]/80">
                  <li>Giấy chứng nhận Cơ sở đủ điều kiện An toàn Thực phẩm.</li>
                  <li>Các giải thưởng tại hội chợ ẩm thực truyền thống (kèm hình ảnh chứng nhận bên dưới - Đang cập nhật).</li>
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
