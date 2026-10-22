import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import Image from "next/image"
import { notFound } from "next/navigation"

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.slug)
  if (!post) {
    return { title: 'Lỗi 404 - Bài Viết Không Tồn Tại' }
  }
  return {
    title: `${post.title} | Văn Hòa Lạc Vũng Tàu`,
    description: post.excerpt || "Bánh trung thu Văn Hòa Lạc Vũng Tàu cao cấp, gìn giữ truyền thống.",
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image_url ? [{ url: post.image_url }] : [],
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.slug)
  
  if (!post) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": post.image_url ? [post.image_url] : [],
    "datePublished": post.created_at,
    "author": [{
        "@type": "Person",
        "name": "Bánh Trung Thu Văn Hòa Lạc",
        "url": "https://vanhoalac.vn/ve-chung-toi"
    }]
  }

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
            
            <div className="flex items-center text-xs sm:text-sm text-[#30251F]/60 mb-8 pb-6 border-b border-[#E8E1D5]">
              <span>Đăng ngày: {new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
              <span className="mx-3">•</span>
              <span className="text-[#B58A4A] font-semibold">Văn Hòa Lạc Vũng Tàu</span>
            </div>

            {post.image_url && (
              <div className="relative aspect-video w-full mb-10 rounded-[22px] md:rounded-[28px] overflow-hidden border border-[#E8E1D5] shadow-xs">
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div 
              className="quill-content text-[#30251F]/85 text-base sm:text-lg leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: post.content ? post.content.replace(/&nbsp;|\u00A0/g, ' ') : '' }}
            />
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
