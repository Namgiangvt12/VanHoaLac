import { NextResponse } from 'next/server'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase is not configured or has placeholder values, return fallback data
  if (!supabaseUrl || !supabaseAnonKey ||
      supabaseUrl.startsWith('your_') || supabaseAnonKey.startsWith('your_') ||
      !supabaseUrl.startsWith('http')) {
    const fallbackPosts = [
      {
        id: '1',
        title: "Cách chọn bánh trung thu chất lượng",
        slug: "cach-chon-banh-trung-thu",
        excerpt: "Hướng dẫn chi tiết cách chọn bánh trung thu ngon và chất lượng cho gia đình bạn",
        content: "Bánh trung thu là một sản phẩm truyền thống và cần được chọn lựa kỹ lưỡng...",
        image_url: "/images/blog-crafting.jpg",
        category: "Hướng dẫn",
        published: true,
      },
    ]
    return NextResponse.json(fallbackPosts)
  }

  try {
    // Dynamically import Supabase to avoid initialization issues
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching posts:', error)
      // Return fallback data on error
      const fallbackPosts = [
        {
          id: '1',
          title: "Cách chọn bánh trung thu chất lượng",
          slug: "cach-chon-banh-trung-thu",
          excerpt: "Hướng dẫn chi tiết cách chọn bánh trung thu ngon và chất lượng cho gia đình bạn",
          content: "Bánh trung thu là một sản phẩm truyền thống và cần được chọn lựa kỹ lưỡng...",
          image_url: "/images/blog-crafting.jpg",
          category: "Hướng dẫn",
          published: true,
        },
      ]
      return NextResponse.json(fallbackPosts)
    }

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Unexpected error:', error)
    // Return fallback data on error
    const fallbackPosts = [
      {
        id: '1',
        title: "Cách chọn bánh trung thu chất lượng",
        slug: "cach-chon-banh-trung-thu",
        excerpt: "Hướng dẫn chi tiết cách chọn bánh trung thu ngon và chất lượng cho gia đình bạn",
        content: "Bánh trung thu là một sản phẩm truyền thống và cần được chọn lựa kỹ lưỡng...",
        image_url: "/images/blog-crafting.jpg",
        category: "Hướng dẫn",
        published: true,
      },
    ]
    return NextResponse.json(fallbackPosts)
  }
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const body = await request.json()
    const { title, slug, excerpt, content, image_url, category, published } = body

    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json({ error: 'Missing required fields: title, slug, excerpt, content' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title,
          slug,
          excerpt,
          content,
          image_url: image_url || '/images/default-blog.jpg',
          category: category || 'Tin tức',
          published: published || false,
        }
      ])
      .select()

    if (error) {
      console.error('Error inserting post:', error)
      return NextResponse.json({ error: 'Failed to add post' }, { status: 500 })
    }

    return NextResponse.json({ success: true, post: data[0] })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
