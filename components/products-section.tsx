"use client"

import Image from "next/image"
import { Plus, ShoppingBag } from "lucide-react"
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
        const response = await fetch('/api/products')
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
      <section id="products" className="py-24 md:py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
          />
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

        {/* Products Grid */}
        <motion.div 
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14" 
          role="list" 
          aria-label="Danh sách sản phẩm bánh trung thu Văn Hòa Lạc"
        >
          {products.map((product) => (
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
                    sizes="(max-width: 768px) 100vw, 33vw"
                    itemProp="image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-primary shadow-sm">
                    Gia Truyền
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex justify-between items-end">
                    <button 
                      className="bg-white text-primary w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:scale-95"
                      aria-label="Thêm vào giỏ hàng"
                    >
                      <Plus size={20} />
                    </button>
                    <div className="bg-primary px-4 py-2 rounded-xl text-white font-bold text-sm shadow-xl">
                      {product.price}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2 text-center md:text-left">
                  <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors" itemProp="name">
                    {product.shortName}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed" itemProp="description">
                    {product.description}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
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

