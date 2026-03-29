import { NextResponse } from 'next/server'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase is not configured or has placeholder values, return fallback data
  if (!supabaseUrl || !supabaseAnonKey ||
      supabaseUrl.startsWith('your_') || supabaseAnonKey.startsWith('your_') ||
      !supabaseUrl.startsWith('http')) {
    const fallbackProducts = [
      {
        id: '1',
        name: "Bánh Trung Thu Nhân Hạt Sen",
        shortName: "Nhân Hạt Sen",
        description: "Bánh trung thu Văn Hòa Lạc nhân hạt sen Huế truyền thống với kết cấu mịn màng như lụa",
        price: "180.000đ",
        priceValue: 180000,
        image: "/images/mooncake-lotus.jpg",
        slug: "banh-hat-sen",
      },
      {
        id: '2',
        name: "Bánh Trung Thu Gà Quay",
        shortName: "Nhân Thập Cẩm Gà Quay",
        description: "Bánh trung thu Văn Hòa Lạc nhân đậu đỏ azuki Nhật Bản ngọt dịu với hương vị đất nhẹ",
        price: "160.000đ",
        priceValue: 160000,
        image: "/images/mooncake-redbean.jpg",
        slug: "banh-dau-do",
      },
      {
        id: '3',
        name: "Bánh Trung Thu Trứng Muối",
        shortName: "Trứng Muối",
        description: "Bánh trung thu Văn Hòa Lạc với lòng đỏ trứng muối Cần Giờ vàng óng tượng trưng cho trăng tròn",
        price: "220.000đ",
        priceValue: 220000,
        image: "/images/mooncake-egg.jpg",
        slug: "banh-trung-muoi",
      },
    ]
    return NextResponse.json(fallbackProducts)
  }

  try {
    // Dynamically import Supabase to avoid initialization issues
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('in_stock', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products:', error)
      // Return fallback data on error
      const fallbackProducts = [
        {
          id: '1',
          name: "Bánh Trung Thu Nhân Hạt Sen",
          shortName: "Nhân Hạt Sen",
          description: "Bánh trung thu Văn Hòa Lạc nhân hạt sen Huế truyền thống với kết cấu mịn màng như lụa",
          price: "180.000đ",
          priceValue: 180000,
          image: "/images/mooncake-lotus.jpg",
          slug: "banh-hat-sen",
        },
        {
          id: '2',
          name: "Bánh Trung Thu Nhân Đậu Đỏ",
          shortName: "Nhân Đậu Đỏ",
          description: "Bánh trung thu Văn Hòa Lạc nhân đậu đỏ azuki Nhật Bản ngọt dịu với hương vị đất nhẹ",
          price: "160.000đ",
          priceValue: 160000,
          image: "/images/mooncake-redbean.jpg",
          slug: "banh-dau-do",
        },
        {
          id: '3',
          name: "Bánh Trung Thu Trứng Muối",
          shortName: "Trứng Muối",
          description: "Bánh trung thu Văn Hòa Lạc với lòng đỏ trứng muối Cần Giờ vàng óng tượng trưng cho trăng tròn",
          price: "220.000đ",
          priceValue: 220000,
          image: "/images/mooncake-egg.jpg",
          slug: "banh-trung-muoi",
        },
      ]
      return NextResponse.json(fallbackProducts)
    }

    // Transform data to match the component's expected format
    const transformedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      shortName: product.name.split(' ').slice(-2).join(' '), // Extract last two words as shortName
      description: product.description,
      price: `${product.price.toLocaleString('vi-VN')}đ`,
      priceValue: product.price,
      image: product.image_url || '/images/default-mooncake.jpg',
      slug: product.slug,
    }))

    return NextResponse.json(transformedProducts)
  } catch (error) {
    console.error('Unexpected error:', error)
    // Return fallback data on error
    const fallbackProducts = [
      {
        id: '1',
        name: "Bánh Trung Thu Nhân Hạt Sen",
        shortName: "Nhân Hạt Sen",
        description: "Bánh trung thu Văn Hòa Lạc nhân hạt sen Huế truyền thống với kết cấu mịn màng như lụa",
        price: "180.000đ",
        priceValue: 180000,
        image: "/images/mooncake-lotus.jpg",
        slug: "banh-hat-sen",
      },
      {
        id: '2',
        name: "Bánh Trung Thu Nhân Đậu Đỏ",
        shortName: "Nhân Đậu Đỏ",
        description: "Bánh trung thu Văn Hòa Lạc nhân đậu đỏ azuki Nhật Bản ngọt dịu với hương vị đất nhẹ",
        price: "160.000đ",
        priceValue: 160000,
        image: "/images/mooncake-redbean.jpg",
        slug: "banh-dau-do",
      },
      {
        id: '3',
        name: "Bánh Trung Thu Trứng Muối",
        shortName: "Trứng Muối",
        description: "Bánh trung thu Văn Hòa Lạc với lòng đỏ trứng muối Cần Giờ vàng óng tượng trưng cho trăng tròn",
        price: "220.000đ",
        priceValue: 220000,
        image: "/images/mooncake-egg.jpg",
        slug: "banh-trung-muoi",
      },
    ]
    return NextResponse.json(fallbackProducts)
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
    const { name, slug, description, price, image_url, category, in_stock, featured } = body

    if (!name || !slug || !price) {
      return NextResponse.json({ error: 'Missing required fields: name, slug, price' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name,
          slug,
          description,
          price: parseInt(price),
          image_url,
          category: category || 'Bánh Trung Thu',
          in_stock: in_stock !== undefined ? in_stock : true,
          featured: featured || false,
        }
      ])
      .select()

    if (error) {
      console.error('Error inserting product:', error)
      return NextResponse.json({ error: 'Failed to add product' }, { status: 500 })
    }

    return NextResponse.json({ success: true, product: data[0] })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}