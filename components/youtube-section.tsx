'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

export function YouTubeSection() {
  return (
    <section id="youtube-section" className="py-24 bg-card overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
              Khám Phá Nghệ Thuật <br /> Làm Bánh Thủ Công
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hãy cùng chúng tôi đi sâu vào quy trình chế biến những chiếc bánh trung thu tinh xảo nhất. 
              Từ việc tuyển chọn nguyên liệu đến kỹ thuật "Da Dợp" gia truyền, mỗi công đoạn đều là một tác phẩm nghệ thuật.
            </p>
            <div className="pt-4">
              <a 
                href="https://youtube.com/@vanhoalac" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl group"
              >
                Theo dõi trên YouTube
                <Play className="ml-2 w-5 h-5 group-hover:fill-current transition-colors" />
              </a>
            </div>
          </motion.div>

          {/* Video Embed */}
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-[360px] mx-auto relative aspect-[9/16] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-gold/30 ring-4 ring-primary/20 bg-black"
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
            ></iframe>
            {/* SEO Overlay for local recognition */}
            <div className="hidden">
              <h3>Bánh Trung Thu Văn Hòa Lạc - Quy Trình Thủ Công</h3>
              <p>Xem video ngắn quy trình sản xuất bánh trung thu da dợp cao cấp tại xưởng Văn Hòa Lạc Vũng Tàu.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Structured Data for Video SEO (Inline script for this component) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "Quy trình làm bánh trung thu Văn Hòa Lạc Vũng Tàu",
            "description": "Video YouTube Shorts quay quy trình làm bánh trung thu thủ công da dợp gia truyền tại Văn Hòa Lạc Vũng Tàu.",
            "thumbnailUrl": "https://vanhoalac.vn/images/hero-mooncakes.jpg",
            "uploadDate": "2026-03-29T12:00:00+07:00",
            "embedUrl": "https://www.youtube.com/embed/rZNx-Gk67Rw",
            "interactionStatistic": {
              "@type": "InteractionCounter",
              "interactionType": { "@type": "WatchAction" },
              "userInteractionCount": 25000
            }
          })
        }}
      />
    </section>
  )
}
