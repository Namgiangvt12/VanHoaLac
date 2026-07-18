import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import Image from "next/image"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // Demo metadata - in reality you would fetch from DB based on slug
  const titleMap: Record<string, string> = {
    'banh-trung-thu-thap-cam': 'Bánh Trung Thu Thập Cẩm Văn Hòa Lạc',
    'banh-trung-thu-dau-xanh': 'Bánh Trung Thu Đậu Xanh Nguyên Chất Văn Hòa Lạc',
    'banh-trung-thu-ga-quay': 'Bánh Trung Thu Gà Quay Vũng Tàu Cao Cấp',
  }
  
  const title = titleMap[params.slug] || 'Bánh Trung Thu Văn Hòa Lạc'
  return {
    title: `${title} | Chính Hãng Vũng Tàu`,
    description: `Mua ${title.toLowerCase()} truyền thống thơm ngon, nguyên liệu chọn lọc. Giao hàng toàn quốc. Đặt ngay từ cơ sở Văn Hòa Lạc.`,
  }
}

export default function ProductCategoryPage({ params }: { params: { slug: string } }) {
  const titleMap: Record<string, string> = {
    'banh-trung-thu-thap-cam': 'Bánh Trung Thu Thập Cẩm',
    'banh-trung-thu-dau-xanh': 'Bánh Trung Thu Đậu Xanh',
    'banh-trung-thu-ga-quay': 'Bánh Trung Thu Gà Quay',
  }
  const name = titleMap[params.slug] || 'Bộ Sưu Tập Bánh Trung Thu'

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 px-6 min-h-screen bg-background">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={[
            { label: "Sản Phẩm", href: "/#products" },
            { label: name, href: `/san-pham/${params.slug}` }
          ]} />
          
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-8 text-primary capitalize">
            {name} Văn Hòa Lạc
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-3xl mb-12">
            <p>
              Tuyển tập <strong>{name.toLowerCase()}</strong> cao cấp từ thương hiệu Văn Hòa Lạc Vũng Tàu. 
              Sử dụng nguyên liệu hảo hạng được chọn lọc khắt khe, bao bì sang trọng, rất thích hợp làm quà tặng doanh nghiệp hoặc dùng cho gia đình dịp Tết Đoàn Viên.
            </p>
          </div>

          {/* Product Grid Placeholder */}
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="border border-border rounded-xl p-4 transition-transform hover:-translate-y-1">
                <div className="relative aspect-square w-full bg-muted rounded-lg overflow-hidden mb-4">
                   <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">Hình Ảnh Sản Phẩm {i}</div>
                </div>
                <h3 className="font-bold text-lg">{name} Mẫu {i}</h3>
                <p className="text-primary font-medium mt-2">Liên Hệ Mua</p>
              </div>
            ))}
          </div>
          
          {/* SEO Content Box */}
          <article className="mt-24 p-8 bg-muted rounded-2xl">
            <h2 className="font-serif text-2xl mb-4">Vì sao nên chọn {name.toLowerCase()} của Văn Hòa Lạc?</h2>
            <p className="text-muted-foreground">Phần nội dung này dài khoảng 1000 - 1500 từ chuẩn SEO sẽ được load từ cơ sở dữ liệu dựa vào chuyên mục. Sẽ liệt kê nguyên liệu, quy trình làm bánh, giá trị nghệ thuật, và những câu hỏi thường gặp (FAQ) có chứa Schema FAQPage.</p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
