"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Award, Sparkles } from "lucide-react"
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion"

interface TiltedSlide {
  id: string
  image: string
  title: string
  tag: string
  alt: string
  words: [string, string, string, string] // w1, w2, w3 (highlighted), w4
}

const TILTED_SLIDES: TiltedSlide[] = [
  {
    id: "slide-1",
    image: "/images/hot-set/set-1-recommended.jpg",
    title: "Set Hoàng Gia Thượng Hạng",
    tag: "Bán Chạy Nhất Mùa Trăng 2026",
    alt: "Hộp quà bánh trung thu Set Hoàng Gia Thượng Hạng Văn Hòa Lạc",
    words: ["TINH HOA", "GIA TRUYỀN", "ĐỘC BẢN", "DA DỢP"]
  },
  {
    id: "slide-2",
    image: "/images/hot-set/set-2.jpg",
    title: "Set Dạ Nguyệt Thượng Uyển",
    tag: "Hương Vị Trọn Vẹn 4 Bánh VIP",
    alt: "Hộp quà bánh trung thu Set Dạ Nguyệt Thượng Uyển Văn Hòa Lạc",
    words: ["THỦ CÔNG", "HOÀNG GIA", "THƯỢNG HẠNG", "HỘP QUÀ"]
  },
  {
    id: "slide-3",
    image: "/images/hot-set/set-5.jpg",
    title: "Set Tri Kỷ Thâm Giao",
    tag: "Đặc Sản Da Dợp Độc Bản Long Điền",
    alt: "Hộp quà bánh trung thu Set Tri Kỷ Thâm Giao Văn Hòa Lạc",
    words: ["TẾT NÀY", "ĐOÀN VIÊN", "THẮT CHẶT", "THÂM GIAO"]
  }
]

