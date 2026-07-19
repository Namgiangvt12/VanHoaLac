'use client'

import { useEffect, useState } from 'react'

type FilterType = 'today' | 'week' | 'month' | '3months' | 'year' | 'custom'

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>('month')
  const [customStart, setCustomStart] = useState('')
  const [customEnd, setCustomEnd] = useState('')

  const fetchSummary = (start: string, end: string) => {
    setLoading(true)
    fetch(`/api/reports/summary?from_date=${start}&to_date=${end}`)
      .then(res => res.json())
      .then(data => {
        setSummary(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching summary:", err)
        setLoading(false)
      })
  }

  useEffect(() => {
    const today = new Date()
    let start = ''
    let end = today.toISOString().split('T')[0]

    if (filter === 'today') {
      start = end
    } else if (filter === 'week') {
      const firstDay = new Date(today.setDate(today.getDate() - today.getDay() + 1))
      start = firstDay.toISOString().split('T')[0]
      end = new Date().toISOString().split('T')[0] // Until today
    } else if (filter === 'month') {
      start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0]
      end = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0]
    } else if (filter === '3months') {
      start = new Date(today.getFullYear(), today.getMonth() - 2, 1).toISOString().split('T')[0]
      end = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0]
    } else if (filter === 'year') {
      start = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0]
      end = new Date(today.getFullYear(), 11, 31).toISOString().split('T')[0]
    } else if (filter === 'custom') {
      if (customStart && customEnd) {
        start = customStart
        end = customEnd
      } else {
        return // Wait for both dates
      }
    }

    if (start && end) {
      fetchSummary(start, end)
    }
  }, [filter, customStart, customEnd])

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0)
  }

  return (
    <div className="container" style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="header" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Bảng Điều Khiển</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as FilterType)}
            style={{
              padding: '0.6rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'white',
              outline: 'none'
            }}
          >
            <option value="today" style={{ color: 'black' }}>Hôm nay</option>
            <option value="week" style={{ color: 'black' }}>Tuần này</option>
            <option value="month" style={{ color: 'black' }}>Tháng này</option>
            <option value="3months" style={{ color: 'black' }}>3 Tháng gần nhất</option>
            <option value="year" style={{ color: 'black' }}>Năm nay</option>
            <option value="custom" style={{ color: 'black' }}>Tùy chọn...</option>
          </select>

          {filter === 'custom' && (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input 
                type="date" 
                value={customStart} 
                onChange={(e) => setCustomStart(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-glass)', color: 'white' }}
              />
              <span>-</span>
              <input 
                type="date" 
                value={customEnd} 
                onChange={(e) => setCustomEnd(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-glass)', color: 'white' }}
              />
            </div>
          )}
        </div>
      </div>

      {loading ? <p>Đang tải dữ liệu...</p> : summary ? (
        <div className="stats-grid" style={{ marginTop: '2rem' }}>
          <div className="stat-card glass" style={{ borderColor: '#3b82f6' }}>
            <span className="stat-title">Số lượng Đơn</span>
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
