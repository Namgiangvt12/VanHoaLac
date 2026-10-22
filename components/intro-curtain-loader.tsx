"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLenis } from "./smooth-scroll-provider"

const MIN_VISIBLE_MS = 1400
const MAX_VISIBLE_MS = 2600
const EXIT_MS = 850

export function IntroCurtainLoader() {
  const [shouldRender, setShouldRender] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const { stopScroll, startScroll } = useLenis()

  useEffect(() => {
    // Check if prefers-reduced-motion is enabled
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      window.dispatchEvent(new CustomEvent("vhl-intro-ready"))
      return
    }

    // Check sessionStorage to only run once per session
    try {
      const hasPlayed = sessionStorage.getItem("vhl_intro_played_v1")
      if (hasPlayed) {
        window.dispatchEvent(new CustomEvent("vhl-intro-ready"))
        return
      }
    } catch {
      // In case sessionStorage is blocked, proceed safely
    }

    // Activate loader and lock scroll
    setShouldRender(true)
    stopScroll()

    const startTime = Date.now()

    const triggerExit = () => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed)

      setTimeout(() => {
        setIsExiting(true)
        startScroll()
        window.dispatchEvent(new CustomEvent("vhl-intro-ready"))

        try {
          sessionStorage.setItem("vhl_intro_played_v1", "true")
        } catch {}

        // Remove from DOM after exit slide completes
        setTimeout(() => {
          setShouldRender(false)
        }, EXIT_MS)
      }, remaining)
    }

    if (document.readyState === "complete") {
      triggerExit()
    } else {
      window.addEventListener("load", triggerExit, { once: true })
    }

    // Fallback safety timeout
    const fallbackTimer = setTimeout(() => {
      triggerExit()
    }, MAX_VISIBLE_MS)

    return () => {
      clearTimeout(fallbackTimer)
      window.removeEventListener("load", triggerExit)
    }
  }, [stopScroll, startScroll])

  if (!shouldRender) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "0%" }}
        animate={isExiting ? { y: "-105%" } : { y: "0%" }}
        transition={{ 
          duration: EXIT_MS / 1000, 
          ease: [0.65, 0, 0.35, 1] 
        }}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#1F1916] text-[#FFFCF7] select-none pointer-events-auto"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-7">
          {/* Brand Wordmark & Seal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-3 text-center"
          >
            {/* Traditional Seal Mark */}
            <div className="w-12 h-12 rounded-full border border-[#B58A4A]/60 flex items-center justify-center bg-[#B58A4A]/10 shadow-inner">
              <span className="font-serif font-bold text-lg text-[#DFC28E]">和</span>
            </div>

            <div className="space-y-1">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase text-[#FFFCF7]">
                Văn Hòa Lạc
              </h2>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#DFC28E] font-medium">
                Gia Truyền Từ Năm 1970
              </p>
            </div>
          </motion.div>

          {/* Progress Track & Fill */}
          <div className="w-40 sm:w-48 h-[1.5px] rounded-full bg-white/20 overflow-hidden relative">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 0.12,
                duration: 1.28,
                ease: [0.65, 0, 0.35, 1]
              }}
              style={{ transformOrigin: "left" }}
              className="absolute inset-0 bg-gradient-to-r from-[#B58A4A] via-[#DFC28E] to-white"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
