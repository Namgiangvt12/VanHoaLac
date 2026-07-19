import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const defaultPosts = [
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
    const res = await fetch('http://127.0.0.1:8000/api/posts?published_only=true', { next: { revalidate: 60 } })
    if (res.ok) {
      return await res.json()
    }
  } catch (e) {
    console.error(e)
  }
  return []
}

export async function BlogSection() {
  const dbPosts = await getLatestPosts()

  const formattedDbPosts = dbPosts.map((p: any) => ({
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
    <section id="blog" className="py-24 md:py-32 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Nhật Ký
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light">
              Câu chuyện từ căn bếp
            </h2>
          </div>
          <Link
            href="/bai-viet"
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase hover:text-muted-foreground transition-colors"
          >
            Xem Tất Cả Bài Viết
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <Link 
              key={post.id} 
              href={post.href} 
              className="group cursor-pointer block"
              target={post.href.startsWith("http") ? "_blank" : undefined}
              rel={post.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <article>
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1">
                    <span className="text-xs tracking-widest uppercase">{post.category}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-xs text-muted-foreground tracking-widest uppercase mb-3">
                    {post.date}
                  </p>
                  <h3 className="font-serif text-xl md:text-2xl font-light group-hover:text-muted-foreground transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
