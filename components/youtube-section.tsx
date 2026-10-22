'use client'

import { motion } from 'framer-motion'
import { Play, Sparkles } from 'lucide-react'

export function YouTubeSection() {
  return (
    <section id="youtube-section" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Framed Baseline Editorial Container */}
      <div className="rounded-[28px] md:rounded-[36px] bg-[#FFFCF7] border border-[#E8E1D5] p-8 sm:p-12 md:p-16 shadow-[0_4px_30px_rgba(48,37,31,0.03)]">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left: Text Story */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE9DF] border border-[#E8E1D5] text-[#B58A4A] text-xs uppercase tracking-[0.25em] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#B58A4A]" />
              <span>Góc Nhìn Thực Tế</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#30251F] leading-tight">
              Khám Phá Nghệ Thuật <br /> Làm Bánh Thủ Công
            </h2>

            <p className="text-base text-[#766960] leading-relaxed">
              Hãy cùng chúng tôi đi sâu vào quy trình chế biến những chiếc bánh trung thu tinh xảo nhất. 
              Từ việc tuyển chọn nguyên liệu đến kỹ thuật &quot;Da Dợp&quot; gia truyền, mỗi công đoạn đều là một tác phẩm nghệ thuật.
            </p>

            <div className="pt-2">
              <a 
                href="https://youtube.com/@vanhoalac" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#7A2935] hover:bg-[#581C25] text-[#FFFCF7] font-bold text-xs uppercase tracking-[0.18em] rounded-full transition-all shadow-md active:scale-95 group"
              >
                <span>Theo dõi trên YouTube</span>
                <Play className="w-4 h-4 text-[#DFC28E] group-hover:scale-110 transition-transform fill-current" />
              </a>
            </div>
          </motion.div>

          {/* Right: Vertical 9:16 Video Shorts Frame (Aperture Scale Reveal) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-[340px] sm:max-w-[360px] mx-auto relative aspect-[9/16] rounded-[26px] overflow-hidden shadow-2xl border-2 border-[#E8E1D5] bg-black"
          >
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/rZNx-Gk67Rw" 
              title="Quy trình làm bánh trung thu Văn Hòa Lạc - YouTube Shorts"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* SEO Overlay for local search */}
            <div className="hidden">
              <h3>Bánh Trung Thu Văn Hòa Lạc - Quy Trình Thủ Công</h3>
              <p>Xem video ngắn quy trình sản xuất bánh trung thu da dợp cao cấp tại xưởng Văn Hòa Lạc Vũng Tàu.</p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Structured Data for Video SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "Quy trình làm bánh trung thu Văn Hòa Lạc Vũng Tàu",
            "description": "Video YouTube Shorts quay quy trình làm bánh trung thu thủ công da dợp gia truyền tại Văn Hòa Lạc Vũng Tàu.",
            "thumbnailUrl": "https://vanhoalac.vn/images/hero-mooncakes.JPG",
            "uploadDate": "2026-03-29T12:00:00+07:00",
            "embedUrl": "https://www.youtube.com/embed/rZNx-Gk67Rw"
          })
        }}
      />
    </section>
  )
}
