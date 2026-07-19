import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tất Cả Bài Viết | Văn Hòa Lạc",
  description: "Cập nhật những tin tức và câu chuyện mới nhất từ tiệm bánh trung thu truyền thống Văn Hòa Lạc Vũng Tàu.",
}

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

async function getAllPosts() {
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

export default async function BlogListPage() {
  const dbPosts = await getAllPosts()

  const formattedDbPosts = dbPosts.map((p: any) => ({
    id: p.id,
    title: p.title,
    excerpt: p.excerpt,
    image: p.image_url || "/images/blog-crafting.jpg",
    date: new Date(p.created_at).toLocaleDateString("vi-VN"),
    category: p.category,
    href: `/bai-viet/${p.slug}`
  }))

  const displayPosts = [...formattedDbPosts, ...defaultPosts]

  return (
    <>
      <Header />
      <main className="flex-1 bg-secondary min-h-screen">
        <div className="pt-24 border-b border-border/40 bg-background/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Breadcrumbs 
              items={[
                { label: 'Trang chủ', href: '/' },
                { label: 'Bài viết', href: '/bai-viet' },
              ]} 
            />
          </div>
        </div>

        <section className="py-16 md:py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
                  Nhật Ký
                </p>
                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light">
                  Tất cả bài viết
                </h1>
              </div>
            </div>

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
                    <div className="relative aspect-[4/3] overflow-hidden mb-6 rounded-lg bg-background/50">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 right-4 bg-background px-4 py-1.5 text-xs tracking-widest uppercase">
                        {post.category}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-sm tracking-widest text-muted-foreground">
                        {post.date}
                      </p>
                      <h3 className="font-serif text-xl md:text-2xl font-light leading-snug group-hover:text-amber-700 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            
            {displayPosts.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                Chưa có bài viết nào!
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
