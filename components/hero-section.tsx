"use client"

import Image from "next/image"
import { ArrowRight, MessageCircle } from "lucide-react"
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
          alt="Bánh Trung Thu Văn Hòa Lạc Vũng Tàu - Cao Cấp Thủ Công"
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
              Văn Hòa Lạc Vũng Tàu
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium drop-shadow" itemProp="description">
              Khám phá hương vị di sản gia truyền qua từng lớp bánh "Da Dợp" độc bản 
              tại <span className="text-gold font-semibold">Văn Hòa Lạc Vũng Tàu</span>.
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
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-white text-primary hover:bg-white/90 text-xs tracking-[0.2em] uppercase font-bold rounded-full transition-all hover:scale-105 shadow-xl"
              title="Khám phá bộ sưu tập bánh trung thu"
            >
              Bộ Sưu Tập 2026
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="https://m.me/1410917372396149"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-9 py-5 bg-gradient-to-r from-amber-400 via-gold to-yellow-500 text-slate-950 text-xs tracking-[0.2em] uppercase font-black rounded-full shadow-[0_0_30px_rgba(245,158,11,0.55)] hover:shadow-[0_0_45px_rgba(245,158,11,0.85)] transition-all duration-300 hover:scale-105 active:scale-95 border border-amber-200/60 overflow-hidden"
              title="Tư vấn đặt bánh ngay qua Facebook Messenger"
            >
              {/* Pulse glow background */}
              <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 opacity-70 blur-md group-hover:opacity-100 transition duration-500 animate-pulse" />
              
              {/* Shimmer sweep effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-out" />
              
              <div className="relative z-10 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white"></span>
                </span>
                <MessageCircle className="w-5 h-5 text-slate-950 fill-slate-950/20 transition-transform group-hover:scale-110" />
                <span className="font-extrabold text-slate-950 tracking-widest">Tư Vấn Ngay</span>
              </div>
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

