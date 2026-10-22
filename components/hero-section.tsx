"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MessageCircle, Sparkles, ChevronRight } from "lucide-react"
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion"

interface CollectionSlide {
  id: string
  image: string
  brand: string
  title: string
  cta: string
  href: string
  alt: string
}

const COLLECTION_SLIDES: CollectionSlide[] = [
  {
    id: "set-1",
    image: "/images/hot-set/set-1-recommended.jpg",
    brand: "VĂN HÒA LẠC",
    title: "Set Hoàng Gia Thượng Hạng",
    cta: "Xem chi tiết",
    href: "#hot-set",
    alt: "Hộp quà Set Hoàng Gia Thượng Hạng Văn Hòa Lạc"
  },
  {
    id: "set-2",
    image: "/images/hot-set/set-2.jpg",
    brand: "VĂN HÒA LẠC",
    title: "Set Dạ Nguyệt Thượng Uyển",
    cta: "Xem chi tiết",
    href: "#hot-set",
    alt: "Hộp quà Set Dạ Nguyệt Thượng Uyển Văn Hòa Lạc"
  },
  {
    id: "set-3",
    image: "/images/hot-set/set-3.jpg",
    brand: "VĂN HÒA LẠC",
    title: "Set Phú Quý Cát Tường",
    cta: "Xem chi tiết",
    href: "#hot-set",
    alt: "Hộp quà Set Phú Quý Cát Tường Văn Hòa Lạc"
  }
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [isReady, setIsReady] = useState(false)

  // Collection slider state
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isSliderHovered, setIsSliderHovered] = useState(false)

  // Gate entrance on loader ready event or fallback
  useEffect(() => {
    const onIntroReady = () => setIsReady(true)
    window.addEventListener("vhl-intro-ready", onIntroReady)

    // Fallback if loader already finished
    const timer = setTimeout(() => setIsReady(true), 1500)

    return () => {
      window.removeEventListener("vhl-intro-ready", onIntroReady)
      clearTimeout(timer)
    }
  }, [])

  // Autoplay collection slider every 3800ms when ready and not hovered
  useEffect(() => {
    if (!isReady || isSliderHovered) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % COLLECTION_SLIDES.length)
    }, 3800)
    return () => clearInterval(interval)
  }, [isReady, isSliderHovered])

  // Scroll Parallax: background plate top -16%, height 132%, translateY 0% -> 12%
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const bgParallaxPercent = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "12%"]
  )

  const textParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 45]
  )

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    shouldReduceMotion ? [1, 1] : [1, 0.4]
  )

  const titleLines = [
    { text: "Bánh Trung Thu", isItalicGold: true },
    { text: "Văn Hòa Lạc", isItalicGold: false },
    { text: "Vũng Tàu", isItalicGold: false },
  ]

  const taglineLines = [
    "Di Sản Nửa Thế Kỷ,",
    "Gia Truyền Từ 1970"
  ]

  const activeSlideData = COLLECTION_SLIDES[currentSlide]

  return (
    <section 
      ref={containerRef}
      className="p-2 sm:p-3 max-w-[1920px] mx-auto w-full pt-20 md:pt-24"
      aria-labelledby="hero-heading"
      itemScope 
      itemType="https://schema.org/WPHeader"
    >
      {/* Framed Canvas Container (Baseline Signature: 2rem / 32px rounded card, min 36rem) */}
      <div className="relative w-full min-h-[calc(100svh-1.5rem)] min-h-[36rem] rounded-[28px] md:rounded-[32px] overflow-hidden border border-[#E8E1D5]/40 shadow-[0_20px_60px_-15px_rgba(48,37,31,0.18)] flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-16 bg-[#1F1916]">
        
        {/* PARALLAX BACKGROUND PLATE: height 132%, top -16%, translateY 0% -> 12% */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div 
            style={{ y: bgParallaxPercent }}
            className="absolute -top-[16%] left-0 right-0 w-full h-[132%]"
          >
            <Image
              src="/images/hero-mooncakes.jpg"
              alt="Bánh Trung Thu Văn Hòa Lạc Vũng Tàu - Cao Cấp Thủ Công"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* Editorial Multi-stop Scrim */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#231814]/75 via-[#231814]/40 to-[#231814]/85" />
          </motion.div>
        </div>

        {/* TOP SECTION: Eyebrow Tag + Giant Uppercase Title */}
        <motion.div 
          style={{ y: textParallaxY, opacity: textOpacity }}
          className="relative z-10 w-full max-w-5xl space-y-4 pt-4"
        >
          {/* Eyebrow Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-[#DFC28E] text-[11px] tracking-[0.25em] uppercase font-bold backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DFC28E]" />
            <span>Tinh Hoa Bánh Việt 2026</span>
          </motion.div>

          {/* Giant Title: Word/Line Clip-Mask Reveal (translateY 115% -> 0, 140ms stagger, 1100ms duration, easeOutExpo) */}
          <h1 
            id="hero-heading" 
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[1.08] tracking-tight drop-shadow-md select-none"
            itemProp="headline"
            aria-label="Bánh Trung Thu Văn Hòa Lạc Vũng Tàu"
          >
            {titleLines.map((line, idx) => (
              <span 
                key={idx} 
                className="block overflow-hidden pb-2 pt-1"
              >
                <motion.span
                  className={`block ${line.isItalicGold ? "font-serif italic font-normal text-[#DFC28E]" : ""}`}
                  initial={{ y: "115%", opacity: 0 }}
                  animate={isReady ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
                  transition={{ 
                    duration: 1.1, 
                    delay: 0.18 + idx * 0.14, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>

        {/* BOTTOM ROW: Left Tagline + CTA / Right Collection Slider + Heritage Card */}
        <div className="relative z-10 w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mt-auto pt-8 border-t border-white/15">
          
          {/* Left Column: Stacked-lines Tagline + Description + CTAs */}
          <div className="space-y-6 max-w-xl">
            {/* Tagline: Stacked lines clip-mask reveal (baseDelay 350ms, stagger 110ms, duration 900ms, easeOutExpo) */}
            <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal uppercase leading-tight tracking-tight text-white/90">
              {taglineLines.map((tLine, tIdx) => (
                <span key={tIdx} className="block overflow-hidden pb-1">
                  <motion.span
                    className="block"
                    initial={{ y: "115%", opacity: 0 }}
                    animate={isReady ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.35 + tIdx * 0.11,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    {tLine}
                  </motion.span>
                </span>
              ))}
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.75, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/85 text-sm sm:text-base leading-relaxed font-normal"
              itemProp="description"
            >
              Khám phá hương vị di sản qua từng lớp bánh &quot;Da Dợp&quot; độc bản 
              tại <span className="text-[#DFC28E] font-semibold">Văn Hòa Lạc Vũng Tàu</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.75, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              <Link
                href="#products"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-[#FFFCF7] text-[#7A2935] hover:bg-[#F7F3EC] text-xs tracking-[0.16em] uppercase font-bold rounded-full transition-all hover:scale-105 shadow-lg active:scale-95 group"
                title="Khám phá bộ sưu tập bánh trung thu"
              >
                <span>Bộ Sưu Tập 2026</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="https://m.me/1410917372396149"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#B58A4A] text-[#1F1916] hover:bg-[#CBA566] text-xs tracking-[0.16em] uppercase font-extrabold rounded-full transition-all hover:scale-105 shadow-lg active:scale-95"
                title="Tư vấn đặt bánh ngay qua Facebook Messenger"
              >
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 border border-white"></span>
                <MessageCircle className="w-4 h-4 text-[#1F1916]" />
                <span>Tư Vấn Ngay</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Collection Slider + Heritage 50+ Card (Baseline Signature) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 w-full lg:w-auto">
            
            {/* 1. Collection Slider (delay 650ms, spring tension 210, friction 24) */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ 
                type: "spring", 
                stiffness: 210, 
                damping: 24, 
                delay: 0.65 
              }}
              className="w-full sm:w-[17.5rem] flex flex-col gap-2.5"
              onMouseEnter={() => setIsSliderHovered(true)}
              onMouseLeave={() => setIsSliderHovered(false)}
            >
              <div className="relative rounded-[24px] border border-white/15 bg-white/10 backdrop-blur-md p-3 shadow-xl overflow-hidden min-h-[5.5rem] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlideData.id}
                    initial={{ opacity: 0, y: 14, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -14, scale: 0.96 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 210, 
                      damping: 24 
                    }}
                    className="flex items-center gap-3 w-full"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#EFE9DF] shrink-0 border border-white/20">
                      <Image
                        src={activeSlideData.image}
                        alt={activeSlideData.alt}
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <span className="text-[10px] font-bold text-[#DFC28E] uppercase tracking-wider block truncate">
                        {activeSlideData.brand}
                      </span>
                      <h4 className="text-xs font-serif font-bold text-white truncate">
                        {activeSlideData.title}
                      </h4>
                      <Link
                        href={activeSlideData.href}
                        className="inline-flex items-center gap-1 text-[11px] text-white/80 hover:text-white underline underline-offset-2 font-medium"
                      >
                        <span>{activeSlideData.cta}</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Dots */}
              <div className="flex items-center justify-center gap-1.5 px-1">
                {COLLECTION_SLIDES.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentSlide(dotIdx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIdx === currentSlide
                        ? "w-6 bg-[#DFC28E]"
                        : "w-1.5 bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Chuyển tới set ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* 2. Heritage 50+ Card (delay 780ms, tension 200, friction 26) */}
            <motion.article
              initial={{ opacity: 0, y: 28 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 26, 
                delay: 0.78 
              }}
              className="w-full sm:w-[15rem] rounded-[24px] border border-white/15 bg-white/10 backdrop-blur-md p-3.5 shadow-xl flex items-center justify-between gap-3"
            >
              {/* Left Column Info */}
              <div className="space-y-2">
                <div className="font-serif text-3xl font-bold text-[#DFC28E] leading-none">
                  50+
                </div>

                {/* Overlapping dots */}
                <div className="flex items-center -space-x-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#B58A4A] border border-[#231814]" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#7A2935] border border-[#231814]" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#DFC28E] border border-[#231814]" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FFFCF7] border border-[#231814]" />
                </div>

                <p className="text-[10px] text-white/80 leading-tight">
                  Năm gia truyền gìn giữ tinh hoa bánh Việt
                </p>
              </div>

              {/* Right Column Image */}
              <div className="relative w-14 aspect-[3/4] rounded-xl overflow-hidden bg-[#EFE9DF] shrink-0 border border-white/20">
                <Image
                  src="/images/hero-mooncakes.jpg"
                  alt="Văn Hòa Lạc Gia Truyền 1970"
                  fill
                  className="object-cover"
                  sizes="60px"
                />
              </div>
            </motion.article>

          </div>
        </div>

      </div>
    </section>
  )
}
