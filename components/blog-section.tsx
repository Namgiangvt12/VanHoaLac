import { BlogMotionGrid, BlogPostItem } from "./blog-motion-grid"
import { resolvePostImage, isGiftPriorityPost } from "@/lib/blog-helpers"

const defaultPosts: BlogPostItem[] = [
  {
    id: 'a1',
    title: "Từ lò bánh truyền thống lên máy bay xuyên lục địa",
    excerpt: "Những ngày cuối tháng 7 Âm lịch, không khí ở làng nghề bánh trung thu Long Điền nhộn nhịp. Đặc biệt, ngày càng nhiều đơn hàng xuất ngoại.",
    image: "/images/blog-crafting.jpg",
    date: "Báo Gia Đình",
    category: "Báo Chí",
    href: "https://giadinhonline.vn/banh-trung-thu-long-dien-tu-lo-banh-truyen-thong-len-may-bay-xuyen-luc-dia-d208276.html"
  },
  {
    id: 'a2',
    title: "Giữ gìn thương hiệu bánh trung thu Long Điền",
    excerpt: "Hơn 50 năm qua, bánh trung thu được sản xuất tại thị trấn Long Ðiền (Bà Rịa-Vũng Tàu) vẫn có sức sống bền bỉ nhờ hương vị và bí quyết gia truyền.",
    image: "/images/blog-tea.jpg",
    date: "Báo Nhân Dân",
    category: "Báo Chí",
    href: "https://nhandan.vn/giu-gin-thuong-hieu-banh-trung-thu-long-dien-post774180.html"
  },
]

async function getLatestPosts() {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/posts?published_only=true', { 
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(2000)
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (e) {
    // Graceful fallback during build or when backend is offline
  }
  return []
}

export async function BlogSection() {
  const dbPosts = await getLatestPosts()

  const sortedDbPosts = [...dbPosts].sort((a: any, b: any) => {
    const aGift = isGiftPriorityPost(a) ? 1 : 0
    const bGift = isGiftPriorityPost(b) ? 1 : 0
    if (aGift !== bGift) return bGift - aGift
    return (Number(b.id) || 0) - (Number(a.id) || 0)
  })

  const formattedDbPosts: BlogPostItem[] = sortedDbPosts.map((p: any) => ({
    id: String(p.id),
    title: p.title,
    excerpt: p.excerpt,
    image: resolvePostImage(p.image_url, p.category, p.slug),
    date: new Date(p.created_at).toLocaleDateString('vi-VN'),
    category: p.category || "Tin Tức",
    href: `/bai-viet/${p.slug}`
  }))

  const displayPosts = [...formattedDbPosts, ...defaultPosts].slice(0, 6)

  return (
    <section id="blog" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-labelledby="blog-heading">
      <BlogMotionGrid posts={displayPosts} />
    </section>
  )
}

