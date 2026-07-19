import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vanhoalac.vn'

  let blogEntries: MetadataRoute.Sitemap = []
  try {
    // Lấy bài viết từ local backend API (chỉ lấy bài đã xuất bản)
    const res = await fetch('http://127.0.0.1:8000/api/posts?published_only=true', { next: { revalidate: 3600 } })
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
    console.error("Lỗi lấy sitemap bài viết:", err)
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
    ...blogEntries
  ]
}
