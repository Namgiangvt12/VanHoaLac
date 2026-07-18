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
      "@type": "Organization",
      "@id": "https://vanhoalac.vn/#organization",
      "name": "Bánh Trung Thu Văn Hòa Lạc",
      "url": "https://vanhoalac.vn",
      "logo": "https://vanhoalac.vn/images/logo.png",
      "description": "Thương hiệu bánh trung thu truyền thống lâu đời tại Vũng Tàu, nổi tiếng với bánh da dợp và các loại nhân truyền thống chất lượng cao.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Số 351 Võ Thị Sáu, khu phố Long Tân, thị trấn Long Điền",
        "addressLocality": "Long Điền",
        "addressRegion": "Bà Rịa - Vũng Tàu",
        "addressCountry": "VN"
      }
    },
    {
      "@type": "AboutPage",
      "@id": "https://vanhoalac.vn/ve-chung-toi/#webpage",
      "url": "https://vanhoalac.vn/ve-chung-toi",
      "name": "Về Văn Hòa Lạc | Bánh Trung Thu Vũng Tàu Chuyên Nghiệp",
      "isPartOf": { "@id": "https://vanhoalac.vn/#website" },
      "about": { "@id": "https://vanhoalac.vn/#organization" }
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
      <main className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Về Chúng Tôi", href: "/ve-chung-toi" }]} />
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-primary">
            Câu Chuyện Của Văn Hòa Lạc
          </h1>
          
          <div className="relative aspect-video w-full mb-12 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/hero-mooncakes.jpg"
              alt="Hương vị truyền thống Văn Hòa Lạc Vũng Tàu"
              fill
              className="object-cover"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="font-serif text-2xl text-primary">Nơi lưu giữ nét đẹp truyền thống của Tết Đoàn Viên</h2>
            <p>
              Hơn một thập niên, <strong>Văn Hòa Lạc</strong> đã trở thành cái tên bảo chứng cho chất lượng và 
              hương vị bánh trung thu truyền thống đích thực tại Vũng Tàu. 
            </p>
            <p>
              Từ những mẻ bánh nướng đầu tiên bằng lò than củi cho đến quy trình sản xuất hiện đại và đạt chuẩn 
              VSATTP ngày nay, triết lý kinh doanh của chúng tôi vẫn không bao giờ thay đổi: "Làm bằng cái tâm, trao tinh hoa nghệ thuật".
            </p>

            <h2 className="font-serif text-2xl text-primary mt-12">Chữ "Tín" trong từng nguyên liệu</h2>
            <p>
              Nghệ nhân của Văn Hòa Lạc đích thân chọn lọc kỹ lưỡng từng hạt sen bùi béo, quả trứng muối vàng ươm, cho tới lớp mỡ đường trong trẻo.
              Không chất bảo quản, không hương liệu công nghiệp, bánh trung thu Văn Hòa Lạc tự hào mang đến cho gia đình bạn
              sự an tâm tuyệt đối về chất lượng.
            </p>
            
            <h2 className="font-serif text-2xl text-primary mt-12">Cột mốc chứng nhận</h2>
            <ul>
              <li>Giấy chứng nhận Cơ sở đủ điều kiện An toàn Thực phẩm.</li>
              <li>Các giải thưởng tại hội chợ ẩm thực truyền thống (kèm hình ảnh chứng nhận bên dưới - Đang cập nhật).</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
