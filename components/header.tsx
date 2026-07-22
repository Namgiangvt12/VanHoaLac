"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, Youtube } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Giới Thiệu", href: "/ve-chung-toi" },
    { name: "Sản Phẩm", href: "/#products" },
    { name: "Video", href: "/#youtube-section" },
    { name: "Bài Viết", href: "/#blog" },
    { name: "Liên Hệ", href: "/lien-he" },
  ]

  // Header Context: Dark transparent overlay ONLY on Home page top section.
  // On subpages or when scrolled, use standard clean backdrop with high contrast text.
  const isDarkHeader = isHomePage && !scrolled

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDarkHeader
          ? "bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5"
          : "bg-background/95 backdrop-blur-xl border-b border-border/60 py-3.5 shadow-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="group flex items-center gap-2"
            title="Bánh Trung Thu Văn Hòa Lạc - Trang Chủ"
          >
            <span className={`font-serif text-2xl font-bold tracking-tight transition-all group-hover:scale-105 ${
              isDarkHeader ? "text-white" : "text-primary"
            }`}>
              Văn Hòa Lạc
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`text-xs tracking-[0.2em] uppercase font-bold transition-all relative group py-1 ${
                    isDarkHeader
                      ? isActive ? "text-gold" : "text-white/90 hover:text-gold"
                      : isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  } ${isDarkHeader ? "bg-gold" : "bg-primary"}`} />
                </Link>
              )
            })}
          </div>

          {/* CTA & YouTube Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/#youtube-section"
              className={`p-2.5 rounded-full transition-all ${
                isDarkHeader 
                  ? "text-white hover:bg-white/10 hover:text-gold" 
                  : "text-primary hover:bg-primary/10"
              }`}
              title="Xem video làm bánh Trung Thu"
            >
              <Youtube size={20} />
            </Link>
            <Link
              href="https://zalo.me/0971682213"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-2.5 text-xs tracking-widest uppercase font-extrabold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 ${
                isDarkHeader 
                  ? "bg-white text-primary hover:bg-white/95" 
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              Đặt Bánh Ngay
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2.5 rounded-full transition-all ${
              isDarkHeader 
                ? "text-white hover:bg-white/10" 
                : "text-foreground hover:bg-muted"
            }`}
            aria-label={isOpen ? "Đóng menu" : "Mở menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-background/98 backdrop-blur-2xl mt-4 rounded-2xl border border-border shadow-2xl"
            >
              <nav className="p-6 flex flex-col gap-5" aria-label="Mobile navigation">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Link 
                        href={link.href} 
                        className={`text-sm tracking-[0.2em] uppercase font-bold block transition-colors ${
                          isActive ? "text-primary" : "text-foreground hover:text-primary"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  )
                })}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href="https://zalo.me/0971682213"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-center bg-primary text-primary-foreground px-6 py-4 text-xs tracking-[0.2em] uppercase font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
                    onClick={() => setIsOpen(false)}
                  >
                    Đặt Bánh Ngay
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
