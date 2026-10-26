import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import Link from "next/link"
import { Metadata } from "next"
import { ShieldCheck, Lock, Cookie, Eye, UserCheck, Mail, Phone, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật | Văn Hòa Lạc Vũng Tàu",
  description: "Chính sách bảo mật thông tin khách hàng và quy định về cookie, quảng cáo trực tuyến tại website Bánh Trung Thu Văn Hòa Lạc Vũng Tàu.",
  alternates: {
    canonical: "/chinh-sach-bao-mat",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://vanhoalac.vn/chinh-sach-bao-mat/#webpage",
  "url": "https://vanhoalac.vn/chinh-sach-bao-mat",
  "name": "Chính Sách Bảo Mật | Văn Hòa Lạc Vũng Tàu",
  "description": "Chính sách bảo mật dữ liệu cá nhân, cookie và quảng cáo của Bánh Trung Thu Văn Hòa Lạc Vũng Tàu.",
  "inLanguage": "vi-VN",
  "isPartOf": {
    "@type": "WebSite",
    "@id": "https://vanhoalac.vn/#website",
    "name": "Bánh Trung Thu Văn Hòa Lạc Vũng Tàu",
    "url": "https://vanhoalac.vn"
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Trang Chủ",
        "item": "https://vanhoalac.vn"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Chính Sách Bảo Mật",
        "item": "https://vanhoalac.vn/chinh-sach-bao-mat"
      }
    ]
  }
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-28 md:pt-32 pb-24 px-4 sm:px-6 min-h-screen bg-[#F7F3EC]">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs 
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" }
            ]} 
          />

          <article className="bg-[#FFFCF7] border border-[#E8E1D5] rounded-[28px] md:rounded-[36px] p-6 sm:p-10 md:p-14 shadow-xs mt-6">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F3EC] border border-[#E8E1D5] text-[#7A2935] text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <ShieldCheck className="w-4 h-4 text-[#B58A4A]" />
              Quy Định & Quyền Riêng Tư
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#30251F] leading-tight">
              Chính Sách Bảo Mật Thông Tin
            </h1>

            <p className="text-sm text-[#30251F]/60 mb-8 pb-6 border-b border-[#E8E1D5]">
              Cập nhật lần cuối: Ngày 26 tháng 10 năm 2026 • Áp dụng cho toàn bộ người dùng website vanhoalac.vn
            </p>

            <div className="space-y-10 text-[#30251F]/85 leading-relaxed text-base">
              {/* Giới thiệu */}
              <section className="space-y-3">
                <p>
                  Chào mừng quý khách đến với website chính thức của <strong>Bánh Trung Thu Văn Hòa Lạc Vũng Tàu</strong> (<Link href="/" className="text-[#7A2935] underline underline-offset-4 font-medium">vanhoalac.vn</Link>). 
                  Chúng tôi cam kết tôn trọng và bảo vệ quyền riêng tư cũng như thông tin cá nhân của quý khách khi truy cập, tham khảo sản phẩm và đặt hàng trên website.
                </p>
                <p>
                  Chính sách này giải thích cách thức chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn, đồng thời nêu rõ các điều khoản bắt buộc về việc sử dụng cookie và công nghệ quảng cáo của bên thứ ba (bao gồm Google AdSense).
                </p>
              </section>

              {/* 1. Thu thập thông tin */}
              <section className="p-6 sm:p-8 rounded-[24px] bg-[#F7F3EC]/70 border border-[#E8E1D5] space-y-4">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-[#7A2935] text-white">
                    <Lock className="w-5 h-5" />
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#7A2935]">
                    1. Thông Tin Thu Thập & Mục Đích Sử Dụng
                  </h2>
                </div>
                <p>Chúng tôi chỉ thu thập thông tin khi thực sự cần thiết nhằm phục vụ quý khách tốt nhất:</p>
                <ul className="list-disc pl-6 space-y-2 text-[#30251F]/80">
                  <li>
                    <strong>Thông tin liên hệ khi đặt hàng:</strong> Họ tên, số điện thoại, địa chỉ nhận hàng, ghi chú đơn hàng được sử dụng duy nhất cho mục đích xác nhận đơn, đóng gói bánh và giao hàng tận nơi.
                  </li>
                  <li>
                    <strong>Thông tin trao đổi hỗ trợ:</strong> Lịch sử tin nhắn qua Zalo/Hotline hoặc biểu mẫu liên hệ nhằm tư vấn hương vị bánh, báo giá số lượng lớn cho doanh nghiệp và giải quyết khiếu nại.
                  </li>
                  <li>
                    <strong>Dữ liệu kỹ thuật ẩn danh:</strong> Địa chỉ IP, loại trình duyệt, thiết bị, các trang đã xem nhằm tối ưu hóa tốc độ tải trang, nâng cao trải nghiệm người dùng và theo dõi lỗi hệ thống.
                  </li>
                </ul>
              </section>

              {/* 2. Quy định về Cookie và Google AdSense */}
              <section className="p-6 sm:p-8 rounded-[24px] bg-[#F7F3EC]/70 border border-[#E8E1D5] space-y-4">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-[#B58A4A] text-white">
                    <Cookie className="w-5 h-5" />
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#7A2935]">
                    2. Cookie & Công Nghệ Quảng Cáo Của Bên Thứ Ba (Google AdSense)
                  </h2>
                </div>
                <p>
                  Website vanhoalac.vn sử dụng các dịch vụ phân tích (Google Analytics) và mạng lưới quảng cáo của bên thứ ba (Google AdSense) nhằm hỗ trợ duy trì chi phí vận hành website:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-[#30251F]/80">
                  <li>
                    <strong>Cookie của nhà cung cấp bên thứ ba:</strong> Các nhà cung cấp bên thứ ba, bao gồm Google, sử dụng cookie để phân phát quảng cáo dựa trên các lượt truy cập trước đó của người dùng vào trang web này hoặc các trang web khác trên Internet.
                  </li>
                  <li>
                    <strong>Cookie quảng cáo của Google:</strong> Việc Google sử dụng cookie quảng cáo cho phép Google và các đối tác của họ phân phát quảng cáo cho người dùng của bạn dựa trên việc họ truy cập trang web của bạn và/hoặc các trang web khác trên Internet.
                  </li>
                  <li>
                    <strong>Quyền tùy chọn quảng cáo của người dùng:</strong> Người dùng có thể chọn không tham gia quảng cáo được cá nhân hóa bằng cách truy cập trang cài đặt quảng cáo của Google tại:{" "}
                    <a 
                      href="https://adssettings.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#7A2935] underline font-medium hover:text-[#581C25]"
                    >
                      Cài đặt quảng cáo Google (Ads Settings)
                    </a>.
                  </li>
                  <li>
                    Ngoài ra, quý khách cũng có thể chọn không sử dụng cookie của bên thứ ba đối với quảng cáo được cá nhân hóa bằng cách truy cập trang hướng dẫn người dùng tại{" "}
                    <a 
                      href="https://www.aboutads.info" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#7A2935] underline font-medium hover:text-[#581C25]"
                    >
                      www.aboutads.info
                    </a>.
                  </li>
                  <li>
                    Quý khách có toàn quyền quản lý, bật/tắt hoặc xóa cookie trực tiếp trong phần cài đặt của trình duyệt (Chrome, Safari, Edge, Firefox) bất cứ lúc nào.
                  </li>
                </ul>
              </section>

              {/* 3. Cam kết không chia sẻ dữ liệu */}
              <section className="p-6 sm:p-8 rounded-[24px] bg-[#F7F3EC]/70 border border-[#E8E1D5] space-y-4">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-[#7A2935] text-white">
                    <Eye className="w-5 h-5" />
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#7A2935]">
                    3. Cam Kết Bảo Vệ & Chia Sẻ Dữ Liệu
                  </h2>
                </div>
                <p>
                  Văn Hòa Lạc Vũng Tàu cam kết tuyệt đối <strong>KHÔNG</strong> bán, cho thuê, trao đổi hay tiết lộ thông tin cá nhân của quý khách cho bất kỳ bên thứ ba nào vì mục đích thương mại trái phép, ngoại trừ các trường hợp sau:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#30251F]/80">
                  <li>Các đơn vị vận chuyển đối tác (Ahamove, Viettel Post, GHTK, v.v.) chỉ để thực hiện việc giao bánh tận nơi cho quý khách.</li>
                  <li>Khi có yêu cầu bằng văn bản chính thức từ cơ quan pháp luật có thẩm quyền theo quy định của pháp luật Việt Nam.</li>
                </ul>
              </section>

              {/* 4. Quyền của khách hàng */}
              <section className="p-6 sm:p-8 rounded-[24px] bg-[#F7F3EC]/70 border border-[#E8E1D5] space-y-4">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-[#B58A4A] text-white">
                    <UserCheck className="w-5 h-5" />
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#7A2935]">
                    4. Quyền Của Quý Khách Đối Với Dữ Liệu Cá Nhân
                  </h2>
                </div>
                <p>Quý khách có toàn quyền:</p>
                <ul className="list-disc pl-6 space-y-2 text-[#30251F]/80">
                  <li>Yêu cầu kiểm tra, cập nhật hoặc điều chỉnh thông tin đơn hàng đã cung cấp.</li>
                  <li>Yêu cầu chúng tôi xóa hoàn toàn thông tin liên hệ của quý khách khỏi hệ thống lưu trữ sau khi đơn hàng hoàn tất.</li>
                  <li>Từ chối nhận các tin nhắn, cuộc gọi thông báo về chương trình ưu đãi mùa Trung Thu mới.</li>
                </ul>
              </section>

              {/* 5. Thông tin liên hệ */}
              <section className="p-6 sm:p-8 rounded-[24px] bg-[#30251F] text-[#FFFCF7] border border-[#43362E] space-y-4">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#DFC28E]">
                  5. Đơn Vị Quản Lý & Thông Tin Liên Hệ
                </h2>
                <p className="text-sm text-[#D5C9BF] leading-relaxed">
                  Mọi thắc mắc, phản hồi hoặc yêu cầu liên quan đến chính sách bảo mật này, xin vui lòng liên hệ với chúng tôi theo thông tin sau:
                </p>
                <div className="space-y-2 pt-2 text-sm text-[#FFFCF7]">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#DFC28E] shrink-0" />
                    <span><strong>Thương hiệu:</strong> Bánh Trung Thu Văn Hòa Lạc Vũng Tàu</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#DFC28E] shrink-0" />
                    <span><strong>Địa chỉ:</strong> 174 Nguyễn Văn Trỗi, Phường Vũng Tàu, TP. Hồ Chí Minh</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#DFC28E] shrink-0" />
                    <span><strong>Hotline/Zalo:</strong> 0971.682.213 - 0902.371.025</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#DFC28E] shrink-0" />
                    <span><strong>Email:</strong> xin-chao@vanhoalac.vn</span>
                  </p>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
