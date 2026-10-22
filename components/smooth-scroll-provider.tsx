"use client"

import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import Lenis from "lenis"

interface LenisContextType {
  lenis: Lenis | null
  stopScroll: () => void
  startScroll: () => void
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  stopScroll: () => {},
  startScroll: () => {},
})

export function useLenis() {
  return useContext(LenisContext)
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenisRef.current = lenis
    setLenisInstance(lenis)

    let animationFrameId: number
    function raf(time: number) {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(raf)
    }
    animationFrameId = requestAnimationFrame(raf)

    // Intercept in-page hash links for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a")
      if (!target) return
      const href = target.getAttribute("href")
      if (href && href.startsWith("#") && href.length > 1) {
        const elem = document.querySelector(href)
        if (elem) {
          e.preventDefault()
          lenis.scrollTo(elem as HTMLElement, { offset: -60, duration: 1.2 })
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
      cancelAnimationFrame(animationFrameId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const stopScroll = () => {
    lenisRef.current?.stop()
    document.documentElement.classList.add("overflow-hidden")
  }

  const startScroll = () => {
    lenisRef.current?.start()
    document.documentElement.classList.remove("overflow-hidden")
  }

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance, stopScroll, startScroll }}>
      {children}
    </LenisContext.Provider>
  )
}
