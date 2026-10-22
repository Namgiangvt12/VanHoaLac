"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export interface BlogPostItem {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  category: string
  href: string
}

interface BlogMotionGridProps {
  posts: BlogPostItem[]
}

export function BlogMotionGrid({ posts }: BlogMotionGridProps) {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE9DF] border border-[#E8E1D5] text-[#B58A4A] text-xs uppercase tracking-[0.25em] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#B58A4A]" />
            <span>Nhật Ký Làm Bánh</span>
          </div>

          <h2 
            id="blog-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#30251F] tracking-tight leading-tight"
          >
            Câu chuyện từ căn bếp
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="self-start md:self-auto"
        >
          <Link
            href="/bai-viet"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E8E1D5] bg-[#FFFCF7] text-xs tracking-[0.16em] uppercase font-bold text-[#30251F] hover:bg-[#7A2935] hover:text-[#FFFCF7] hover:border-[#7A2935] transition-all shadow-sm active:scale-95 group"
          >
            <span>Xem Tất Cả Bài Viết</span>
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Blog Cards Grid with Staggered In-View Reveal & 6px Lift */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {posts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6%" }}
            transition={{ 
              duration: 0.8, 
              delay: idx * 0.12, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
            className="h-full"
          >
            <Link 
              href={post.href} 
              className="group block h-full"
              target={post.href.startsWith("http") ? "_blank" : undefined}
              rel={post.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <article className="h-full flex flex-col bg-[#FFFCF7] border border-[#E8E1D5] hover:border-[#B58A4A]/60 rounded-[26px] overflow-hidden shadow-sm hover:shadow-xl transition-colors duration-300">
                {/* Image Container with subtle max 1.04 zoom */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE9DF]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-[#FFFCF7]/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#E8E1D5] shadow-sm">
                    <span className="text-[10px] tracking-widest uppercase font-bold text-[#7A2935]">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Text Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs text-[#766960] font-medium block">
                      {post.date}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#30251F] group-hover:text-[#7A2935] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[#766960] text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8E1D5]/60 flex items-center justify-between text-xs font-bold text-[#7A2935] uppercase tracking-wider">
                    <span>Đọc tiếp</span>
                    <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  )
}
