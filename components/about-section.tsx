"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

interface StoryBeat {
  id: string
  number: string
  tag: string
  title: string
  description: string
  highlights: string[]
  image: string
  imageAlt: string
}

const STORY_BEATS: StoryBeat[] = [
  {
    id: "heritage",
    number: "01",
    tag: "Di Sản Hơn 50 Năm",
    title: "Gìn Giữ Bí Quyết Gia Truyền 1970",
    description: "Văn Hòa Lạc tôn vinh bí quyết làm bánh thủ công gia truyền từ năm 1970 tại Long Điền - Vũng Tàu. Từng mẻ bánh là sự kết hợp hoàn hảo giữa phương pháp nhào nặn cổ truyền và kỹ thuật hiện đại để tạo nên lớp vỏ Da Dợp nhiều tầng giòn xốp độc bản.",
    highlights: ["Công thức gia truyền hơn 50 năm", "Kỹ thuật vỏ Da Dợp độc quyền", "Không hương liệu nhân tạo"],
    image: "/images/hero-mooncakes.jpg",
    imageAlt: "Bánh Trung Thu Da Dợp thủ công gia truyền Văn Hòa Lạc Vũng Tàu"
  },
  {
    id: "ingredients",
    number: "02",
    tag: "Tuyển Chọn Tự Nhiên",
    title: "Nguyên Liệu Thượng Hạng Chuẩn Vị",
    description: "Chỉ sử dụng những nguyên liệu hảo hạng nhất: trứng muối tươi bùi béo tuyển chọn kỹ lưỡng, thịt xá xíu đậm đà, gà quay ngũ nhân và đậu xanh hạt sen thanh ngọt. Mỗi thành phần đều được chuẩn bị với tiêu chuẩn an toàn thực phẩm khắt khe.",
    highlights: ["Trứng muối tươi bùi béo tự nhiên", "Thịt xá xíu & gà quay thượng hạng", "Đậu xanh & hạt sen ngọt thanh"],
    image: "/images/blog-crafting.jpg",
    imageAlt: "Nghệ nhân Văn Hòa Lạc tuyển chọn nguyên liệu làm bánh thủ công"
  },
  {
    id: "reunion",
    number: "03",
    tag: "Tết Đoàn Viên Trọn Vẹn",
    title: "Làm Với Tâm Huyết, Chia Sẻ Với Yêu Thương",
    description: "Chúng tôi tin rằng những chiếc bánh trung thu Vũng Tàu cao cấp ngon nhất đều kể một câu chuyện—về những buổi sum họp gia đình dưới trăng rằm, về lòng tri ân sâu sắc gửi đến đối tác, và mối thâm giao bền chặt trao truyền qua các thế hệ.",
    highlights: ["Hộp quà biếu sang trọng tinh tế", "Được tin chọn bởi hàng trăm doanh nghiệp", "Giao hàng bảo quản lạnh toàn quốc"],
    image: "/images/blog-tea.jpg",
    imageAlt: "Thưởng thức bánh trung thu Văn Hòa Lạc cùng ấm trà ngày đoàn viên"
  }
]

export function AboutSection() {
  const [activeBeat, setActiveBeat] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  return (
    <section 
      id="about" 
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      {/* Framed Editorial Magazine Canvas (Baseline Signature) */}
      <div className="rounded-[28px] md:rounded-[36px] bg-[#FFFCF7] border border-[#E8E1D5] p-6 sm:p-10 md:p-14 lg:p-16 shadow-[0_4px_30px_rgba(48,37,31,0.03)]">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE9DF] border border-[#E8E1D5] text-[#B58A4A] text-xs uppercase tracking-[0.25em] font-bold"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B58A4A]" />
            <span>Câu Chuyện Thương Hiệu</span>
          </motion.div>

          <motion.h2 
            id="about-heading" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#30251F] leading-tight"
          >
            Văn Hòa Lạc Vũng Tàu — Nửa Thế Kỷ Đúc Kết Tinh Hoa Bánh Việt
          </motion.h2>
        </div>

        {/* Desktop: 2-Column Sticky Story Scene / Mobile: Natural Vertical Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Image Frame (Desktop only) */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28 self-start">
            <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden border border-[#E8E1D5] bg-[#EFE9DF] shadow-xl">
              {STORY_BEATS.map((beat, idx) => {
                const isActive = activeBeat === idx
                return (
                  <motion.div
                    key={beat.id}
                    initial={false}
                    animate={{ 
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 1.04
                    }}
                    transition={{ 
                      duration: 0.65, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <Image
                      src={beat.image}
                      alt={beat.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#231814]/75 via-[#231814]/20 to-transparent" />
                  </motion.div>
                )
              })}

              {/* Active Beat Indicator Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between text-[#FFFCF7]">
                <div className="bg-[#231814]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold uppercase tracking-wider">
                  <span className="text-[#DFC28E]">{STORY_BEATS[activeBeat].number}</span>
                  <span className="mx-2 text-white/40">/</span>
                  <span>03</span>
                </div>
                <div className="bg-[#231814]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[11px] font-semibold text-[#DFC28E]">
                  {STORY_BEATS[activeBeat].tag}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story Beats */}
          <div className="lg:col-span-7 space-y-12 sm:space-y-16 lg:space-y-24" itemProp="mainContentOfPage">
            {STORY_BEATS.map((beat, idx) => (
              <motion.article
                key={beat.id}
                onViewportEnter={() => setActiveBeat(idx)}
                viewport={{ amount: 0.55 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.75, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className={`p-6 sm:p-8 md:p-10 rounded-[26px] border transition-all duration-300 ${
                  activeBeat === idx 
                    ? "bg-[#F7F3EC] border-[#B58A4A]/50 shadow-md" 
                    : "bg-[#F7F3EC]/40 border-[#E8E1D5]"
                }`}
              >
                {/* Mobile-only inline Image */}
                <div className="lg:hidden relative aspect-[16/10] rounded-[20px] overflow-hidden mb-6 border border-[#E8E1D5] bg-[#EFE9DF]">
                  <Image
                    src={beat.image}
                    alt={beat.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 left-3 bg-[#231814]/80 backdrop-blur-md text-[#DFC28E] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                    {beat.tag}
                  </div>
                </div>

                {/* Number & Tag Header */}
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-serif text-4xl sm:text-5xl font-light text-[#7A2935] leading-none" aria-hidden="true">
                    {beat.number}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B58A4A]">
                    {beat.tag}
                  </span>
                </div>

                {/* Beat Title */}
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#30251F] leading-snug mb-3">
                  {beat.title}
                </h3>

                {/* Beat Description */}
                <p className="text-[#766960] text-sm sm:text-base leading-relaxed mb-6">
                  {beat.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 pt-2 border-t border-[#E8E1D5]/70">
                  {beat.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#30251F]/90 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#B58A4A] shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}

            {/* Bottom Section Link */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#E8E1D5]"
            >
              <p className="text-xs text-[#766960]">
                Mỗi chiếc bánh là kết tinh của tình yêu thương và sự tỉ mỉ của nghệ nhân Văn Hòa Lạc.
              </p>
              <Link 
                href="#contact" 
                className="inline-flex items-center gap-2 border-2 border-[#30251F] text-[#30251F] hover:bg-[#30251F] hover:text-[#FFFCF7] px-7 py-3 rounded-full text-xs tracking-[0.18em] uppercase font-bold transition-all shadow-sm active:scale-95 group shrink-0"
                title="Tìm hiểu thêm về cam kết chất lượng Văn Hòa Lạc"
              >
                <span>Cam Kết Chất Lượng</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

