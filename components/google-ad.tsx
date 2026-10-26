'use client'

import React, { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

interface GoogleAdProps {
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical'
  responsive?: boolean
  className?: string
  style?: React.CSSProperties
}

/**
 * Component hiển thị đơn vị quảng cáo Google AdSense thủ công theo Slot.
 * (Nếu bạn bật Quảng Cáo Tự Động - Auto Ads trên Google AdSense console thì không cần dùng component này).
 */
export function GoogleAd({
  slot,
  format = 'auto',
  responsive = true,
  className,
  style,
}: GoogleAdProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || []
        window.adsbygoogle.push({})
      }
    } catch (err) {
      console.error('Google AdSense error:', err)
    }
  }, [])

  return (
    <div className={className} style={{ overflow: 'hidden', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...(style || {}) }}
        data-ad-client="ca-pub-3196172423187525"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
