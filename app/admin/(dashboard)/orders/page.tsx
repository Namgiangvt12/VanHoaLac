'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [keyword, setKeyword] = useState('')

  const fetchOrders = () => {
    setLoading(true)
    let url = 'http://127.0.0.1:8000/api/orders'
    if (keyword) {
      url += `?keyword=${encodeURIComponent(keyword)}`
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setOrders(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error fetching orders:", err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  const handlePrintPdf = (e: React.MouseEvent, orderId: number) => {
    e.preventDefault()
    window.open(`http://127.0.0.1:8000/api/pdf/order/${orderId}`, '_blank')
  }
  
  const handleDelete = (id: number) => {
      if(window.confirm(`Bạn có chắc chắn muốn xóa đơn #${id}?`)) {
          fetch(`http://127.0.0.1:8000/api/orders/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(() => fetchOrders())
      }
  }

  return (
    <div className="container" style={{ animation: 'slideUp 0.5s ease' }}>
      <div className="header" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Quản lý Đơn Hàng</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            placeholder="Mã đơn, SĐT, Tên..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchOrders()}
            style={{
              padding: '0.6rem 0.8rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'white',
              outline: 'none',
              minWidth: '220px'
            }}
          />
          <button className="btn btn-primary" onClick={fetchOrders} style={{ minWidth: '100px', justifyContent: 'center' }}>
            Tìm kiếm
          </button>
        </div>
      </div>

      <div className="table-container glass">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ngày Đặt</th>
              <th>Khách Hàng</th>
              <th>Tiền Hàng</th>
              <th>Còn Thiếu</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>Đang tải dữ liệu...</td></tr>
            ) : orders.map(order => (
              <tr key={order.id}>
                <td>
                  <span 
                    style={{ cursor: 'pointer', color: 'var(--primary)', textDecoration: 'underline', fontWeight: 'bold' }} 
                    onClick={() => router.push(`/admin/pos?editId=${order.id}`)}
                    title="Click để Chi tiết / Chỉnh sửa đơn hàng"
                  >
                    #{order.id}
                  </span>
                </td>
                <td>{new Date(order.order_date).toLocaleDateString('vi-VN')}</td>
                <td>
                  <strong>{order.customer_name}</strong>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {order.customer_phone || 'Không có SĐT'}
                  </div>
                </td>
                <td className="currency">{formatMoney(order.total)}</td>
                <td className={order.due > 0 ? "due-positive" : "due-zero"}>
                  {formatMoney(order.due)}
                </td>
                <td>
                  <div className="actions">
                    <button className="btn btn-primary" onClick={(e) => handlePrintPdf(e, order.id)}>
                      In PDF
                    </button>
                    <button className="btn btn-outline" style={{ padding: '0.5rem', fontSize: '0.8rem' }} onClick={() => alert('Đang phát triển Popup Payment')}>
                      Thanh Toán
                    </button>
                    <button className="btn btn-outline" style={{ padding: '0.5rem', fontSize: '0.8rem', color: '#ef4444', borderColor: '#ef4444' }} onClick={() => handleDelete(order.id)}>
                      Xoá
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && orders.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>Không tìm thấy đơn hàng</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
