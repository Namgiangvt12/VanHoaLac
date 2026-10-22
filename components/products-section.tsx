"use client"

import Image from "next/image"
import { ArrowRight, ShoppingBag, Sparkles, Star } from "lucide-react"
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
      staggerChildren: 0.12
    }
  }
}

const itemVars = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] as const
    } 
  }
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
      <section id="products" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-label="Đang tải sản phẩm">
        <div className="space-y-12">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <div className="h-4 bg-[#EFE9DF] animate-pulse rounded-full w-48 mx-auto" />
            <div className="h-10 bg-[#EFE9DF] animate-pulse rounded-2xl w-3/4 mx-auto" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/5] rounded-[24px] bg-[#FFFCF7] border border-[#E8E1D5] animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="products" className="py-20 px-6 max-w-7xl mx-auto text-center">
        <p className="text-destructive font-bold text-lg">Lỗi: {error}</p>
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
        whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
        className="group relative flex flex-col justify-between rounded-[24px] bg-[#FFFCF7] border border-[#E8E1D5] hover:border-[#B58A4A]/60 overflow-hidden shadow-sm hover:shadow-xl transition-colors duration-300"
        itemScope
        itemType="https://schema.org/Product"
        role="listitem"
      >
        <Link href={`/san-pham/${product.slug}`} className="block p-3 sm:p-4">
          {/* Product Image Container with subtle max 1.04 zoom */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-[#EFE9DF]">
            <Image
              src={product.image}
              alt={"Bánh Trung Thu Văn Hòa Lạc (Van Hoa Lac) - " + product.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              itemProp="image"
            />
            
            {/* Pill Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md shadow-sm bg-[#FFFCF7]/95 text-[#7A2935] border border-[#E8E1D5]">
              {isSpecial ? (
                <>
                  <Star size={11} className="text-[#B58A4A] fill-[#B58A4A]" />
                  <span>Da Dợp Độc Bản</span>
                </>
              ) : (
                <span>{product.category || "Truyền Thống"}</span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="pt-4 pb-2 px-1 space-y-2">
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#30251F] group-hover:text-[#7A2935] transition-colors line-clamp-1" itemProp="name">
              {product.name}
            </h4>

            <div className="flex items-baseline justify-between gap-2">
              <span className="font-serif text-base sm:text-lg font-bold text-[#7A2935]" itemProp="price">
                {product.price}
              </span>
              <span className="text-[11px] font-bold text-[#B58A4A] uppercase tracking-wider group-hover:underline inline-flex items-center gap-0.5">
                Chi tiết <ArrowRight size={11} />
              </span>
            </div>

            <p className="text-[#766960] text-xs line-clamp-2 leading-relaxed" itemProp="description">
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
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="products-heading"
    >
      {/* Section Header */}
      <motion.header 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16 space-y-3 max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE9DF] border border-[#E8E1D5] text-[#B58A4A] text-xs uppercase tracking-[0.25em] font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#B58A4A]" />
          <span>Bộ Sưu Tập Quà Tặng 2026</span>
        </div>

        <h2 
          id="products-heading" 
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#30251F] tracking-tight leading-tight"
        >
          Bánh Trung Thu Thủ Công Cao Cấp
        </h2>
      </motion.header>

      {/* Category 1: Da Dợp Thập Cẩm */}
      <div className="mb-14">
        <div className="flex items-center gap-4 mb-8">
          <div className="px-5 py-2 rounded-full bg-[#7A2935] text-[#FFFCF7] text-xs font-bold uppercase tracking-widest">
            {section1Title}
          </div>
          <div className="flex-1 h-px bg-[#E8E1D5]" />
        </div>

        <motion.div 
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-6%" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6" 
          role="list" 
          aria-label={section1Title}
        >
          {section1Products.map(renderProduct)}
        </motion.div>
      </div>

      {/* Category 2: Trung Thu Nướng */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="px-5 py-2 rounded-full bg-[#30251F] text-[#FFFCF7] text-xs font-bold uppercase tracking-widest">
            {section2Title}
          </div>
          <div className="flex-1 h-px bg-[#E8E1D5]" />
        </div>

        <motion.div 
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-6%" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6" 
          role="list" 
          aria-label={section2Title}
        >
          {section2Products.map(renderProduct)}
        </motion.div>
      </div>

      {/* Baseline Framed CTA Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="rounded-[28px] md:rounded-[36px] bg-[#30251F] text-[#FFFCF7] p-8 sm:p-12 md:p-16 text-center border border-[#43362E] shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#DFC28E] text-[11px] uppercase tracking-[0.25em] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#DFC28E]" />
            <span>Đại Sứ Lòng Tri Ân</span>
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
            Quà Tặng Sang Trọng & Tinh Tế
          </h3>

          <p className="text-white/80 leading-relaxed text-sm sm:text-base">
            Mỗi hộp bánh trung thu <strong>Văn Hòa Lạc</strong> là một đại sứ của lòng tri ân. 
            Chúng tôi cam kết mang đến hương vị chuẩn mực nhất cùng dịch vụ <strong>Giao hàng toàn quốc</strong> an toàn, nhanh chóng.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="#contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#7A2935] hover:bg-[#581C25] text-[#FFFCF7] px-8 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-bold transition-all shadow-md active:scale-95"
            >
              <ShoppingBag size={16} />
              <span>Đặt Hàng Ngay</span>
            </Link>
            <span className="text-[#DFC28E] text-xs font-bold tracking-[0.2em] uppercase">
              Hotline: 097.168.2213
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

