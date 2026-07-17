'use client'

import { useState } from 'react'

export default function AdminReportsPage() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [data, setData] = useState<any>({ items: [], total_cakes: 0, total_boxes: 0 })
  const [loading, setLoading] = useState(false)

  const fetchDaily = () => {
    setLoading(true)
    fetch(`/api/reports/daily_products/${date}`)
      .then(res => res.json())
      .then(d => {
        setData(d)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching reports", err)
        setLoading(false)
      })
  }

  const handlePrintDaily = () => {
    window.open(`/api/pdf/daily/${date}`, '_blank')
  }

  const handleMergePdf = () => {
    window.open(`/api/pdf/merge/${date}`, '_blank')
  }

  return (
    <div className="container" style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="header">
        <h1>Báo Cáo Ngày Nhận & Gộp PDF</h1>
      </div>

      <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Chọn Ngày Nhận</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            style={{
              padding: '0.6rem 0.8rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'white',
              outline: 'none',
              minWidth: '200px'
            }}
          />
        </div>
        <button className="btn btn-primary" onClick={fetchDaily}>Xem Số Liệu</button>
        <button className="btn btn-outline" onClick={handlePrintDaily}>In Phiếu Tổng Ngày</button>
        <button className="btn btn-outline" onClick={handleMergePdf}>Gộp in Hàng Loạt Hoá Đơn</button>
      </div>

      <div className="table-container glass">
        <table>
          <thead>
            <tr>
              <th>Tên Bánh</th>
              <th>Số lượng cái</th>
              <th>Số hộp (dự kiến)</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} style={{ textAlign: 'center', padding: '1rem' }}>Đang lấy số liệu...</td></tr>
            ) : data.items.length === 0 ? (
              <tr><td colSpan={3} style={{ textAlign: 'center', padding: '1rem' }}>Không có đơn lấy trong ngày {date}</td></tr>
            ) : (
              data.items.map((i: any) => (
                <tr key={i.name}>
                  <td><strong>{i.name}</strong></td>
                  <td>{i.quantity}</td>
                  <td>{i.boxes}</td>
                </tr>
              ))
            )}

            {data.items.length > 0 && (
              <tr style={{ background: 'rgba(245, 158, 11, 0.1)', fontWeight: 'bold' }}>
                <td>TỔNG CỘNG:</td>
                <td>{data.total_cakes} cái</td>
                <td style={{ color: '#f59e0b' }}>{data.total_boxes} hộp</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
