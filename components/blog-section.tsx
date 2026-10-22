import { BlogMotionGrid, BlogPostItem } from "./blog-motion-grid"

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

  const formattedDbPosts: BlogPostItem[] = dbPosts.map((p: any) => ({
    id: p.id,
    title: p.title,
    excerpt: p.excerpt,
    image: p.image_url || "/images/blog-crafting.jpg",
    date: new Date(p.created_at).toLocaleDateString('vi-VN'),
    category: p.category || "Tin Tức",
    href: `/bai-viet/${p.slug}`
  }))

  const displayPosts = [...formattedDbPosts, ...defaultPosts].slice(0, 3)

  return (
    <section id="blog" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-labelledby="blog-heading">
      <BlogMotionGrid posts={displayPosts} />
    </section>
  )
}

