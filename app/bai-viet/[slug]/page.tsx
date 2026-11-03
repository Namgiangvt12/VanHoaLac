import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { 
  resolvePostImage, 
  toAbsoluteUrl, 
  toVietnamIso8601 
} from "@/lib/blog-helpers"

export const dynamic = 'force-dynamic'

// Configure this to match where FastAPI is running
const API_URL = "http://127.0.0.1:8000/api/posts"

async function getPost(slug: string) {
  try {
    const res = await fetch(`${API_URL}/${slug}`, { 
      cache: 'no-store',
      signal: AbortSignal.timeout(2000)
    })
    if (!res.ok) return null
    return await res.json()
  } catch (e) {
    return null
  }
}

async function getAllPublishedPosts() {
  try {
    const res = await fetch(`${API_URL}?published_only=true`, { 
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(2000)
    })
    if (!res.ok) return []
    return await res.json()
  } catch (e) {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.slug)
  if (!post) {
    return { title: 'Lỗi 404 - Bài Viết Không Tồn Tại' }
  }

  const canonicalUrl = `https://vanhoalac.vn/bai-viet/${post.slug}`
  const customMetaTitle = (post.meta_title || "").trim()
  const customMetaDesc = (post.meta_description || "").trim()
  const customOgImage = (post.og_image || "").trim()

  const title = customMetaTitle || `${post.title} | Văn Hòa Lạc Vũng Tàu`
  const description = customMetaDesc || post.excerpt || "Bánh trung thu Văn Hòa Lạc Vũng Tàu cao cấp, gìn giữ truyền thống từ năm 1970."
  const shareImage = customOgImage || resolvePostImage(post.image_url, post.category, post.slug)

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: customMetaTitle || post.title,
      description,
      url: canonicalUrl,
      siteName: 'Văn Hòa Lạc Vũng Tàu',
      type: 'article',
      images: shareImage ? [{ url: shareImage, alt: post.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: customMetaTitle || post.title,
      description,
      images: shareImage ? [shareImage] : [],
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const [post, allPosts] = await Promise.all([
    getPost(resolvedParams.slug),
    getAllPublishedPosts()
  ])
  
  if (!post) {
    notFound()
  }

  const canonicalUrl = `https://vanhoalac.vn/bai-viet/${post.slug}`
  const displayImage = resolvePostImage(post.image_url, post.category, post.slug)
  const absoluteImageUrl = toAbsoluteUrl(post.og_image || displayImage)
  const datePublishedIso = toVietnamIso8601(post.created_at)
  const dateModifiedIso = toVietnamIso8601(post.updated_at || post.created_at)

  const jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "headline": post.title,
    "description": (post.meta_description || post.excerpt || post.title),
    "image": [absoluteImageUrl],
    ...(datePublishedIso ? { "datePublished": datePublishedIso } : {}),
    ...(dateModifiedIso ? { "dateModified": dateModifiedIso } : {}),
    "author": {
      "@type": "Organization",
      "@id": "https://vanhoalac.vn/#business",
      "name": "Văn Hòa Lạc Vũng Tàu",
      "url": "https://vanhoalac.vn/ve-chung-toi"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://vanhoalac.vn/#business",
      "name": "Văn Hòa Lạc Vũng Tàu",
      "url": "https://vanhoalac.vn",
      "logo": {
        "@type": "ImageObject",
        "url": "https://vanhoalac.vn/logo.png"
      }
    }
  }

  // Chọn 3-4 bài viết liên quan ưu tiên cùng category
  const otherPosts = Array.isArray(allPosts)
    ? allPosts.filter((p: any) => p.slug && p.slug !== post.slug)
    : []
  const sameCategory = otherPosts.filter(
    (p: any) => (p.category || "").toLowerCase() === (post.category || "").toLowerCase()
  )
  const diffCategory = otherPosts.filter(
    (p: any) => (p.category || "").toLowerCase() !== (post.category || "").toLowerCase()
  )
  const relatedPosts = [...sameCategory, ...diffCategory].slice(0, 4)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-28 md:pt-32 pb-24 px-4 sm:px-6 min-h-screen bg-[#F7F3EC]">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[
            { label: "Bài Viết", href: "/bai-viet" },
            { label: post.title, href: `/bai-viet/${post.slug}` }
          ]} />
          
          <article className="bg-[#FFFCF7] border border-[#E8E1D5] rounded-[28px] md:rounded-[36px] p-6 sm:p-10 md:p-14 shadow-xs mt-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F3EC] border border-[#E8E1D5] text-[#7A2935] text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B58A4A]" />
              {post.category || "Bài Viết & Báo Chí"}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[#30251F] leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-xs sm:text-sm text-[#30251F]/60 mb-8 pb-6 border-b border-[#E8E1D5] gap-y-1">
              <span>Đăng ngày: {new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
              <span className="mx-3">•</span>
              <Link href="/ve-chung-toi" className="text-[#B58A4A] font-semibold hover:underline">
                Văn Hòa Lạc Vũng Tàu
              </Link>
            </div>

            <div className="relative aspect-video w-full mb-10 rounded-[22px] md:rounded-[28px] overflow-hidden border border-[#E8E1D5] shadow-xs bg-[#EFE9DF]">
              <Image
                src={displayImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            <div 
              className="quill-content text-[#30251F]/85 text-base sm:text-lg leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: post.content ? post.content.replace(/&nbsp;|\u00A0/g, ' ') : '' }}
            />

            {/* Khối khám phá sản phẩm từ bài viết */}
            <div className="mt-10 pt-6 border-t border-[#E8E1D5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F7F3EC]/70 p-5 rounded-2xl">
              <div>
                <p className="font-serif font-bold text-[#30251F] text-base">
                  Thưởng thức bánh trung thu thủ công Văn Hòa Lạc Vũng Tàu
                </p>
                <p className="text-xs text-[#30251F]/70 mt-0.5">
                  Gia truyền từ năm 1970 • Bánh Da Dợp vỏ giòn xốp &amp; Bánh nướng truyền thống
                </p>
              </div>
              <Link
                href="/san-pham"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#7A2935] hover:bg-[#581C25] text-[#FFFCF7] text-xs font-bold uppercase tracking-wider shrink-0 transition-colors"
              >
                <span>Xem Danh Mục Bánh</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>

          {/* Bài viết liên quan */}
          {relatedPosts.length > 0 && (
            <section className="mt-12 bg-[#FFFCF7] border border-[#E8E1D5] rounded-[28px] md:rounded-[36px] p-6 sm:p-10 shadow-xs" aria-labelledby="related-posts-heading">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B58A4A] block mb-1">
                    Đọc Tiếp Chủ Đề Này
                  </span>
                  <h2 id="related-posts-heading" className="font-serif text-2xl sm:text-3xl font-bold text-[#30251F]">
                    Bài Viết Liên Quan
                  </h2>
                </div>
                <Link
                  href="/bai-viet"
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#7A2935] hover:underline"
                >
                  <span>Xem tất cả</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {relatedPosts.map((rel: any) => {
                  const relImg = resolvePostImage(rel.image_url, rel.category, rel.slug)
                  return (
                    <Link
                      key={rel.slug}
                      href={`/bai-viet/${rel.slug}`}
                      className="group flex flex-col justify-between rounded-[20px] bg-[#F7F3EC]/70 border border-[#E8E1D5] hover:border-[#B58A4A] overflow-hidden transition-all hover:shadow-md"
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#EFE9DF]">
                        <Image
                          src={relImg}
                          alt={rel.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                        <div className="absolute top-3 right-3 bg-[#FFFCF7]/95 px-2.5 py-0.5 rounded-full border border-[#E8E1D5]">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A2935]">
                            {rel.category || "Tin tức"}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-[11px] text-[#30251F]/60 uppercase tracking-wider mb-1">
                            {rel.created_at ? new Date(rel.created_at).toLocaleDateString('vi-VN') : ''}
                          </p>
                          <h3 className="font-serif text-lg font-bold text-[#30251F] group-hover:text-[#7A2935] transition-colors line-clamp-2 leading-snug">
                            {rel.title}
                          </h3>
                          {rel.excerpt && (
                            <p className="text-xs text-[#30251F]/70 mt-2 line-clamp-2 leading-relaxed">
                              {rel.excerpt}
                            </p>
                          )}
                        </div>
                        <div className="mt-4 pt-3 border-t border-[#E8E1D5]/70 flex items-center justify-between text-xs font-bold text-[#7A2935] uppercase tracking-wider">
                          <span>Đọc bài viết</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
