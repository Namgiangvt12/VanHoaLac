"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Crown, 
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
  Play
} from "lucide-react"

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

  // Seamless auto-play with loop
  useEffect(() => {
    if (!emblaApi || isPaused || selectedSet !== null) return

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 3200)

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
      className="relative py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-card/30 via-background to-card/20 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[250px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-gold/20 to-amber-500/15 border border-gold/30 text-gold text-xs uppercase tracking-[0.3em] font-bold shadow-sm backdrop-blur-md">
            <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Bộ Sưu Tập Set Hot 2026</span>
            <Sparkles className="w-3.5 h-3.5 text-gold" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight leading-tight">
            Set Quà Tặng Trung Thu Đẳng Cấp
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Tuyển tập các set hộp quà bánh trung thu sang trọng bậc nhất mùa trăng 2026. 
            Lựa chọn hàng đầu cho doanh nghiệp tri ân đối tác và quà biếu gia đình trọn vẹn tình thân.
          </p>
        </div>

        {/* Carousel Viewport with Embla Loop */}
        <div className="relative group/carousel">
          <div 
            ref={emblaRef} 
            className="overflow-hidden cursor-grab active:cursor-grabbing rounded-3xl py-4"
          >
            <div className="flex -ml-5 md:-ml-6 touch-pan-y">
              {HOT_SETS.map((item, idx) => {
                const isFirst = item.isRecommended

                return (
                  <div
                    key={item.id}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-5 md:pl-6 min-w-0"
                  >
                    <div 
                      className={`relative h-full rounded-3xl overflow-hidden transition-all duration-500 flex flex-col justify-between select-none ${
                        isFirst
                          ? "bg-gradient-to-b from-amber-500/10 via-card to-card border-2 border-amber-400/90 shadow-[0_10px_35px_rgba(245,158,11,0.22)] ring-4 ring-amber-400/15 hover:shadow-[0_15px_45px_rgba(245,158,11,0.35)]"
                          : "bg-card/90 backdrop-blur-md border border-border/80 hover:border-gold/60 shadow-md hover:shadow-2xl"
                      }`}
                    >
                      {/* Badge Area */}
                      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                        {isFirst ? (
                          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/40 border border-amber-200 animate-pulse">
                            <Crown className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                            <span>100% RECOMMENDED</span>
                            <Award className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-background/90 backdrop-blur-md text-foreground text-[11px] font-semibold tracking-wide border border-border/60">
                            <Sparkles className="w-3 h-3 text-gold" />
                            <span>{item.priceTag}</span>
                          </div>
                        )}

                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-sm">
                          Set #{idx + 1}
                        </span>
                      </div>

                      {/* Image Container with 2026 modern hover zoom */}
                      <div 
                        className="relative aspect-[4/5] w-full overflow-hidden cursor-pointer"
                        onClick={() => setSelectedSet(item)}
                      >
                        <Image
                          src={item.image}
                          alt={`${item.title} - Bánh Trung Thu Văn Hòa Lạc`}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          priority={idx === 0}
                        />

                        {/* Gradient shade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                        {/* Quick View Hover Indicator */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <button 
                            className="px-4 py-2.5 rounded-full bg-white/95 text-primary font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl backdrop-blur-md transform transition-all duration-300 hover:scale-105"
                            aria-label={`Xem chi tiết ${item.title}`}
                          >
                            <Eye className="w-4 h-4" />
                            <span>Xem Ảnh Chi Tiết</span>
                          </button>
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-xs font-semibold text-gold tracking-widest uppercase mb-1">
                            {item.subtitle}
                          </p>
                          <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground hover:text-primary transition-colors line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Highlights checklist */}
                        <div className="pt-2 border-t border-border/50 space-y-1.5">
                          {item.highlights.slice(0, 2).map((hl, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-2 text-xs text-foreground/80">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                              <span className="truncate">{hl}</span>
                            </div>
                          ))}
                        </div>

                        {/* Action CTA Buttons */}
                        <div className="pt-3 flex items-center gap-2.5">
                          <Link
                            href="https://zalo.me/0971682213"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                              isFirst
                                ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/25 hover:scale-[1.02]"
                                : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:scale-[1.02]"
                            }`}
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Tư Vấn Zalo</span>
                          </Link>

                          <button
                            onClick={() => setSelectedSet(item)}
                            className="p-3 rounded-xl border border-border/70 hover:border-primary hover:bg-primary/10 text-foreground transition-all duration-300"
                            title="Xem chi tiết set"
                            aria-label="Xem chi tiết set quà"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Controls: Prev & Next buttons */}
          <button
            onClick={scrollPrev}
            aria-label="Set quà trước"
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-background/95 backdrop-blur-xl border border-border/90 shadow-xl text-foreground flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={scrollNext}
            aria-label="Set quà tiếp theo"
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-background/95 backdrop-blur-xl border border-border/90 shadow-xl text-foreground flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Pagination & Indicator */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/40 pt-6">
          <div className="flex items-center gap-2">
            {HOT_SETS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollTo(dotIdx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  dotIdx === selectedIndex
                    ? "w-8 bg-amber-500 shadow-sm shadow-amber-500/40"
                    : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Chuyển đến set ${dotIdx + 1}`}
              />
            ))}
          </div>

          {/* Status note with pause/play indicator */}
          <div className="flex items-center gap-2.5 text-xs text-muted-foreground bg-muted/40 px-3.5 py-1.5 rounded-full border border-border/40">
            {isPaused ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-500" />
                <span>Đang tạm dừng xem chi tiết</span>
              </>
            ) : (
              <>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Vòng slide chạy tự động sau 3.2s • Vòng lặp vô tận</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={scrollPrev}
              className="px-4 py-2 rounded-xl bg-card border border-border text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Trước
            </button>
            <button
              onClick={scrollNext}
              className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              Sau <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Dialog Modal for High-Res Preview */}
      <AnimatePresence>
        {selectedSet && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedSet(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative max-w-4xl w-full bg-card rounded-3xl overflow-hidden shadow-2xl border border-border grid md:grid-cols-2 max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedSet(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
                aria-label="Đóng xem chi tiết"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="relative aspect-square md:aspect-auto h-72 md:h-full w-full bg-muted">
                <Image
                  src={selectedSet.image}
                  alt={selectedSet.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {selectedSet.isRecommended && (
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg">
                    <Crown className="w-3.5 h-3.5 fill-slate-950" />
                    <span>100% RECOMMENDED</span>
                  </div>
                )}
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-gold tracking-widest uppercase">
                      {selectedSet.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-1">
                      {selectedSet.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {selectedSet.description}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Điểm Nổi Bật Của Set Quà:
                    </h4>
                    {selectedSet.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <Link
                    href="https://zalo.me/0971682213"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Tư Vấn & Báo Giá Qua Zalo (0971.682.213)</span>
                  </Link>

                  <p className="text-[11px] text-center text-muted-foreground">
                    ⚡ Hỗ trợ in logo công ty lên hộp từ 20 set • Giao hàng tận nơi toàn quốc
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
