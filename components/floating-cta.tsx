"use client"
import Link from "next/link"
import { PhoneCall } from "lucide-react"

export function FloatingCTA() {
  return (
    <Link 
      href="https://zalo.me/0971682213"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-red-600 text-white px-6 py-4 rounded-full shadow-2xl hover:bg-red-700 hover:scale-105 transition-all animate-bounce"
    >
      <div className="relative flex h-5 w-5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <PhoneCall className="relative inline-flex rounded-full h-5 w-5" />
      </div>
      <span className="font-medium tracking-wider text-sm md:text-base">MUA BÁNH NGAY</span>
    </Link>
  )
}
