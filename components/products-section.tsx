"use client"

import Image from "next/image"
import { Plus, ShoppingBag, Sparkles, Star } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface Product {
  id: string
  name: string
  shortName: string
  description: string
  price: string
  priceValue: number
  image: string
  slug: string
  category?: string
}

const containerVars = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVars = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products?t=' + new Date().getTime(), {
          cache: 'no-store'
        })
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section id="products" className="py-24 md:py-32 px-6 bg-background" aria-label="Đang tải sản phẩm">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <div className="h-4 bg-muted animate-pulse rounded-full w-48 mx-auto" />
            <div className="h-10 bg-muted animate-pulse rounded-xl w-3/4 mx-auto" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[4/5] rounded-3xl bg-muted/60 animate-pulse border border-border/40" />
                <div className="space-y-2 text-center">
                  <div className="h-5 bg-muted animate-pulse rounded-lg w-3/4 mx-auto" />
                  <div className="h-4 bg-muted/80 animate-pulse rounded-md w-1/2 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="products" className="py-24 md:py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-destructive font-bold text-lg">Lỗi: {error}</p>
        </div>
      </section>
    )
  }

  const section1Title = "Da Dợp Thập Cẩm"
  const section2Title = "Trung Thu Nướng"

  const section1Products = products.filter(p => {
    const lower = p.name.toLowerCase()
    const cat = p.category?.toLowerCase() || ""
    return lower.includes("da dợp") || cat.includes("da dợp") || lower.includes("pía")
  })
  const section2Products = products.filter(p => !section1Products.includes(p))

  const renderProduct = (product: Product) => {
    const isSpecial = product.name.toLowerCase().includes('thập cẩm') && (product.category === section1Title || product.name.toLowerCase().includes('da dợp'));
    
    return (
      <motion.article 
        key={product.id} 
        variants={itemVars}
        className="group relative"
        itemScope
        itemType="https://schema.org/Product"
        role="listitem"
      >
        <Link href={`#${product.slug}`} className="block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-card border border-border/50 shadow-sm transition-all group-hover:shadow-2xl group-hover:border-gold/20">
            <Image
              src={product.image}
              alt={"Bánh Trung Thu Văn Hòa Lạc (Van Hoa Lac) - " + product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 25vw"
              itemProp="image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Badge */}
            <div className={`absolute top-4 left-4 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm flex items-center gap-1 ${isSpecial ? 'bg-gold/90 text-white' : 'bg-white/90 text-primary'}`}>
              {isSpecial ? (
                <>
                  <Star size={12} className="text-white fill-white" />
                  <span>Da Dợp Thập Cẩm</span>
                </>
              ) : (
                'Gia Truyền'
              )}
            </div>

            {/* Actions Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex justify-between items-end">
              <button 
                className="bg-white text-primary w-10 h-10 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:scale-95"
                aria-label="Thêm vào giỏ hàng"
              >
                <Plus size={18} />
              </button>
              <div className="bg-primary px-3 py-1.5 rounded-lg text-white font-bold text-sm shadow-xl">
                {product.price}
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-1 text-center">
            <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[56px]" itemProp="name">
              {product.shortName}
            </h3>
            <p className="text-muted-foreground text-xs md:text-sm line-clamp-2 leading-relaxed" itemProp="description">
              {product.description}
            </p>
          </div>
        </Link>
      </motion.article>
    )
  }

  return (
    <section 
      id="products" 
      className="py-24 md:py-32 px-6 bg-gradient-to-b from-background to-card/30"
      aria-labelledby="products-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-20 space-y-4">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-xs tracking-[0.4em] uppercase font-bold"
          >
            Bộ Sưu Tập Quà Tặng 2026
          </motion.p>
          <motion.h2 
            id="products-heading" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary max-w-3xl mx-auto leading-tight"
          >
            Bánh Trung Thu Thủ Công Cao Cấp
          </motion.h2>
        </header>

        {/* Products Grid Sections */}
      </div>

      {/* Section 1 Header */}
      <div className="w-full bg-primary/95 py-4 mb-10 mt-12 shadow-md border-y border-gold/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 text-center flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gold/50 hidden sm:block" />
          <h3 className="text-white font-serif text-lg md:text-xl font-bold tracking-widest uppercase">
            {section1Title}
          </h3>
          <span className="h-px w-8 bg-gold/50 hidden sm:block" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10" 
          role="list" 
          aria-label={section1Title}
        >
          {section1Products.map(renderProduct)}
        </motion.div>
      </div>

      {/* Section 2 Header */}
      <div className="w-full bg-primary/95 py-4 mb-10 mt-20 shadow-md border-y border-gold/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 text-center flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gold/50 hidden sm:block" />
          <h3 className="text-white font-serif text-lg md:text-xl font-bold tracking-widest uppercase">
            {section2Title}
          </h3>
          <span className="h-px w-8 bg-gold/50 hidden sm:block" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10" 
          role="list" 
          aria-label={section2Title}
        >
          {section2Products.map(renderProduct)}
        </motion.div>

        {/* CTA Footer Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 p-10 md:p-16 rounded-[40px] bg-primary text-primary-foreground text-center relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(139,0,0,0.3)]"
        >
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h3 className="text-3xl md:text-4xl font-serif font-bold">Quà Tặng Sang Trọng & Tinh Tế</h3>
            <p className="text-primary-foreground/80 leading-relaxed md:text-lg">
              Mỗi hộp bánh trung thu <strong>Văn Hòa Lạc</strong> là một đại sứ của lòng tri ân. 
              Chúng tôi cam kết mang đến hương vị chuẩn mực nhất cùng dịch vụ <strong>Giao hàng toàn quốc</strong> an toàn, nhanh chóng.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="#contact" 
                className="inline-flex items-center gap-3 bg-white text-primary px-10 py-5 rounded-full text-xs tracking-widest uppercase font-black hover:bg-gold hover:text-white transition-all shadow-2xl active:scale-95 group"
              >
                <ShoppingBag size={18} />
                Đặt Hàng Ngay
              </Link>
              <span className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase">Hotline: 097.168.2213</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

