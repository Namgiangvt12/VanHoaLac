'use client'

import '../admin.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  ShoppingCart, 
  ListOrdered, 
  FileBarChart,
  PackagePlus,
  PenTool,
  Eye,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X
} from 'lucide-react'

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // State for sidebar toggle
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Auto close mobile sidebar when navigating to a new page
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const menu = [
    { name: 'Bảng Điều Khiển', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Tạo Đơn (POS)', path: '/admin/pos', icon: <ShoppingCart size={20} /> },
    { name: 'Khách Hàng', path: '/admin/orders', icon: <ListOrdered size={20} /> },
    { name: 'Báo Cáo Ngày', path: '/admin/reports', icon: <FileBarChart size={20} /> },
    { name: 'Nhật Ký Log', path: '/admin/logs', icon: <Eye size={20} /> },
    { name: 'Sản Phẩm', path: '/admin/products', icon: <PackagePlus size={20} /> },
    { name: 'Bài Viết', path: '/admin/posts', icon: <PenTool size={20} /> },
  ]

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsMobileOpen(prev => !prev)
    } else {
      setIsCollapsed(prev => !prev)
    }
  }

  return (
    <div className="admin-theme">
      <div className="app-layout">
        {/* Mobile & Desktop Overlay */}
        <div 
          className={`sidebar-overlay ${isMobileOpen ? 'active' : ''}`}
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Sidebar */}
        <aside className={`sidebar glass ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-header">
            <Link href="/admin" className="sidebar-brand">
              <div className="logo-box">🌕</div>
              {!isCollapsed && <h2>Văn Hòa Lạc</h2>}
            </Link>
            <button 
              className="sidebar-toggle-btn sm-only"
              onClick={() => setIsMobileOpen(false)}
              style={{ padding: '0.4rem', border: 'none', background: 'transparent' }}
            >
              <X size={20} />
            </button>
          </div>

          <nav className="sidebar-nav">
            {menu.map((item) => (
              <Link 
                key={item.path} 
                href={item.path} 
                className={`nav-link ${pathname === item.path ? 'active' : ''}`}
                title={item.name}
              >
                {item.icon}
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className={`main-content ${isCollapsed ? 'expanded' : ''}`}>
          {/* Top Navbar */}
          <div className="top-bar">
            <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
              {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
              <span className="hidden sm:inline">
                {isCollapsed ? 'Hiện Menu' : 'Ẩn Menu'}
              </span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Quản trị hệ thống</span>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} title="Online" />
            </div>
          </div>

          {children}
        </main>
      </div>
    </div>
  )
}