export function HeritageTiltedShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [currentIdx, setCurrentIdx] = useState(0)
  const [revealKey, setRevealKey] = useState(0)

  const activeSlide = TILTED_SLIDES[currentIdx]

  // Opposing Scroll Parallax for Ghost Words
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Horizontal parallax mapped across section scroll:
  // top-left: x -3% -> 3%
  // top-right: x 3% -> -3%
  // bottom-left: x -2% -> 4%
  // bottom-right: x 4% -> -3%
  const tlX = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["-3%", "3%"])
  const trX = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["3%", "-3%"])
  const blX = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["-2%", "4%"])
  const brX = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["4%", "-3%"])

  const goToPrev = useCallback(() => {
    setCurrentIdx((prev) => (prev === 0 ? TILTED_SLIDES.length - 1 : prev - 1))
    setRevealKey((k) => k + 1)
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % TILTED_SLIDES.length)
    setRevealKey((k) => k + 1)
  }, [])

  const goToIndex = useCallback((idx: number) => {
    setCurrentIdx(idx)
    setRevealKey((k) => k + 1)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative isolate overflow-hidden bg-[#FFFCF7] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-y border-[#E8E1D5]"
      aria-label="Điểm nhấn di sản Văn Hòa Lạc"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[580px] md:min-h-[680px]">
        
        {/* 1. TOP BADGES ROW (Inview reveals) */}
        <div className="relative z-20 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-8">
          
          {/* Percentage Circle Badge: tension 220, friction 22 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring", 
              stiffness: 220, 
              damping: 22 
            }}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#EFE9DF] border border-[#E8E1D5] flex flex-col items-center justify-center text-center p-3 shadow-sm shrink-0"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#7A2935] leading-none">
              100%
            </span>
            <p className="text-[10px] text-[#766960] mt-1.5 max-w-[7.5em] leading-tight font-medium uppercase tracking-wider">
              Thủ công gia truyền chuẩn vị
            </p>
          </motion.div>

          {/* Badge Card: delay 120ms, tension 200, friction 26 */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 26, 
              delay: 0.12 
            }}
            className="max-w-md w-full rounded-[24px] bg-[#EFE9DF] border border-[#E8E1D5] p-5 sm:p-6 flex items-start gap-4 shadow-sm"
          >
            <div className="bg-[#FFFCF7] px-3.5 py-1.5 rounded-xl border border-[#E8E1D5] font-serif text-lg font-bold text-[#7A2935] shrink-0">
              #01
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#30251F]">
                Tin Chọn Bởi Hàng Ngàn Khách Hàng
              </h3>
              <p className="text-xs text-[#766960] leading-relaxed">
                Từ các buổi đoàn viên ấm cúng đến các hộp quà tri ân đối tác doanh nghiệp, bánh trung thu Văn Hòa Lạc luôn khẳng định vị thế di sản trên từng mâm cỗ.
              </p>
            </div>
          </motion.article>

        </div>

        {/* 2. OVERSIZED GHOST HEADING + CENTER TILTED 6° CARD */}
        <div className="relative my-6 sm:my-10 flex items-center justify-center min-h-[360px] sm:min-h-[440px]">
          
          {/* OVERSIZED GHOST WORDS (Opposing horizontal parallax + clip-mask slide-up) */}
          <div 
            className="absolute inset-0 pointer-events-none select-none z-0 flex flex-col justify-between py-2 sm:py-6"
            aria-hidden="true"
          >
            {/* Row 1: Words 1 & 2 */}
            <div className="flex items-center justify-between w-full px-2 sm:px-6">
              <motion.div style={{ x: tlX }} className="overflow-hidden pb-2">
                <motion.span
                  key={`w1-${revealKey}`}
                  initial={{ y: "115%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#30251F]/15 leading-none"
                >
                  {activeSlide.words[0]}
                </motion.span>
              </motion.div>

              <motion.div style={{ x: trX }} className="overflow-hidden pb-2 text-right">
                <motion.span
                  key={`w2-${revealKey}`}
                  initial={{ y: "115%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#30251F]/15 leading-none"
                >
                  {activeSlide.words[1]}
                </motion.span>
              </motion.div>
            </div>

            {/* Row 2: Words 3 (Ink/Accent) & 4 */}
            <div className="flex items-center justify-between w-full px-2 sm:px-6">
              <motion.div style={{ x: blX }} className="overflow-hidden pb-2">
                <motion.span
                  key={`w3-${revealKey}`}
                  initial={{ y: "115%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#7A2935] leading-none"
                >
                  {activeSlide.words[2]}
                </motion.span>
              </motion.div>

              <motion.div style={{ x: brX }} className="overflow-hidden pb-2 text-right">
                <motion.span
                  key={`w4-${revealKey}`}
                  initial={{ y: "115%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#30251F]/15 leading-none"
                >
                  {activeSlide.words[3]}
                </motion.span>
              </motion.div>
            </div>
          </div>

          {/* CENTER TILTED 6° CARD (Inview reveal: y 60, scale 0.92, rotate 6deg) */}
          <motion.figure
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring", 
              stiffness: 170, 
              damping: 26 
            }}
            className="relative z-10 w-56 sm:w-64 md:w-72 aspect-[3/4] rounded-[26px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(48,37,31,0.35)] rotate-6 bg-[#7A2935] border-2 border-white/60 group"
          >
            {/* Photo with Cross-fade on slide change */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 26 
                }}
                className="absolute inset-0"
              >
                <Image
                  src={activeSlide.image}
                  alt={activeSlide.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 240px, 300px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#231814]/80 via-transparent to-black/10" />
              </motion.div>
            </AnimatePresence>

            {/* Glass Caption at Bottom */}
            <div className="absolute inset-x-3 bottom-3 z-20 rounded-xl bg-[#231814]/75 backdrop-blur-md p-3 text-white border border-white/15">
              <h4 className="font-serif text-sm font-bold truncate">
                {activeSlide.title}
              </h4>
              <p className="text-[11px] text-[#DFC28E] font-medium truncate mt-0.5">
                {activeSlide.tag}
              </p>
            </div>
          </motion.figure>

        </div>

        {/* 3. CAROUSEL CONTROLS ROW */}
        <div className="relative z-20 flex items-center justify-between mt-8 pt-4 border-t border-[#E8E1D5]">
          {/* Prev Button */}
          <button
            onClick={goToPrev}
            aria-label="Xem sản phẩm trước"
            className="w-11 h-11 rounded-full border border-[#E8E1D5] bg-[#FFFCF7] text-[#30251F] flex items-center justify-center hover:bg-[#7A2935] hover:text-[#FFFCF7] hover:border-[#7A2935] transition-all shadow-sm active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {TILTED_SLIDES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => goToIndex(dotIdx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  dotIdx === currentIdx
                    ? "w-8 bg-[#7A2935]"
                    : "w-2 bg-[#766960]/30 hover:bg-[#766960]/60"
                }`}
                aria-label={`Chuyển tới slide ${dotIdx + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            aria-label="Xem sản phẩm kế tiếp"
            className="w-11 h-11 rounded-full bg-[#7A2935] text-[#FFFCF7] flex items-center justify-center hover:bg-[#581C25] transition-all shadow-sm active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  )
}
