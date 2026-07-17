'use client'

import { useEffect, useState } from 'react'

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Default to this month
    const date = new Date()
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0]
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0]

    fetch(`/api/reports/summary?from_date=${firstDay}&to_date=${lastDay}`)
      .then(res => res.json())
      .then(data => {
        setSummary(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching summary:", err)
        setLoading(false)
      })
  }, [])

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0)
  }

  return (
    <div className="container" style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="header">
        <h1>Bảng Điều Khiển</h1>
      </div>

      {loading ? <p>Đang tải dữ liệu...</p> : summary ? (
        <div className="stats-grid">
          <div className="stat-card glass" style={{ borderColor: '#3b82f6' }}>
            <span className="stat-title">Số lượng Đơn Toàn Kì</span>
            <span className="stat-value">{summary.total_orders}</span>
          </div>
          <div className="stat-card glass" style={{ borderColor: '#10b981' }}>
            <span className="stat-title">Doanh Thu (Sau CK)</span>
            <span className="stat-value currency">{formatMoney(summary.sum_total)}</span>
          </div>
          <div className="stat-card glass" style={{ borderColor: '#f59e0b' }}>
            <span className="stat-title">Lợi Nhuận Ước Tính</span>
            <span className="stat-value" style={{ color: '#f59e0b' }}>{formatMoney(summary.final_profit)}</span>
          </div>
          <div className="stat-card glass" style={{ borderColor: '#ef4444' }}>
            <span className="stat-title">Công Nợ Khách</span>
            <span className="stat-value due-positive">{formatMoney(summary.sum_due)}</span>
          </div>
        </div>
      ) : (
        <p>Lỗi hiển thị dữ liệu hoặc chưa có đơn hàng.</p>
      )}
    </div>
  )
}
