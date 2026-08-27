'use client'

import { useEffect, useState, useMemo } from 'react'
import { 
  Eye, 
  Smartphone, 
  MousePointerClick, 
  Globe, 
  RefreshCw, 
  Calendar, 
  Filter, 
  ArrowUp, 
  ArrowDown, 
  Search, 
  X,
  ArrowUpDown
} from 'lucide-react'

export default function VisitorLogsPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [stats, setStats] = useState<any>({
    total_visitors: 0,
    buy_now_clicks: 0,
    buy_conversion_rate: 0,
    mobile_count: 0,
    mobile_percentage: 0,
    sources: {}
  })
  const [loading, setLoading] = useState(true)

  // Filter & Sort state
  const [filterDate, setFilterDate] = useState('')
  const [filterSource, setFilterSource] = useState('ALL')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc') // 'desc' = cao đến thấp / mới nhất, 'asc' = thấp đến cao / cũ nhất
  const [sortBy, setSortBy] = useState<'time' | 'source' | 'ip'>('time')

  const fetchLogs = () => {
    setLoading(true)
    fetch('/api/analytics/logs')
      .then(res => res.json())
      .then(data => {
        setLogs(data.logs || [])
        setStats(data.stats || {})
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchLogs()
    const interval = setInterval(fetchLogs, 15000) // Auto-refresh logs every 15s
    return () => clearInterval(interval)
  }, [])

  const getTodayDateStr = () => {
    const d = new Date()
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const getYesterdayDateStr = () => {
    const d = new Date()
    d.setDate(d.getDate() - 1)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Filter & Sort Logic
  const filteredAndSortedLogs = useMemo(() => {
    return logs
      .filter(log => {
        // Filter by Date
        if (filterDate) {
          const logDateStr = log.last_activity || log.first_visit || ''
          const formattedFilter = filterDate.split('-').reverse().join('/') // DD/MM/YYYY
          if (!logDateStr.includes(filterDate) && !logDateStr.includes(formattedFilter)) {
            return false
          }
        }

        // Filter by Referral Source
        if (filterSource !== 'ALL') {
          const src = log.source || ''
          if (filterSource === 'Google' && !src.includes('Google')) return false
          if (filterSource === 'Facebook' && !src.includes('Facebook')) return false
          if (filterSource === 'Zalo' && !src.includes('Zalo')) return false
          if (filterSource === 'TikTok' && !src.includes('TikTok')) return false
          if (filterSource === 'Direct' && !src.includes('Trực tiếp') && !src.includes('Direct')) return false
        }

        // Filter by Search Keyword
        if (searchKeyword.trim()) {
          const kw = searchKeyword.toLowerCase().trim()
          const ipMatch = (log.ip || '').toLowerCase().includes(kw)
          const deviceMatch = (log.device_type || '').toLowerCase().includes(kw)
          const sourceMatch = (log.source || '').toLowerCase().includes(kw)
          const pagesMatch = (log.pages_visited || []).some((p: string) => p.toLowerCase().includes(kw))
          if (!ipMatch && !deviceMatch && !sourceMatch && !pagesMatch) return false
        }

        return true
      })
      .sort((a, b) => {
        let comparison = 0
        if (sortBy === 'time') {
          const timeA = new Date(a.last_activity || a.first_visit || 0).getTime()
          const timeB = new Date(b.last_activity || b.first_visit || 0).getTime()
          comparison = timeA - timeB
        } else if (sortBy === 'source') {
          comparison = (a.source || '').localeCompare(b.source || '')
        } else if (sortBy === 'ip') {
          comparison = (a.ip || '').localeCompare(b.ip || '')
        }

        return sortOrder === 'desc' ? -comparison : comparison
      })
  }, [logs, filterDate, filterSource, searchKeyword, sortOrder, sortBy])

  const getSourceBadgeClass = (source: string) => {
    if (source.includes('Google')) return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    if (source.includes('Facebook')) return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    if (source.includes('Zalo')) return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    if (source.includes('TikTok')) return 'bg-pink-500/20 text-pink-400 border-pink-500/30'
    return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  }

  const resetFilters = () => {
    setFilterDate('')
    setFilterSource('ALL')
    setSearchKeyword('')
    setSortOrder('desc')
    setSortBy('time')
  }

  const hasActiveFilters = filterDate !== '' || filterSource !== 'ALL' || searchKeyword !== ''

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', paddingBottom: '3rem' }}>
      {/* Header */}
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>Nhật Ký Truy Cập (Visitor Logs)</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.2rem', fontSize: '0.9rem' }}>
            Theo dõi thời gian thực IP, thiết bị, nguồn truy cập & hành vi bấm Mua Hàng của khách
          </p>
        </div>
        <button className="btn btn-primary" onClick={fetchLogs} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          <span>Làm mới</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="stat-title">Tổng Lượt Khách</div>
              <div className="stat-value">{stats.total_visitors}</div>
            </div>
            <div style={{ padding: '0.8rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: '#60a5fa' }}>
              <Eye size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="stat-title">Có Bấm "Mua Ngay"</div>
              <div className="stat-value" style={{ color: '#34d399' }}>{stats.buy_now_clicks}</div>
              <div style={{ fontSize: '0.8rem', color: '#a7f3d0', marginTop: '0.2rem' }}>Tỷ lệ: {stats.buy_conversion_rate}%</div>
            </div>
            <div style={{ padding: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', color: '#34d399' }}>
              <MousePointerClick size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="stat-title">Thiết Bị Di Động</div>
              <div className="stat-value" style={{ color: '#f472b6' }}>{stats.mobile_count}</div>
              <div style={{ fontSize: '0.8rem', color: '#fbcfe8', marginTop: '0.2rem' }}>Chiếm: {stats.mobile_percentage}%</div>
            </div>
            <div style={{ padding: '0.8rem', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '12px', color: '#f472b6' }}>
              <Smartphone size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="stat-title">Nguồn Google</div>
              <div className="stat-value" style={{ color: '#fbbf24' }}>{stats.sources?.['Google'] || 0}</div>
              <div style={{ fontSize: '0.8rem', color: '#fef08a', marginTop: '0.2rem' }}>
                FB: {stats.sources?.['Facebook'] || 0} | Zalo: {stats.sources?.['Zalo'] || 0}
              </div>
            </div>
            <div style={{ padding: '0.8rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', color: '#fbbf24' }}>
              <Globe size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* FILTER & SORT BAR PANEL */}
      <div className="glass" style={{ padding: '1.2rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '600', fontSize: '1rem' }}>
            <Filter size={18} />
            <span>Bộ Lọc & Sắp Xếp Nhật Ký</span>
          </div>

          {hasActiveFilters && (
            <button 
              type="button" 
              onClick={resetFilters}
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                padding: '0.35rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <X size={14} />
              <span>Xóa bộ lọc</span>
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
          {/* Filter by Date */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
              <label style={{ fontSize: '0.83rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={14} />
                <span>Lọc theo Ngày</span>
              </label>
              <div className="preset-chip-group" style={{ margin: 0 }}>
                <button 
                  type="button" 
                  className={`preset-chip ${filterDate === getTodayDateStr() ? 'active' : ''}`}
                  onClick={() => setFilterDate(getTodayDateStr())}
                  style={{ fontSize: '0.72rem', padding: '0.15rem 0.45rem' }}
                >
                  Hôm nay
                </button>
                <button 
                  type="button" 
                  className={`preset-chip ${filterDate === getYesterdayDateStr() ? 'active' : ''}`}
                  onClick={() => setFilterDate(getYesterdayDateStr())}
                  style={{ fontSize: '0.72rem', padding: '0.15rem 0.45rem' }}
                >
                  Hôm qua
                </button>
              </div>
            </div>
            <input 
              type="date" 
              value={filterDate} 
              onChange={e => setFilterDate(e.target.value)} 
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'white',
                outline: 'none',
                fontSize: '0.88rem'
              }}
            />
          </div>

          {/* Filter by Referral Source */}
          <div>
            <label style={{ fontSize: '0.83rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.3rem' }}>
              <Globe size={14} />
              <span>Nguồn Truy Cập (Referral)</span>
            </label>
            <select
              value={filterSource}
              onChange={e => setFilterSource(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem',
                background: '#1e293b',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'white',
                outline: 'none',
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              <option value="ALL">🌐 Tất cả nguồn truy cập</option>
              <option value="Google">🔍 Google Search</option>
              <option value="Facebook">📘 Facebook</option>
              <option value="Zalo">💬 Zalo</option>
              <option value="TikTok">🎵 TikTok</option>
              <option value="Direct">🔗 Trực tiếp (Direct / Bookmark)</option>
            </select>
          </div>

          {/* Search Keyword (IP / Device / Path) */}
          <div>
            <label style={{ fontSize: '0.83rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.3rem' }}>
              <Search size={14} />
              <span>Tìm kiếm (IP / Thiết bị / URL)</span>
            </label>
            <input 
              type="text" 
              placeholder="Ví dụ: 127.0.0.1, iPhone..."
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'white',
                outline: 'none',
                fontSize: '0.88rem'
              }}
            />
          </div>

          {/* Sort Column & Sort Direction Button (Up/Down) */}
          <div>
            <label style={{ fontSize: '0.83rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.3rem' }}>
              <ArrowUpDown size={14} />
              <span>Thứ tự & Chiều sắp xếp</span>
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                style={{
                  flex: 1,
                  padding: '0.55rem 0.75rem',
                  background: '#1e293b',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'white',
                  outline: 'none',
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                <option value="time">⏰ Theo Thời Gian</option>
                <option value="source">🌐 Theo Nguồn</option>
                <option value="ip">🖥️ Theo Địa Chỉ IP</option>
              </select>

              {/* Sort Order Icon Button (2 Mũi Tên Ngược Chiều) */}
              <button
                type="button"
                onClick={toggleSortOrder}
                title={sortOrder === 'desc' ? 'Đang lọc Cao → Thấp / Mới → Cũ. Bấm để đảo chiều' : 'Đang lọc Thấp → Cao / Cũ → Mới. Bấm để đảo chiều'}
                style={{
                  width: '38px',
                  height: '38px',
                  padding: 0,
                  background: sortOrder === 'desc' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                  border: `1px solid ${sortOrder === 'desc' ? 'rgba(245, 158, 11, 0.5)' : 'rgba(59, 130, 246, 0.5)'}`,
                  borderRadius: '8px',
                  color: sortOrder === 'desc' ? '#fbbf24' : '#60a5fa',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
              >
                <ArrowUpDown size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logs Table Card */}
      <div className="glass" style={{ padding: '1.2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 style={{ margin: 0, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
            <span>Danh Sách Lượt Truy Cập</span>
            <span style={{ fontSize: '0.825rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>
              (Hiển thị {filteredAndSortedLogs.length} / {logs.length} phiên)
            </span>
          </h3>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Đang sắp xếp:</span>
            <span style={{ color: '#fbbf24', fontWeight: '500' }}>
              {sortBy === 'time' ? 'Thời gian' : sortBy === 'source' ? 'Nguồn' : 'IP'} ({sortOrder === 'desc' ? 'Mới → Cũ / Cao → Thấp' : 'Cũ → Mới / Thấp → Cao'})
            </span>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => { setSortBy('time'); toggleSortOrder(); }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span>Hoạt động cuối</span>
                    {sortBy === 'time' && (sortOrder === 'desc' ? <ArrowDown size={14} /> : <ArrowUp size={14} />)}
                  </div>
                </th>
                <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => { setSortBy('ip'); toggleSortOrder(); }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span>Địa chỉ IP</span>
                    {sortBy === 'ip' && (sortOrder === 'desc' ? <ArrowDown size={14} /> : <ArrowUp size={14} />)}
                  </div>
                </th>
                <th>Thiết Bị</th>
                <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => { setSortBy('source'); toggleSortOrder(); }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span>Nguồn Đến</span>
                    {sortBy === 'source' && (sortOrder === 'desc' ? <ArrowDown size={14} /> : <ArrowUp size={14} />)}
                  </div>
                </th>
                <th>Các Trang Đã Xem</th>
                <th>Nút Mua Bánh</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedLogs.map((log, idx) => (
                <tr key={log.session_id || idx}>
                  <td style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                    <div style={{ fontWeight: '500' }}>{log.last_activity}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bắt đầu: {log.first_visit}</div>
                  </td>

                  <td>
                    <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#60a5fa' }}>{log.ip}</span>
                  </td>

                  <td>
                    <div style={{ fontSize: '0.85rem' }}>{log.device_type}</div>
                  </td>

                  <td>
                    <span className={`px-2.5 py-1 rounded-full text-xs border font-medium inline-block ${getSourceBadgeClass(log.source)}`}>
                      {log.source}
                    </span>
                  </td>

                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', maxWidth: '300px' }}>
                      {(log.pages_visited || ['/']).map((page: string, pIdx: number) => (
                        <span key={pIdx} style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                          {page}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td>
                    {log.clicked_buy_now ? (
                      <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        🛒 ĐÃ BẤM MUA
                      </span>
                    ) : (
                      <span style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>
                        Chỉ xem
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {filteredAndSortedLogs.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    Không tìm thấy nhật ký truy cập nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
