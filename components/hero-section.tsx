"use client"

import Image from "next/image"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section 
      className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden" 
      aria-labelledby="hero-heading"
      itemScope 
      itemType="https://schema.org/WPHeader"
    >
      {/* Background Image with Parallax-like effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero-mooncakes.jpg"
          alt="Bánh trung thu Văn Hòa Lạc - Cao Cấp Thủ Công"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      </motion.div>

      {/* Content Container */}
      <div className="container relative z-10 px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs tracking-[0.4em] uppercase font-bold mb-4 backdrop-blur-sm">
              Tinh Hoa Bánh Việt 2026
            </span>
            <h1 
              id="hero-heading" 
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] text-balance mb-6 drop-shadow-2xl"
              itemProp="headline"
            >
              Nghệ Thuật <br /> 
              <span className="text-gold italic">Bánh Trung Thu</span> <br /> 
              Gia Truyền
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium" itemProp="description">
              Khám phá hương vị di sản qua từng lớp bánh "Da Dợp" độc bản 
              tại <span className="text-gold">Văn Hòa Lạc Long Điền</span>.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
          >
            <Link
              href="#products"
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(139,0,0,0.4)] hover:shadow-[0_0_30px_rgba(139,0,0,0.6)]"
              title="Khám phá bộ sưu tập bánh trung thu"
            >
              Bộ Sưu Tập 2026
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="#youtube-section"
              className="group flex items-center gap-3 text-white/90 hover:text-gold transition-colors text-xs tracking-[0.2em] uppercase font-bold"
            >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold/50 transition-all bg-white/5 backdrop-blur-sm">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              Xem Quy Trình
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40"
      >
        <span className="text-[10px] tracking-[0.5em] uppercase font-bold">Cuộn Xuống</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-px h-16 bg-gradient-to-b from-gold/50 to-transparent" 
          aria-hidden="true" 
        />
      </motion.div>
    </section>
  )
}

