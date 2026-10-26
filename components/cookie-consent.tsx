"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X, ShieldCheck } from "lucide-react"

const COOKIE_CONSENT_KEY = "vanhoalac_cookie_consent"

export function CookieConsent() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Bỏ qua nếu đang ở trang quản trị /admin
    if (pathname?.startsWith("/admin")) {
      return
    }

    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
      if (!consent) {
        // Trì hoãn nhẹ 1.2s để trang tải mượt mà trước khi hiện popup
        const timer = setTimeout(() => {
          setIsVisible(true)
        }, 1200)
        return () => clearTimeout(timer)
      }
    } catch (e) {
      // Bỏ qua lỗi trong môi trường không có localStorage
    }
  }, [pathname])

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "accepted")
    } catch (e) {}
    setIsVisible(false)
  }

  const handleAcceptNecessary = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "necessary")
    } catch (e) {}
    setIsVisible(false)
  }

  if (!mounted || pathname?.startsWith("/admin")) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          role="region"
          aria-label="Thông báo và tùy chọn Cookie"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md z-50 bg-[#FFFCF7]/95 backdrop-blur-md border border-[#E8E1D5] rounded-[24px] p-5 sm:p-6 shadow-[0_20px_50px_rgba(48,37,31,0.18)] text-[#30251F]"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-[#F7F3EC] border border-[#E8E1D5] text-[#7A2935] shadow-xs">
                <Cookie className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-serif font-bold text-base text-[#30251F] leading-tight">
                  Tùy Chọn Cookie & Quyền Riêng Tư
                </h3>
                <span className="text-[11px] font-medium text-[#B58A4A] tracking-wider uppercase flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Bảo Mật Thông Tin
                </span>
              </div>
            </div>
            <button
              onClick={handleAcceptNecessary}
              className="p-1 rounded-full text-[#30251F]/40 hover:text-[#30251F] hover:bg-[#F7F3EC] transition-colors"
              aria-label="Đóng thông báo cookie"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-[13px] text-[#30251F]/75 leading-relaxed mb-4">
            Chúng tôi sử dụng cookie để mang lại trải nghiệm xem bánh tốt nhất, ghi nhớ đơn hàng và phân tích lượng truy cập an toàn. Quý khách có thể xem chi tiết tại{" "}
            <Link
              href="/chinh-sach-bao-mat"
              className="text-[#7A2935] font-semibold underline underline-offset-2 hover:text-[#581C25] transition-colors"
            >
              Chính Sách Bảo Mật
            </Link>
            .
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
            <button
              onClick={handleAcceptAll}
              className="flex-1 bg-[#7A2935] hover:bg-[#581C25] text-white py-2.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 text-center"
            >
              Đồng Ý Tất Cả
            </button>
            <button
              onClick={handleAcceptNecessary}
              className="bg-[#F7F3EC] hover:bg-[#E8E1D5]/60 text-[#30251F]/80 border border-[#E8E1D5] py-2.5 px-4 rounded-full text-xs font-semibold transition-all active:scale-95 text-center"
            >
              Chỉ Cần Thiết
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
