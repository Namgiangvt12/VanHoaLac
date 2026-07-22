import Link from "next/link"

export function Footer() {
  return (
    <footer 
      id="contact" 
      className="bg-primary text-primary-foreground py-16 md:py-24 px-6"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div className="max-w-7xl mx-auto">
        {/* CTA Section */}
        <div className="text-center mb-16 pb-16 border-b border-primary-foreground/20">
          <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">
            Đặt Bánh Trung Thu Văn Hòa Lạc
          </h2>
          <p className="text-primary-foreground/70 mb-6 max-w-lg mx-auto">
            Liên hệ ngay để đặt bánh trung thu cao cấp cho gia đình hoặc doanh nghiệp. 
            Giao hàng toàn quốc với dịch vụ bảo quản lạnh chuyên nghiệp.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="tel:0902371025" 
              className="border border-primary-foreground px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-primary-foreground hover:text-primary transition-colors inline-block"
              title="Gọi điện đặt bánh điện thoại 1"
            >
              Gọi Ngay: 0902.371.025
            </Link>
            <Link 
              href="tel:0971682213" 
              className="border border-primary-foreground px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-primary-foreground hover:text-primary transition-colors inline-block"
              title="Gọi điện đặt bánh điện thoại 2"
            >
              Hỗ Trợ: 0971.682.213
            </Link>
          </div>
        </div>

        {/* Footer Grid */}
        <div 
          className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12"
          itemScope
          itemType="https://schema.org/LocalBusiness"
        >
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-serif text-2xl font-medium" itemProp="name">
              Văn Hòa Lạc
            </Link>
            <address className="mt-4 not-italic text-sm text-primary-foreground/70 leading-relaxed" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="streetAddress">53/12/20 Lê Hồng Phong</span><br />
              <span itemProp="addressLocality">Phường Tam Thắng, TP. Vũng Tàu</span><br />
              <span itemProp="addressRegion">Bà Rịa - Vũng Tàu</span>
              <meta itemProp="addressCountry" content="VN" />
            </address>
          </div>

          {/* Navigation */}
          <nav aria-label="Điều hướng footer">
            <p className="text-xs tracking-widest uppercase text-primary-foreground/60 mb-4">Điều Hướng</p>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Trang Chủ</Link></li>
              <li><Link href="#about" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Về Văn Hòa Lạc</Link></li>
              <li><Link href="#blog" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Bài Viết</Link></li>
              <li><Link href="#products" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Sản Phẩm</Link></li>
            </ul>
          </nav>

          {/* Discover */}
          <nav aria-label="Khám phá thêm">
            <p className="text-xs tracking-widest uppercase text-primary-foreground/60 mb-4">Sản Phẩm</p>
            <ul className="space-y-3">
              <li><Link href="#banh-hat-sen" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Bánh Nhân Hạt Sen</Link></li>
              <li><Link href="#banh-dau-do" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Bánh Nhân Đậu Đỏ</Link></li>
              <li><Link href="#banh-trung-muoi" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Bánh Trứng Muối</Link></li>
              <li><Link href="#hop-qua" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Hộp Quà Tặng</Link></li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Dịch vụ">
            <p className="text-xs tracking-widest uppercase text-primary-foreground/60 mb-4">Dịch Vụ</p>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Đặt Hàng Online</Link></li>
              <li><Link href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Giao Hàng Toàn Quốc</Link></li>
              <li><Link href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Đơn Hàng Doanh Nghiệp</Link></li>
              <li><Link href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">In Logo Theo Yêu Cầu</Link></li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-widest uppercase text-primary-foreground/60 mb-4">Liên Hệ</p>
            <ul className="space-y-3">
              <li className="flex flex-col gap-2">
                <Link 
                  href="tel:0902371025" 
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  itemProp="telephone"
                >
                  0902.371.025
                </Link>
                <Link 
                  href="tel:0971682213" 
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  itemProp="telephone"
                >
                  0971.682.213
                </Link>
              </li>
              <li>
                <Link 
                  href="mailto:xin-chao@vanhoalac.vn" 
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  itemProp="email"
                >
                  xin-chao@vanhoalac.vn
                </Link>
              </li>
              <li>
                <Link 
                  href="https://zalo.me/vanhoalac" 
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zalo: Văn Hòa Lạc
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & SEO Footer Text */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/20">
          <div className="text-center">
            <p className="text-xs text-primary-foreground/60 mb-2">
              Bản quyền © {new Date().getFullYear()} Bánh Trung Thu Văn Hòa Lạc (Van Hoa Lac). Đã đăng ký bản quyền.
            </p>
            <p className="text-xs text-primary-foreground/50 max-w-2xl mx-auto leading-relaxed">
              Văn Hòa Lạc (Van Hoa Lac Mooncake) – Thương hiệu bánh trung thu gia truyền hơn 50 năm tại Long Điền, Bà Rịa - Vũng Tàu.
              Chuyên cung cấp bánh trung thu van hoa lac thu cong cao cap với các dòng nhân truyền thống, giao hàng toàn quốc và nhận đặt bánh trung thu doanh nghiệp số lượng lớn.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
