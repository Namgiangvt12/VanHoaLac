"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"

export function FloatingCTA() {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <Link 
      href="https://zalo.me/0971682213"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2.5 bg-[#7A2935] hover:bg-[#581C25] text-[#FFFCF7] px-5 sm:px-6 py-3.5 rounded-full shadow-[0_10px_30px_rgba(122,41,53,0.35)] border border-white/20 active:scale-95 hover:scale-105 transition-all group"
      aria-label="Đặt bánh qua Zalo"
    >
      <div className="relative flex h-2.5 w-2.5">
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white" />
      </div>
      <MessageCircle className="w-4 h-4 text-[#DFC28E] group-hover:scale-110 transition-transform" />
      <span className="font-bold tracking-wider text-xs uppercase">Đặt Bánh Ngay</span>
    </Link>
  )
}
