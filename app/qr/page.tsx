"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { MapPin, Star, ExternalLink, Sparkles, Heart } from "lucide-react"

const MAPS_URL =
  "https://www.google.com/maps/place/B%C3%A1nh+Trung+Thu+V%C4%83n+H%C3%B2a+L%E1%BA%A1c+V%C5%A9ng+T%C3%A0u/@10.3585406,107.076507,1069m/data=!3m2!1e3!4b1!4m6!3m5!1s0x31756f7c553778ed:0x932f5ef477b3d205!8m2!3d10.3585353!4d107.0790819!16s%2Fg%2F11lf6vqpdd?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"

export default function QRRedirectPage() {
  const [timeLeft, setTimeLeft] = useState(3)

  useEffect(() => {
    if (timeLeft <= 0) {
      window.location.href = MAPS_URL
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const handleManualRedirect = () => {
    window.location.href = MAPS_URL
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-950 via-amber-900 to-amber-950 text-white flex flex-col justify-between items-center px-4 py-8 relative overflow-hidden font-sans">
      {/* Background Glow Decorations */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-red-600/15 rounded-full blur-2xl pointer-events-none" />

      {/* Header / Brand */}
      <header className="z-10 text-center pt-4">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full backdrop-blur-md mb-4 text-amber-300 text-xs sm:text-sm font-medium tracking-wide">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Bánh Trung Thu Văn Hòa Lạc Vũng Tàu</span>
        </div>
      </header>

      {/* Main Content Card */}
      <main className="z-10 w-full max-w-md my-auto">
        <div className="bg-amber-900/60 backdrop-blur-xl border border-amber-500/25 rounded-3xl p-6 sm:p-8 text-center shadow-2xl shadow-black/50 transition-all duration-300">
          
          {/* Logo / Brand Emblem */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-1 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-amber-950 rounded-[14px] flex flex-col items-center justify-center p-2 text-center">
              <span className="text-3xl sm:text-4xl">🥮</span>
              <span className="text-[10px] font-bold text-amber-300 tracking-wider uppercase mt-1">Văn Hòa Lạc</span>
            </div>
          </div>

          {/* Warm Welcome Message */}
          <h1 className="text-xl sm:text-2xl font-bold text-amber-100 mb-2 leading-snug">
            Cảm Ơn Quý Khách!
          </h1>
          <p className="text-sm sm:text-base text-amber-200/90 mb-6 leading-relaxed">
            Sự hài lòng và đánh giá của Quý Khách trên Google Maps là niềm tự hào & động lực lớn nhất của cửa hàng chúng tôi. ❤️
          </p>

          {/* 5 Stars Visual */}
          <div className="flex justify-center items-center gap-1.5 mb-6 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-7 h-7 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] animate-bounce"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>

          {/* Countdown timer & Progress Bar */}
          <div className="bg-amber-950/70 border border-amber-500/20 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-amber-300 mb-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-400 animate-ping" />
                Đang chuyển đến Google Maps...
              </span>
              <span className="text-amber-400 font-bold text-base px-2.5 py-0.5 bg-amber-500/20 rounded-lg border border-amber-500/30">
                {timeLeft}s
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-amber-950/80 rounded-full h-2.5 overflow-hidden p-0.5 border border-amber-800/50">
              <div
                className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 h-full rounded-full transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                style={{ width: `${((3 - timeLeft) / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleManualRedirect}
            className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-amber-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/25 transition-all duration-200 active:scale-95 cursor-pointer text-sm sm:text-base"
          >
            <span>Đánh Giá Ngay Trên Google Maps</span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Fallback note */}
          <p className="mt-4 text-xs text-amber-400/60">
            Nếu hệ thống không tự chuyển hướng, vui lòng nhấn nút phía trên.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="z-10 text-center py-4 text-xs text-amber-300/50">
        <p className="flex items-center justify-center gap-1">
          Bánh Trung Thu Văn Hòa Lạc Vũng Tàu <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
        </p>
      </footer>
    </div>
  )
}
