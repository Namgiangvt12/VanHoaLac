"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  Eye, 
  X, 
  CheckCircle2, 
  Flame,
  Award,
  Pause,
  ArrowRight
} from "lucide-react"
import { useLenis } from "./smooth-scroll-provider"

interface HotSetItem {
  id: string
  title: string
  subtitle: string
  image: string
  badge?: string
  isRecommended?: boolean
  description: string
  highlights: string[]
  priceTag: string
}

const HOT_SETS: HotSetItem[] = [
  {
    id: "hot-set-1",
    title: "Set Hoàng Gia Thượng Hạng",
    subtitle: "Phiên bản giới hạn mùa Trung Thu 2026",
    image: "/images/hot-set/set-1-recommended.jpg",
    isRecommended: true,
    badge: "100% Recommended",
    description: "Bộ sưu tập quà tặng tinh hoa bậc nhất Văn Hòa Lạc với thiết kế hộp quà trang nhã, sang trọng. Kết hợp hoàn hảo giữa bánh Da Dợp đặc sản và các dòng bánh nướng truyền thống danh tiếng.",
    highlights: ["100% Khách Hàng Doanh Nghiệp Đánh Giá 5 Sao", "Hộp quà cứng cáp dập vân kim nhũ cao cấp", "Tặng kèm túi xách đồng bộ & thiệp chúc mừng"],
    priceTag: "Hot Trend 2026"
  },
  {
    id: "hot-set-2",
    title: "Set Dạ Nguyệt Thượng Uyển",
    subtitle: "Hộp quà 4 bánh thịnh vượng cao cấp",
    image: "/images/hot-set/set-2.jpg",
    description: "Hương vị trọn vẹn kết tinh từ bánh Da Dợp 2-3 trứng và thập cẩm gà quay đặc sản, biểu trưng cho sự viên mãn và may mắn.",
    highlights: ["4 bánh vị thượng hạng", "Bao bì ép kim cao cấp", "Bảo quản lạnh chuyên nghiệp"],
    priceTag: "Bán Chạy Nhất"
  },
  {
    id: "hot-set-3",
    title: "Set Phú Quý Cát Tường",
    subtitle: "Quà biếu đối tác & doanh nghiệp",
    image: "/images/hot-set/set-3.jpg",
    description: "Thiết kế sắc sảo mang thông điệp thắt chặt mối thâm giao, phát tài phát lộc cho mùa trăng rằm trọn vẹn.",
    highlights: ["Hỗ trợ in logo doanh nghiệp", "Chiết khấu đặc biệt theo số lượng", "Giao hàng tận nơi toàn quốc"],
    priceTag: "Doanh Nghiệp"
  },
  {
    id: "hot-set-4",
    title: "Set Minh Nguyệt Nghinh Phong",
    subtitle: "Kết hợp bánh truyền thống & trà shan tuyết",
    image: "/images/hot-set/set-4.jpg",
    description: "Nét văn hóa thưởng nguyệt thanh tao cùng bánh trung thu thủ công Long Điền và ấm trà nồng nàn gắn kết gia đình.",
    highlights: ["Thủ công gia truyền hơn 50 năm", "Không chất bảo quản nhân tạo", "Hương vị ngọt thanh dịu nhẹ"],
    priceTag: "Quà Biếu VIP"
  },
  {
    id: "hot-set-5",
    title: "Set Tri Kỷ Thâm Giao",
    subtitle: "Tuyển tập Da Dợp độc bản Long Điền",
    image: "/images/hot-set/set-5.jpg",
    description: "Dành riêng cho những người sành ẩm thực muốn thưởng thức tinh hoa bánh 3 lớp nhân Da Dợp chuẩn vị gốc Vũng Tàu.",
    highlights: ["Bánh Da Dợp độc quyền", "Trứng muối tươi bùi béo", "Đóng gói hút chân không an toàn"],
    priceTag: "Đặc Sản Độc Quyền"
  },
  {
    id: "hot-set-6",
    title: "Set Thịnh Vượng Như Ý",
    subtitle: "Thiết kế sắc đỏ hoàng gia may mắn",
    image: "/images/hot-set/set-6.jpg",
    description: "Gam màu đỏ son may mắn cùng hoa văn truyền thống, mang đến tài lộc và phúc thọ dồi dào cho người nhận.",
    highlights: ["Bao bì biểu trưng may mắn", "Phù hợp biếu tặng đối tác & cấp trên", "Hộp quà cứng cáp sang trọng"],
    priceTag: "Sang Trọng"
  },
  {
    id: "hot-set-7",
    title: "Set Tinh Hoa Long Điền",
    subtitle: "Gìn giữ hương vị nửa thế kỷ",
    image: "/images/hot-set/set-7.jpg",
    description: "Hương vị mộc mạc thơm lừng của đậu xanh nguyên chất, hạt sen và thập cẩm truyền thống qua bàn tay nghệ nhân cao tuổi.",
    highlights: ["Công thức gia truyền chính gốc", "Độ ngọt thanh tự nhiên", "Đầy đủ kiểm định ATTP"],
    priceTag: "Truyền Thống"
  },
  {
    id: "hot-set-8",
    title: "Set Bách Niên Hảo Hợp",
    subtitle: "Món quà gắn kết tình thân gia đình",
    image: "/images/hot-set/set-8.jpg",
    description: "Đong đầy yêu thương cho đêm rằm Trung Thu ấm cúng, trọn vẹn tình cảm bên ông bà, cha mẹ và con cháu.",
    highlights: ["Đủ vị mặn ngọt cho mọi thế hệ", "Kèm dao cắt bánh & dĩa sang trọng", "Hạn sử dụng rõ ràng tươi mới"],
    priceTag: "Gia Đình Đoàn Viên"
  }
]

