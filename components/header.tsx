"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, Youtube, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLenis } from "./smooth-scroll-provider"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { stopScroll, startScroll } = useLenis()

  const isHomePage = pathname === "/"

  // Scroll locking, route change dismissal, and Escape listener for mobile menu
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      stopScroll()
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false)
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => {
        startScroll()
        window.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [isOpen, stopScroll, startScroll])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Giới Thiệu", href: "/ve-chung-toi" },
    { name: "Set Hot", href: "/#hot-set" },
    { name: "Sản Phẩm", href: "/#products" },
    { name: "Video", href: "/#youtube-section" },
    { name: "Bài Viết", href: "/#blog" },
    { name: "Liên Hệ", href: "/lien-he" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-3 md:pt-4 px-4 sm:px-6 lg:px-8 transition-all duration-300 pointer-events-none">
      <nav 
        className={`max-w-7xl mx-auto pointer-events-auto rounded-full transition-all duration-300 border ${
          scrolled 
            ? "bg-[#FFFCF7]/95 backdrop-blur-xl border-[#E8E1D5] shadow-[0_8px_30px_rgba(48,37,31,0.08)] py-2.5 px-6" 
            : isHomePage
              ? "bg-[#30251F]/40 backdrop-blur-md border-white/20 py-3 px-6 shadow-sm"
              : "bg-[#FFFCF7]/90 backdrop-blur-xl border-[#E8E1D5] py-3 px-6 shadow-sm"
        }`} 
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link 
            href="/" 
            className="group flex items-center gap-2"
            title="Bánh Trung Thu Văn Hòa Lạc - Trang Chủ"
          >
            <span className={`font-serif text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
              !scrolled && isHomePage ? "text-[#FFFCF7]" : "text-[#30251F] group-hover:text-[#7A2935]"
            }`}>
              Văn Hòa Lạc
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`text-xs tracking-[0.16em] uppercase font-semibold transition-all relative py-1 ${
                    !scrolled && isHomePage
                      ? isActive ? "text-[#B58A4A]" : "text-white/85 hover:text-[#B58A4A]"
                      : isActive ? "text-[#7A2935]" : "text-[#30251F]/80 hover:text-[#7A2935]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                      !scrolled && isHomePage ? "bg-[#B58A4A]" : "bg-[#7A2935]"
                    }`} />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/#youtube-section"
              className={`p-2 rounded-full transition-all ${
                !scrolled && isHomePage 
                  ? "text-white/80 hover:text-white hover:bg-white/10" 
                  : "text-[#30251F]/70 hover:text-[#7A2935] hover:bg-[#EFE9DF]"
              }`}
              title="Xem video làm bánh Trung Thu Văn Hòa Lạc"
            >
              <Youtube size={19} />
            </Link>

            <Link
              href="https://zalo.me/0971682213"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-[11px] tracking-[0.14em] uppercase font-bold rounded-full bg-[#7A2935] text-[#FFFCF7] hover:bg-[#581C25] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95"
            >
              <span>Đặt Bánh Ngay</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile Menu Button - clean tap without rotate hover */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-full transition-colors active:scale-90 ${
              !scrolled && isHomePage 
                ? "text-white hover:bg-white/10" 
                : "text-[#30251F] hover:bg-[#EFE9DF]"
            }`}
            aria-label={isOpen ? "Đóng menu" : "Mở menu"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Navigation Overlay (Independent of nav pill to prevent rounded-full distortion) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] pointer-events-auto flex flex-col p-4 sm:p-6">
            {/* Backdrop: Tap anywhere to close */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#1F1916]/65 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div 
              role="dialog"
              aria-modal="true"
              aria-label="Menu điều hướng"
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              className="relative max-w-lg w-full mx-auto bg-[#FFFCF7] rounded-3xl border border-[#E8E1D5] shadow-2xl p-6 overflow-hidden flex flex-col gap-4 mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header row in modal */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D5]">
                <span className="font-serif text-xl font-bold text-[#30251F] tracking-tight">
                  Văn Hòa Lạc
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#EFE9DF] text-[#30251F] flex items-center justify-center hover:bg-[#7A2935] hover:text-[#FFFCF7] transition-colors active:scale-90"
                  aria-label="Đóng menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-1.5" aria-label="Mobile navigation links">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 220, 
                        damping: 24, 
                        delay: 0.05 + idx * 0.04 
                      }}
                    >
                      <Link 
                        href={link.href} 
                        className={`block text-sm tracking-[0.14em] uppercase font-semibold py-2.5 px-3 rounded-xl transition-colors ${
                          isActive 
                            ? "bg-[#7A2935] text-[#FFFCF7] font-bold shadow-xs" 
                            : "text-[#30251F] hover:bg-[#EFE9DF]/70"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-[#E8E1D5] flex flex-col gap-2.5">
                <Link
                  href="https://zalo.me/0971682213"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-[#7A2935] hover:bg-[#581C25] text-[#FFFCF7] px-5 py-3 text-xs tracking-widest uppercase font-bold rounded-full shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <span>Đặt Bánh Ngay (Zalo)</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/#youtube-section"
                  className="w-full text-center text-xs tracking-widest uppercase font-semibold text-[#766960] hover:text-[#30251F] py-1"
                  onClick={() => setIsOpen(false)}
                >
                  Xem Video Quy Trình
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  )
}
