export function getDefaultBlogImage(category?: string | null, slug?: string | null): string {
  const cat = (category || "").toLowerCase()
  const s = (slug || "").toLowerCase()

  if (
    cat.includes("khuyến mãi") ||
    cat.includes("quà") ||
    s.includes("qua-bieu") ||
    s.includes("qua-tang") ||
    s.includes("doanh-nghiep") ||
    s.includes("mam-co") ||
    s.includes("trung-thu-2026")
  ) {
    return "/images/blog-festival.jpg"
  }

  if (
    cat.includes("báo chí") ||
    s.includes("bao-quan") ||
    s.includes("chon-banh") ||
    s.includes("nguyen-lieu") ||
    s.includes("banh-nuong") ||
    s.includes("da-dop")
  ) {
    return "/images/blog-tea.jpg"
  }

  return "/images/blog-crafting.jpg"
}

export function resolvePostImage(
  imageUrl?: string | null,
  category?: string | null,
  slug?: string | null
): string {
  const trimmed = (imageUrl || "").trim()
  if (trimmed) return trimmed
  return getDefaultBlogImage(category, slug)
}

export function toAbsoluteUrl(urlOrPath: string): string {
  if (!urlOrPath) return "https://vanhoalac.vn/images/hero-mooncakes.jpg"
  if (urlOrPath.startsWith("http://") || urlOrPath.startsWith("https://")) {
    return urlOrPath
  }
  const cleanPath = urlOrPath.startsWith("/") ? urlOrPath : `/${urlOrPath}`
  return `https://vanhoalac.vn${cleanPath}`
}

export function toVietnamIso8601(rawDate?: string | null): string | undefined {
  if (!rawDate) return undefined
  const s = String(rawDate).trim()
  if (!s) return undefined

  // Already has timezone offset or Z
  if (/[+-]\d{2}:\d{2}$/.test(s) || s.endsWith("Z")) {
    return s.replace(" ", "T")
  }

  // Format: YYYY-MM-DD HH:MM:SS or YYYY-MM-DDTHH:MM:SS
  const matchFull = s.match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}(?::\d{2})?)$/)
  if (matchFull) {
    const timePart = matchFull[2].length === 5 ? `${matchFull[2]}:00` : matchFull[2]
    return `${matchFull[1]}T${timePart}+07:00`
  }

  // Format: YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    return `${s}T00:00:00+07:00`
  }

  const parsed = new Date(s)
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString()
  }

  return undefined
}

export function isGiftPriorityPost(post: { title?: string; slug?: string; category?: string }): boolean {
  const hay = `${post.title || ""} ${post.slug || ""} ${post.category || ""}`.toLowerCase()
  return (
    hay.includes("quà") ||
    hay.includes("qua-bieu") ||
    hay.includes("qua-tang") ||
    hay.includes("biếu") ||
    hay.includes("doanh nghiệp") ||
    hay.includes("doanh-nghiep") ||
    hay.includes("cuối năm") ||
    hay.includes("cuoi-nam") ||
    hay.includes("tết")
  )
}

