'use client'

import '../admin.css' // Import the unified admin CSS
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  ShoppingCart, 
  ListOrdered, 
  FileBarChart,
  PackagePlus,
  PenTool
} from 'lucide-react'

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const menu = [
    { name: 'Bảng Điều Khiển', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Tạo Đơn (POS)', path: '/admin/pos', icon: <ShoppingCart size={20} /> },
    { name: 'Khách Hàng', path: '/admin/orders', icon: <ListOrdered size={20} /> },
    { name: 'Báo Cáo Ngày', path: '/admin/reports', icon: <FileBarChart size={20} /> },
    { name: 'Sản Phẩm', path: '/admin/products', icon: <PackagePlus size={20} /> },
    { name: 'Bài Viết', path: '/admin/posts', icon: <PenTool size={20} /> },
  ]

  return (
    <div className="admin-theme">
      <div className="app-layout">
        {/* Sidebar */}
        <aside className="sidebar glass">
          <div className="sidebar-header">
            <div className="logo-box">🌕</div>
            <h2>TrungThu</h2>
          </div>
          <nav className="sidebar-nav">
            {menu.map((item) => (
              <Link 
                key={item.path} 
                href={item.path} 
                className={`nav-link ${pathname === item.path ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}
