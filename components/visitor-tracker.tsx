'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function VisitorTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Skip tracking for admin paths
    if (pathname && pathname.startsWith('/admin')) return

    // 1. Get or create unique Session ID
    let sessionId = localStorage.getItem('vhl_session_id')
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36)
      localStorage.setItem('vhl_session_id', sessionId)
    }

    // 2. Track page view
    const sendTrackingData = (clickedBuy: boolean = false) => {
      try {
        const payload = {
          session_id: sessionId,
          page_url: pathname || '/',
          referrer: document.referrer || '',
          clicked_buy_now: clickedBuy
        }

        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {})
      } catch (e) {}
    }

    // Initial page track
    sendTrackingData(false)

    // 3. Global listener for "Buy Now" / "Đặt Bánh" click events
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      
      const text = (target.textContent || '').toLowerCase()
      const isBuyAction = 
        text.includes('mua') || 
        text.includes('đặt bánh') || 
        text.includes('đặt hàng') || 
        text.includes('zalo') || 
        text.includes('gọi điện') || 
        target.closest('a[href*="zalo"]') || 
        target.closest('a[href*="tel"]')

      if (isBuyAction) {
        sendTrackingData(true)
      }
    }

    window.addEventListener('click', handleGlobalClick)
    return () => {
      window.removeEventListener('click', handleGlobalClick)
    }
  }, [pathname])

  return null
}
