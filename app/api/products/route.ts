import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';

export async function GET() {
  const products = [
    {
      id: '1',
      name: "Bánh Da Dợp Thập Cẩm 2 Trứng",
      shortName: "Da dợp 2 trứng",
      description: "Bánh trung thu da dợp đặc sắc 2 trứng hòa quyện hương vị",
      price: "125.000đ",
      priceValue: 125000,
      image: "/images/banh-da-dop-2-trung.png",
      slug: "da-dop-2-trung",
      category: "Da Dợp Thập Cẩm",
    },
    {
      id: '2',
      name: "Bánh Da Dợp Thập Cẩm 3 Trứng",
      shortName: "Da dợp 3 trứng",
      description: "Bánh trung thu da dợp cao cấp 3 trứng thơm ngon đặc biệt",
      price: "160.000đ",
      priceValue: 160000,
      image: "/images/banh-da-dop-3-trung.png",
      slug: "da-dop-3-trung",
      category: "Da Dợp Thập Cẩm",
    },
    {
      id: '3',
      name: "Bánh Da Dợp 6-10-12-14 Trứng",
      shortName: "Da dợp 6-10-12-14 trứng",
      description: "Bánh trung thu da dợp ngoại cỡ cao cấp",
      price: "450.000đ",
      priceValue: 450000,
      image: "/images/banh-da-dop-big.png",
      slug: "da-dop-big",
      category: "Da Dợp Thập Cẩm",
    },
    {
      id: '4',
      name: "Trung Thu Nướng Đậu Xanh",
      shortName: "Đậu xanh",
      description: "Bánh nướng truyền thống nhân đậu xanh mịn màng",
      price: "125.000đ",
      priceValue: 125000,
      image: "/images/mooncake-lotus.jpg",
      slug: "trung-thu-dau-xanh",
      category: "Trung Thu Nướng",
    },
    {
      id: '5',
      name: "Trung Thu Nướng Thập Cẩm",
      shortName: "Thập cẩm",
      description: "Bánh nướng truyền thống nhân thập cẩm",
      price: "125.000đ",
      priceValue: 125000,
      image: "/images/mooncake-redbean.jpg",
      slug: "trung-thu-thap-cam",
      category: "Trung Thu Nướng",
    },
    {
      id: '6',
      name: "Trung Thu Nướng Thập Cẩm Gà Quay",
      shortName: "Thập cẩm gà quay",
      description: "Bánh nướng thập cẩm gà quay thơm lừng",
      price: "135.000đ",
      priceValue: 135000,
      image: "/images/mooncake-redbean.jpg",
      slug: "trung-thu-ga-quay",
      category: "Trung Thu Nướng",
    },
    {
      id: '7',
      name: "Trung Thu Nướng Dừa Mè",
      shortName: "Dừa mè",
      description: "Bánh nướng nhân dừa mè ngọt thanh",
      price: "110.000đ",
      priceValue: 110000,
      image: "/images/mooncake-lotus.jpg",
      slug: "trung-thu-dua-me",
      category: "Trung Thu Nướng",
    },
  ]
  return NextResponse.json(products)
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