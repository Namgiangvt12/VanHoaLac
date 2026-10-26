import { MetadataRoute } from 'next'
import { PRODUCTS } from '@/lib/products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vanhoalac.vn'

  const productEntries: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${baseUrl}/san-pham/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  let blogEntries: MetadataRoute.Sitemap = []
  try {
    // Lấy bài viết từ local backend API (chỉ lấy bài đã xuất bản)
    const res = await fetch('http://127.0.0.1:8000/api/posts?published_only=true', { 
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(2000)
    })
    if (res.ok) {
      const posts = await res.json()
      blogEntries = posts.map((post: any) => ({
        url: `${baseUrl}/bai-viet/${post.slug}`,
        lastModified: post.created_at ? new Date(post.created_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }))
    }
  } catch (err) {
    // Graceful fallback during build
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/ve-chung-toi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/lien-he`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bai-viet`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/chinh-sach-bao-mat`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...productEntries,
    ...blogEntries
  ]
}
