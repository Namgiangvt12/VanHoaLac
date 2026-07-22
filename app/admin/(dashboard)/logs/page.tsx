'use client'

import { useEffect, useState } from 'react'
import { Eye, Smartphone, MousePointerClick, Globe, RefreshCw } from 'lucide-react'

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

  const getSourceBadgeClass = (source: string) => {
    if (source.includes('Google')) return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    if (source.includes('Facebook')) return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    if (source.includes('Zalo')) return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    if (source.includes('TikTok')) return 'bg-pink-500/20 text-pink-400 border-pink-500/30'
    return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', paddingBottom: '3rem' }}>
      {/* Header */}
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Nhật Ký Truy Cập (Visitor Logs)</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Theo dõi thời gian thực IP, thiết bị, nguồn truy cập & hành vi bấm Mua Hàng của khách
          </p>
        </div>
        <button className="btn btn-secondary" onClick={fetchLogs} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          <span>Làm mới</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="title">Tổng Lượt Khách</div>
              <div className="value">{stats.total_visitors}</div>
            </div>
            <div style={{ padding: '0.8rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: '#60a5fa' }}>
              <Eye size={28} />
            </div>
          </div>
        </div>

        <div className="stat-card glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="title">Có Bấm "Mua Ngay"</div>
              <div className="value" style={{ color: '#34d399' }}>{stats.buy_now_clicks}</div>
              <div style={{ fontSize: '0.85rem', color: '#a7f3d0', marginTop: '0.2rem' }}>Tỷ lệ: {stats.buy_conversion_rate}%</div>
            </div>
            <div style={{ padding: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', color: '#34d399' }}>
              <MousePointerClick size={28} />
            </div>
          </div>
        </div>

        <div className="stat-card glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="title">Thiết Bị Di Động</div>
              <div className="value" style={{ color: '#f472b6' }}>{stats.mobile_count}</div>
              <div style={{ fontSize: '0.85rem', color: '#fbcfe8', marginTop: '0.2rem' }}>Chiếm: {stats.mobile_percentage}%</div>
            </div>
            <div style={{ padding: '0.8rem', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '12px', color: '#f472b6' }}>
              <Smartphone size={28} />
            </div>
          </div>
        </div>

        <div className="stat-card glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="title">Nguồn Tìm Kiếm Google</div>
              <div className="value" style={{ color: '#fbbf24' }}>{stats.sources?.['Google'] || 0}</div>
              <div style={{ fontSize: '0.85rem', color: '#fef08a', marginTop: '0.2rem' }}>
                FB: {stats.sources?.['Facebook'] || 0} | Zalo: {stats.sources?.['Zalo'] || 0}
              </div>
            </div>
            <div style={{ padding: '0.8rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', color: '#fbbf24' }}>
              <Globe size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="glass" style={{ padding: '1.5rem' }}>
        <h3 style={{ marginBottom: '1.2rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Danh Sách Lượt Truy Cập Mới Nhất</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>
            ({logs.length} phiên truy cập gần nhất)
          </span>
        </h3>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Hoạt động cuối</th>
                <th>Địa chỉ IP</th>
                <th>Thiết Bị</th>
                <th>Nguồn Đến</th>
                <th>Các Trang Đã Xem</th>
                <th>Nút Mua Bánh</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={log.session_id || idx}>
                  <td style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                    <div style={{ fontWeight: '500' }}>{log.last_activity}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Bắt đầu: {log.first_visit}</div>
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
                      <span style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>
                        Chỉ xem
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {logs.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                    Chưa có nhật ký truy cập nào được ghi lại.
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
