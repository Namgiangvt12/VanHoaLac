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
            className="flex-1 relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-gold/20"
          >
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Example placeholder
              title="Quy trình làm bánh trung thu Văn Hòa Lạc"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
            {/* SEO Overlay for local recognition */}
            <div className="hidden">
              <h3>Bánh Trung Thu Văn Hòa Lạc - Nghệ Thuật Thủ Công</h3>
              <p>Xem quy trình sản xuất bánh trung thu cao cấp tại xưởng Văn Hòa Lạc Long Điền.</p>
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
            "name": "Quy trình làm bánh trung thu Văn Hòa Lạc",
            "description": "Video hướng dẫn quy trình làm bánh trung thu thủ công gia truyền từ thương hiệu Văn Hòa Lạc.",
            "thumbnailUrl": "https://vanhoalac.vn/images/video-thumbnail.jpg",
            "uploadDate": "2026-03-29T12:00:00+07:00",
            "duration": "PT3M30S",
            "embedUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "interactionStatistic": {
              "@type": "InteractionCounter",
              "interactionType": { "@type": "WatchAction" },
              "userInteractionCount": 12500
            }
          })
        }}
      />
    </section>
  )
}
