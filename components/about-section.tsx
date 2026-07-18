export function AboutSection() {
  return (
    <section 
      id="about" 
      className="py-24 md:py-32 px-6"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Numbers */}
          <div className="space-y-12">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
              Triết Lý Văn Hòa Lạc
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <article className="border border-border p-8">
                <span className="font-serif text-5xl md:text-6xl font-light" aria-hidden="true">1</span>
                <h3 className="sr-only">Công thức truyền thống</h3>
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                  Văn Hòa Lạc tôn vinh công thức bánh trung thu truyền thống hàng trăm năm, 
                  kết hợp kỹ thuật hiện đại cho chất lượng vượt trội.
                </p>
              </article>
              <article className="border border-border p-8">
                <span className="font-serif text-5xl md:text-6xl font-light" aria-hidden="true">2</span>
                <h3 className="sr-only">Nguyên liệu thượng hạng</h3>
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                  Chỉ sử dụng nguyên liệu thượng hạng: trứng muối, thịt heo, gà quay,lạp xưởng, các loại hạt từ nhà cung cấp uy tín.
                </p>
              </article>
            </div>
          </div>

          {/* Right Column - Text */}
          <div itemProp="mainContentOfPage">
            <h2 
              id="about-heading" 
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-balance"
            >
              Văn Hòa Lạc Vũng Tàu - Làm với tâm huyết, chia sẻ với yêu thương
            </h2>
            <p className="mt-8 text-muted-foreground leading-relaxed">
              Mỗi chiếc <strong>bánh trung thu Văn Hòa Lạc</strong> đều là một lễ hội tôn vinh di sản và nghề thủ công. 
              Từ lớp vỏ bánh mỏng manh đến nhân thơm đậm đà, mỗi thành phần 
              đều được chuẩn bị cẩn thận để tôn vinh truyền thống Tết Trung Thu Việt Nam.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Chúng tôi tin rằng những chiếc <strong>bánh trung thu Vũng Tàu cao cấp</strong> ngon nhất đều kể một câu chuyện—về những buổi 
              sum họp gia đình dưới trăng tròn, về lòng biết ơn mùa màng bội thu, và những điều ước 
              được trao truyền qua các thế hệ tại <strong>Vũng Tàu</strong>.
            </p>
            <Link 
              href="#contact" 
              className="mt-8 inline-block border border-foreground px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
              title="Tìm hiểu thêm về cam kết chất lượng Văn Hòa Lạc"
            >
              Cam Kết Chất Lượng
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"
