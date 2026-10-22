import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Metadata } from "next"

export const dynamic = 'force-dynamic'

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
    const res = await fetch('http://127.0.0.1:8000/api/posts?published_only=true', { 
      cache: 'no-store',
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
      <main className="flex-1 bg-[#F7F3EC] min-h-screen pt-28 md:pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Breadcrumbs 
              items={[
                { label: 'Trang chủ', href: '/' },
                { label: 'Bài viết', href: '/bai-viet' },
              ]} 
            />
          </div>

          <div className="bg-[#FFFCF7] border border-[#E8E1D5] rounded-[28px] md:rounded-[36px] p-6 sm:p-10 md:p-14 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F3EC] border border-[#E8E1D5] text-[#7A2935] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B58A4A]" />
                  Nhật Ký & Báo Chí
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#30251F]">
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
                  <article className="h-full flex flex-col bg-[#F7F3EC]/70 border border-[#E8E1D5] rounded-[24px] overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E1D5]/40">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 right-4 bg-[#FFFCF7]/95 backdrop-blur-sm px-3 py-1 rounded-full border border-[#E8E1D5] shadow-xs">
                        <span className="text-[11px] tracking-wider uppercase font-bold text-[#B58A4A]">{post.category}</span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-[#30251F]/60 tracking-widest uppercase mb-2">
                          {post.date}
                        </p>
                        <h3 className="font-serif text-xl font-bold text-[#30251F] group-hover:text-[#7A2935] transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="mt-3 text-[#30251F]/75 text-sm leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="mt-5 pt-4 border-t border-[#E8E1D5]/70 flex items-center justify-between text-xs font-bold text-[#7A2935] uppercase tracking-wider">
                        <span>Đọc tiếp</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            
            {displayPosts.length === 0 && (
              <div className="text-center py-20 text-[#30251F]/60">
                Chưa có bài viết nào!
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
