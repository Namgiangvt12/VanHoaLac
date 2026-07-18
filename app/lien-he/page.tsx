import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export const metadata = {
  title: "Liên Hệ Văn Hòa Lạc | Điểm Bán Bánh Trung Thu Vũng Tàu",
  description: "Trang liên hệ và thông tin bản đồ, hotline của hiệu bánh trung thu Văn Hòa Lạc tại Vũng Tàu. Hỗ trợ đặt bánh trực tuyến và giải đáp khách hàng.",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://vanhoalac.vn/lien-he/#webpage",
  "url": "https://vanhoalac.vn/lien-he",
  "name": "Liên Hệ Bánh Trung Thu Văn Hòa Lạc Vũng Tàu",
  "isPartOf": { "@id": "https://vanhoalac.vn/#website" },
  "about": { "@id": "https://vanhoalac.vn/#organization" }
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-32 pb-24 px-6 min-h-screen bg-background">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={[{ label: "Liên Hệ", href: "/lien-he" }]} />

          <div className="grid lg:grid-cols-2 gap-16 mt-8">
            {/* Thông tin liên hệ */}
            <div>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-8 text-primary">
                Liên Hệ Với Văn Hòa Lạc
              </h1>
              <p className="text-muted-foreground text-lg mb-12">
                Hãy liên lạc với bộ phận hỗ trợ khách hàng của chúng tôi để được tư vấn mua bánh lẻ hoặc đặt hàng sỉ doanh nghiệp.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Địa Chỉ Mua Trực Tiếp</h3>
                    <p className="text-muted-foreground mt-1">Số 351 Võ Thị Sáu, khu phố Long Tân, thị trấn Long Điền, Bà Rịa - Vũng Tàu</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Hotline Toàn Quốc</h3>
                    <p className="text-muted-foreground mt-1">0971 682 213 (Zalo/iMessage)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email & CSKH</h3>
                    <p className="text-muted-foreground mt-1">xin-chao@vanhoalac.vn</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Giờ Mở Cửa (Mùa Trung Thu)</h3>
                    <p className="text-muted-foreground mt-1">Thứ 2 - Thứ 7: 08:00 - 21:00<br/>Chủ Nhật: 09:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bản Đồ Google Map */}
            <div className="h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl relative border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15696.536287950553!2d107.2185252!3d10.472938!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317571abfecc22f3%3A0xa5f4cc0bd192461d!2sL%C3%B2%20b%C3%A1nh%20trung%20thu%20V%C4%83n%20Ho%C3%A0%20L%E1%BA%A1c!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ đường đi đến Bánh Trung Thu Văn Hòa Lạc"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
