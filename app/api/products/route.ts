import { NextResponse } from 'next/server'
import { PRODUCTS } from '@/lib/products'

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(PRODUCTS)
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