export function HotSetSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: false
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedSet, setSelectedSet] = useState<HotSetItem | null>(null)
  const { stopScroll, startScroll } = useLenis()

  // Baseline scroll lock and Escape key handler
  useEffect(() => {
    if (selectedSet) {
      stopScroll()
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedSet(null)
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => {
        startScroll()
        window.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [selectedSet, stopScroll, startScroll])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi || isPaused || selectedSet !== null) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 3500)
    return () => clearInterval(interval)
  }, [emblaApi, isPaused, selectedSet])

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index)
  }, [emblaApi])

  return (
    <section 
      id="hot-set" 
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-labelledby="hot-set-heading"
    >
      {/* Section Header (Baseline Typography & Spacing) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE9DF] border border-[#E8E1D5] text-[#B58A4A] text-xs uppercase tracking-[0.25em] font-bold">
            <Flame className="w-3.5 h-3.5 text-[#B58A4A]" />
            <span>Bộ Sưu Tập Set Hot 2026</span>
          </div>

          <h2 
            id="hot-set-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#30251F] tracking-tight leading-tight"
          >
            Set Quà Tặng Trung Thu Đẳng Cấp
          </h2>

          <p className="text-[#766960] text-sm sm:text-base leading-relaxed">
            Tuyển tập các set hộp quà bánh trung thu sang trọng bậc nhất mùa trăng 2026. 
            Lựa chọn hàng đầu cho doanh nghiệp tri ân đối tác và quà biếu gia đình trọn vẹn tình thân.
          </p>
        </motion.div>

        {/* Desktop Carousel Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden sm:flex items-center gap-3"
        >
          <button
            onClick={scrollPrev}
            aria-label="Set quà trước"
            className="w-11 h-11 rounded-full bg-[#FFFCF7] border border-[#E8E1D5] text-[#30251F] flex items-center justify-center hover:bg-[#7A2935] hover:text-[#FFFCF7] hover:border-[#7A2935] transition-all shadow-sm active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Set quà tiếp theo"
            className="w-11 h-11 rounded-full bg-[#FFFCF7] border border-[#E8E1D5] text-[#30251F] flex items-center justify-center hover:bg-[#7A2935] hover:text-[#FFFCF7] hover:border-[#7A2935] transition-all shadow-sm active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* Embla Carousel Viewport */}
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing rounded-[28px] -mx-2 px-2 py-2">
          <div className="flex -ml-6 touch-pan-y">
            {HOT_SETS.map((item, idx) => {
              const isFirst = item.isRecommended

              return (
                <div
                  key={item.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6 min-w-0"
                >
                  {/* WRAPPER RIÊNG CHO REVEAL ANIMATION - KHÔNG GHI ĐÈ TRANSFORM CỦA EMBLA */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-6%" }}
                    transition={{ 
                      duration: 0.8, 
                      delay: (idx % 3) * 0.12, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                    className="h-full"
                  >
                    <div 
                      className="relative h-full rounded-[26px] bg-[#FFFCF7] border border-[#E8E1D5] hover:border-[#B58A4A]/50 transition-colors duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl group"
                    >
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                        {isFirst ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A2935] text-[#FFFCF7] font-bold text-[10px] uppercase tracking-wider shadow">
                            <Award className="w-3.5 h-3.5 text-[#DFC28E]" />
                            <span>100% RECOMMENDED</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFFCF7]/95 text-[#30251F] text-[10px] font-bold tracking-wider uppercase border border-[#E8E1D5]">
                            <Sparkles className="w-3 h-3 text-[#B58A4A]" />
                            <span>{item.priceTag}</span>
                          </div>
                        )}

                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#30251F]/70 text-white backdrop-blur-sm">
                          Set #{idx + 1}
                        </span>
                      </div>

                      {/* Image Container with subtle zoom (Max 1.04) */}
                      <div 
                        className="relative aspect-[4/5] w-full overflow-hidden cursor-pointer bg-[#EFE9DF]"
                        onClick={() => setSelectedSet(item)}
                      >
                        <Image
                          src={item.image}
                          alt={`${item.title} - Bánh Trung Thu Văn Hòa Lạc`}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          priority={idx === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#231814]/70 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

                        {/* Quick View Button on Hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            className="px-4 py-2 rounded-full bg-[#FFFCF7]/95 text-[#30251F] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xl backdrop-blur-md hover:bg-[#7A2935] hover:text-[#FFFCF7] transition-all"
                            aria-label={`Xem chi tiết ${item.title}`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Xem Ảnh</span>
                          </button>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-[11px] font-bold text-[#B58A4A] tracking-widest uppercase mb-1">
                            {item.subtitle}
                          </p>
                          <h3 className="font-serif text-xl font-bold text-[#30251F] group-hover:text-[#7A2935] transition-colors line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-[#766960] text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Highlights */}
                        <div className="pt-3 border-t border-[#E8E1D5]/70 space-y-1.5">
                          {item.highlights.slice(0, 2).map((hl, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-2 text-xs text-[#30251F]/80">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#B58A4A] shrink-0" />
                              <span className="truncate">{hl}</span>
                            </div>
                          ))}
                        </div>

                        {/* Card Actions */}
                        <div className="pt-2 flex items-center gap-2.5">
                          <Link
                            href="https://zalo.me/0971682213"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-3 px-4 rounded-xl bg-[#7A2935] hover:bg-[#581C25] text-[#FFFCF7] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow active:scale-95"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Tư Vấn Zalo</span>
                          </Link>

                          <button
                            onClick={() => setSelectedSet(item)}
                            className="p-3 rounded-xl border border-[#E8E1D5] hover:border-[#7A2935] hover:bg-[#EFE9DF]/50 text-[#30251F] transition-all active:scale-95"
                            title="Xem chi tiết set"
                            aria-label="Xem chi tiết set quà"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Pagination & Status Footer */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E1D5] pt-6">
        <div className="flex items-center gap-2">
          {HOT_SETS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollTo(dotIdx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                dotIdx === selectedIndex
                  ? "w-8 bg-[#7A2935]"
                  : "w-2 bg-[#766960]/25 hover:bg-[#766960]/50"
              }`}
              aria-label={`Chuyển đến set ${dotIdx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-[#766960] bg-[#FFFCF7] px-4 py-1.5 rounded-full border border-[#E8E1D5]">
          {isPaused ? (
            <>
              <Pause className="w-3.5 h-3.5 text-[#B58A4A]" />
              <span>Đang tạm dừng xem chi tiết</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Tự động chuyển slide sau 3.5s</span>
            </>
          )}
        </div>
      </div>

      {/* Lightbox Dialog Modal */}
      <AnimatePresence>
        {selectedSet && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 30 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1F1916]/80 backdrop-blur-md"
            onClick={() => setSelectedSet(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.96, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 28 }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              className="relative max-w-4xl w-full bg-[#FFFCF7] rounded-[28px] overflow-hidden shadow-2xl border border-[#E8E1D5] grid md:grid-cols-2 max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setSelectedSet(null)}
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-[#30251F]/80 text-[#FFFCF7] flex items-center justify-center hover:bg-[#7A2935] transition-colors shadow-md"
                aria-label="Đóng xem chi tiết (Esc)"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="relative aspect-square md:aspect-auto h-72 md:h-full w-full bg-[#EFE9DF]">
                <Image
                  src={selectedSet.image}
                  alt={selectedSet.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {selectedSet.isRecommended && (
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A2935] text-[#FFFCF7] font-bold text-xs uppercase tracking-wider shadow">
                    <Award className="w-3.5 h-3.5 text-[#DFC28E]" />
                    <span>100% RECOMMENDED</span>
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-[#B58A4A] tracking-widest uppercase">
                      {selectedSet.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#30251F] mt-1">
                      {selectedSet.title}
                    </h3>
                  </div>

                  <p className="text-[#766960] text-sm leading-relaxed">
                    {selectedSet.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#30251F]">
                      Điểm Nổi Bật Của Set Quà:
                    </h4>
                    {selectedSet.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-[#30251F]">
                        <CheckCircle2 className="w-4 h-4 text-[#B58A4A] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#E8E1D5]">
                  <Link
                    href="https://zalo.me/0971682213"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-full bg-[#7A2935] hover:bg-[#581C25] text-[#FFFCF7] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Tư Vấn & Báo Giá Qua Zalo (0971.682.213)</span>
                  </Link>

                  <p className="text-[11px] text-center text-[#766960]">
                    ⚡ Hỗ trợ in logo công ty lên hộp từ 20 set • Giao hàng tận nơi toàn quốc
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
