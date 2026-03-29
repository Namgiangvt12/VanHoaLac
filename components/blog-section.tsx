import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Nghệ Thuật Làm Vỏ Bánh Trung Thu Hoàn Hảo",
    excerpt: "Làm chủ sự cân bằng tinh tế giữa kết cấu và hương vị trong nghề làm bánh truyền thống.",
    image: "/images/blog-crafting.jpg",
    date: "Tháng 5, 2026",
    category: "Kỹ Thuật",
  },
  {
    id: 2,
    title: "Trà Kết Hợp Cùng Bánh Trung Thu",
    excerpt: "Khám phá những loại trà hoàn hảo để nâng tầm trải nghiệm Tết Trung Thu của bạn.",
    image: "/images/blog-tea.jpg",
    date: "Tháng 4, 2026",
    category: "Kết Hợp",
  },
  {
    id: 3,
    title: "Lịch Sử Tết Trung Thu",
    excerpt: "Khám phá những truyền thống phong phú và truyền thuyết đằng sau lễ hội được yêu thích này.",
    image: "/images/blog-festival.jpg",
    date: "Tháng 6, 2026",
    category: "Văn Hóa",
  },
]

export function BlogSection() {
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
            href="#"
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase hover:text-muted-foreground transition-colors"
          >
            Xem Tất Cả Bài Viết
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
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
          ))}
        </div>
      </div>
    </section>
  )
}
