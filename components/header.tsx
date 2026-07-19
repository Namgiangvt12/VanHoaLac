"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Youtube } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add scroll effect for glassmorphism
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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-lg border-b border-border py-3 shadow-md" : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="group flex items-center gap-2"
            title="Bánh Trung Thu Văn Hòa Lạc - Trang Chủ"
          >
            <span className={`font-serif text-2xl font-bold tracking-tight transition-transform group-hover:scale-105 ${scrolled ? "text-primary" : "text-white"}`}>
              Văn Hòa Lạc
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`text-xs tracking-[0.2em] uppercase font-medium hover:text-primary transition-all relative group ${scrolled ? "text-muted-foreground" : "text-white/90"}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${scrolled ? "bg-primary" : "bg-white"}`} />
              </Link>
            ))}
          </div>

          {/* CTA & YouTube Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#youtube-section"
              className={`p-2 rounded-full transition-colors ${scrolled ? "text-primary hover:bg-primary/5" : "text-white hover:bg-white/10"}`}
              title="Xem video quy trình"
            >
              <Youtube size={20} />
            </Link>
            <Link
              href="https://zalo.me/0971682213"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-2.5 text-xs tracking-widest uppercase font-bold rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${
                scrolled 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "bg-white text-primary hover:bg-white/90"
              }`}
            >
              Đặt Bánh Ngay
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-full transition-all ${scrolled ? "text-primary hover:bg-primary/5" : "text-white hover:bg-white/10"}`}
            aria-label={isOpen ? "Đóng menu" : "Mở menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation with Framer Motion */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl mt-4 rounded-2xl border border-border shadow-2xl"
            >
              <nav className="p-6 flex flex-col gap-6" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={link.href} 
                      className="text-sm tracking-[0.2em] uppercase font-semibold text-foreground hover:text-primary block transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
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

