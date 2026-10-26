import Link from "next/link"
import { Phone, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer 
      id="contact" 
      className="bg-[#231814] text-[#FFFCF7] pt-16 md:pt-24 pb-12 px-4 sm:px-6 lg:px-8 mt-16"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Inset CTA Card */}
        <div className="rounded-[28px] md:rounded-[36px] bg-[#30251F] border border-[#43362E] p-8 sm:p-12 md:p-16 text-center space-y-6 shadow-xl">
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-[#DFC28E] text-[11px] tracking-[0.25em] uppercase font-bold">
            Tết Đoàn Viên 2026
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Đặt Bánh Trung Thu Văn Hòa Lạc
          </h2>

          <p className="text-[#D5C9BF] max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Liên hệ ngay để đặt bánh trung thu cao cấp cho gia đình hoặc doanh nghiệp. 
            Giao hàng toàn quốc với dịch vụ bảo quản lạnh chuyên nghiệp.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="tel:0902371025" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 text-[#FFFCF7] px-8 py-3.5 rounded-full text-xs tracking-[0.16em] uppercase font-bold hover:bg-white hover:text-[#30251F] transition-all"
              title="Gọi điện đặt bánh điện thoại 1"
            >
              <Phone size={14} />
              <span>Gọi Ngay: 0902.371.025</span>
            </Link>

            <Link 
              href="tel:0971682213" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#7A2935] hover:bg-[#581C25] text-[#FFFCF7] px-8 py-3.5 rounded-full text-xs tracking-[0.16em] uppercase font-bold transition-all shadow-md"
              title="Gọi điện đặt bánh điện thoại 2"
            >
              <Phone size={14} />
              <span>Hỗ Trợ: 0971.682.213</span>
            </Link>
          </div>
        </div>

        {/* Footer Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 pt-4">
          {/* Brand & Address */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-white block">
              Văn Hòa Lạc
            </Link>
            <address className="not-italic text-sm text-[#D5C9BF] leading-relaxed">
              <span className="text-white font-medium">174 Nguyễn Văn Trỗi</span><br />
              <span>Phường Vũng Tàu</span><br />
              <span>TP. Hồ Chí Minh</span>
            </address>
          </div>

          {/* Navigation */}
          <nav aria-label="Điều hướng footer" className="space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase font-bold text-[#DFC28E]">Điều Hướng</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="text-[#D5C9BF] hover:text-white transition-colors">Trang Chủ</Link></li>
              <li><Link href="/ve-chung-toi" className="text-[#D5C9BF] hover:text-white transition-colors">Về Văn Hòa Lạc</Link></li>
              <li><Link href="/bai-viet" className="text-[#D5C9BF] hover:text-white transition-colors">Bài Viết & Tin Tức</Link></li>
              <li><Link href="/#products" className="text-[#D5C9BF] hover:text-white transition-colors">Danh Mục Sản Phẩm</Link></li>
              <li><Link href="/lien-he" className="text-[#D5C9BF] hover:text-white transition-colors">Liên Hệ Đặt Hàng</Link></li>
            </ul>
          </nav>

          {/* Products */}
          <nav aria-label="Khám phá thêm" className="space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase font-bold text-[#DFC28E]">Sản Phẩm</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/san-pham/da-dop-2-trung" className="text-[#D5C9BF] hover:text-white transition-colors">Bánh Da Dợp 2 Trứng</Link></li>
              <li><Link href="/san-pham/da-dop-3-trung" className="text-[#D5C9BF] hover:text-white transition-colors">Bánh Da Dợp 3 Trứng</Link></li>
              <li><Link href="/san-pham/da-dop-big" className="text-[#D5C9BF] hover:text-white transition-colors">Bánh Ngoại Cỡ 6 - 14 Trứng</Link></li>
              <li><Link href="/#hot-sets" className="text-[#D5C9BF] hover:text-white transition-colors">Hộp Quà Biếu Tặng</Link></li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Dịch vụ" className="space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase font-bold text-[#DFC28E]">Dịch Vụ</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link 
                  href="https://zalo.me/0971682213" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#D5C9BF] hover:text-white transition-colors"
                >
                  Đặt Hàng Online
                </Link>
              </li>
              <li>
                <Link 
                  href="https://zalo.me/0971682213" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#D5C9BF] hover:text-white transition-colors"
                >
                  Giao Hàng Toàn Quốc
                </Link>
              </li>
              <li>
                <Link 
                  href="https://zalo.me/0971682213" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#D5C9BF] hover:text-white transition-colors"
                >
                  Đơn Hàng Doanh Nghiệp
                </Link>
              </li>
              <li>
                <Link 
                  href="https://zalo.me/0971682213" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#D5C9BF] hover:text-white transition-colors"
                >
                  In Logo Theo Yêu Cầu
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact Hotline & Zalo */}
          <nav aria-label="Thông tin liên hệ" className="space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase font-bold text-[#DFC28E]">Liên Hệ</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="tel:0902371025" className="text-[#D5C9BF] hover:text-white transition-colors">
                  Hotline 1: 0902.371.025
                </Link>
              </li>
              <li>
                <Link href="tel:0971682213" className="text-[#D5C9BF] hover:text-white transition-colors">
                  Hotline 2: 0971.682.213
                </Link>
              </li>
              <li>
                <Link 
                  href="https://zalo.me/0971682213" 
                  className="text-[#D5C9BF] hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zalo: 0971.682.213
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Legal & Policy Quick Links */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs text-[#D5C9BF]">
          <Link href="/chinh-sach-bao-mat" className="hover:text-[#DFC28E] transition-colors font-medium underline underline-offset-4 text-white">
            Chính Sách Bảo Mật (Privacy Policy)
          </Link>
          <span className="text-white/20">•</span>
          <Link href="/ve-chung-toi" className="hover:text-[#DFC28E] transition-colors">
            Giới Thiệu Thương Hiệu
          </Link>
          <span className="text-white/20">•</span>
          <Link href="/lien-he" className="hover:text-[#DFC28E] transition-colors">
            Liên Hệ & Hỗ Trợ
          </Link>
          <span className="text-white/20">•</span>
          <Link href="/qr" className="hover:text-[#DFC28E] transition-colors">
            Tra Cứu Mã QR
          </Link>
          <span className="text-white/20">•</span>
          <Link href="/sitemap.xml" className="hover:text-[#DFC28E] transition-colors" target="_blank">
            Sitemap XML
          </Link>
        </div>

        {/* Bottom Copyright & Brand Statement */}
        <div className="pt-6 border-t border-white/5 text-center space-y-2 text-xs text-[#D5C9BF]/70">
          <p>
            Bản quyền © {new Date().getFullYear()} Bánh Trung Thu Văn Hòa Lạc (Van Hoa Lac). Đã đăng ký bản quyền.
          </p>
          <p className="max-w-3xl mx-auto leading-relaxed">
            Văn Hòa Lạc (Van Hoa Lac Mooncake) – Thương hiệu bánh trung thu gia truyền hơn 50 năm tại Long Điền, Bà Rịa - Vũng Tàu. 
            Chuyên cung cấp bánh trung thu van hoa lac thu cong cao cap với các dòng nhân truyền thống, giao hàng toàn quốc và nhận đặt bánh trung thu doanh nghiệp số lượng lớn.
          </p>
        </div>

      </div>
    </footer>
  )
}
