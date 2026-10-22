import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFCF7] border border-[#E8E1D5] text-xs font-medium text-[#30251F]/70 shadow-2xs whitespace-nowrap overflow-x-auto">
        <li>
          <Link href="/" className="hover:text-[#7A2935] transition-colors">
            Trang Chủ
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 text-[#B58A4A]" />
            {index === items.length - 1 ? (
              <span className="font-semibold text-[#30251F]" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-[#7A2935] transition-colors">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Trang Chủ",
                "item": "https://vanhoalac.vn"
              },
              ...items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": item.label,
                "item": `https://vanhoalac.vn${item.href}`
              }))
            ]
          })
        }}
      />
    </nav>
  )
}
