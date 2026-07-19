import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import Image from "next/image"
import { notFound } from "next/navigation"

// Configure this to match where FastAPI is running
const API_URL = "http://127.0.0.1:8000/api/posts"

async function getPost(slug: string) {
  try {
    const res = await fetch(`${API_URL}/${slug}`, { cache: 'no-store' })
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
      <main className="pt-32 pb-24 px-6 min-h-screen bg-background">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={[
            { label: "Bài Viết", href: "/#blog" },
            { label: post.title, href: `/bai-viet/${post.slug}` }
          ]} />
          
          <article className="mt-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-primary leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              <span>Đăng ngày: {new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
              <span className="mx-3">•</span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">{post.category}</span>
            </div>

            {post.image_url && (
              <div className="relative aspect-video w-full mb-12 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div 
              className="quill-content text-foreground text-lg leading-relaxed mb-20"
              dangerouslySetInnerHTML={{ __html: post.content ? post.content.replace(/&nbsp;|\u00A0/g, ' ') : '' }}
            />
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
