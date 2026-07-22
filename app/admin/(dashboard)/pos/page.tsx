'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function PosForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const editId = searchParams.get('editId')
  const isEditMode = !!editId

  const [products, setProducts] = useState<any[]>([])
  const [cart, setCart] = useState<any[]>([])
  
  // Form state
  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    customer_address: '',
    receive_date: new Date().toISOString().split('T')[0],
    shipping_fee: 0,
    deposit: 0,
    discount: 0,
    pay_ship_now: false,
    full_pay: false,
    notes: ''
  })

  // Current select product state
  const [selectedProduct, setSelectedProduct] = useState('')
  const [qty, setQty] = useState<number>(1)

  useEffect(() => {
    fetch('/api/pos_products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        if (data.length > 0) setSelectedProduct(data[0].name)
      })
      
    if (editId) {
      fetch(`/api/orders/${editId}`)
        .then(res => res.json())
        .then(data => {
          setForm({
            customer_name: data.customer_name || '',
            customer_phone: data.customer_phone || '',
            customer_address: data.customer_address || '',
            receive_date: data.receive_date || new Date().toISOString().split('T')[0],
            shipping_fee: data.shipping_fee || 0,
            discount: data.discount || 0,
            deposit: data.deposit || 0,
            pay_ship_now: false,
            full_pay: false,
            notes: data.notes || ''
          })
          setCart(data.items || [])
        })
    }
  }, [editId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAddToCart = () => {
    const prod = products.find(p => p.name === selectedProduct)
    if (!prod) return
    
    // check if exist
    const existing = cart.find(c => c.product_name === prod.name)
    if (existing) {
      setCart(cart.map(c => c.product_name === prod.name ? { ...c, quantity: c.quantity + Number(qty) } : c))
    } else {
      setCart([...cart, { product_name: prod.name, unit_price: prod.price, quantity: Number(qty) }])
    }
  }

  const removeCartItem = (name: string) => {
    setCart(cart.filter(c => c.product_name !== name))
  }

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0)
  }

  const totalItems = cart.reduce((acc, c) => acc + (c.unit_price * c.quantity), 0)
  const ship = Number(form.shipping_fee) || 0
  const disc = Number(form.discount) || 0
  const rawDep = Math.max(0, Number(form.deposit) || 0)
  const subtotal = Math.max(0, totalItems + ship - disc)
  const dep = Math.min(rawDep, subtotal)
  
  let paid = dep
  if (form.pay_ship_now) paid = Math.min(subtotal, paid + ship)
  if (form.full_pay) paid = subtotal
  
  const due = Math.max(0, subtotal - paid)


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0) return alert('Giỏ hàng trống!')
    
    const payload = {
      ...form,
      shipping_fee: ship,
      discount: disc,
      deposit: dep,
      items: cart
    }

    if (isEditMode) {
      fetch(`/api/orders/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => {
        alert(`Đã cập nhật đơn hàng #${editId} thành công!`)
        router.push('/admin/orders')
      })
      .catch(err => alert('Có lỗi xảy ra: ' + err.message))
    } else {
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => {
        alert(`Đã lưu đơn hàng #${data.order_id} thành công!`)
        setCart([])
        setForm({
          customer_name: '', customer_phone: '', customer_address: '',
          receive_date: new Date().toISOString().split('T')[0],
          shipping_fee: 0, deposit: 0, discount: 0,
          pay_ship_now: false, full_pay: false, notes: ''
        })
      })
      .catch(err => alert('Có lỗi xảy ra: ' + err.message))
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.6rem 0.8rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'white',
    outline: 'none',
    marginTop: '0.3rem'
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', paddingBottom: '3rem' }}>
      <div className="header">
        <h1>{isEditMode ? `Chỉnh Sửa Đơn Hàng #${editId}` : 'Tạo Đơn Hàng Mới'}</h1>
      </div>
      
      <div className="pos-grid">
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Thông tin Khách hàng</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label>Họ tên *</label>
                <input type="text" name="customer_name" value={form.customer_name} onChange={handleChange} required style={inputStyle} />
              </div>
              <div>
                <label>Số điện thoại</label>
                <input type="text" name="customer_phone" value={form.customer_phone} onChange={handleChange} style={inputStyle} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Địa chỉ</label>
                <input type="text" name="customer_address" value={form.customer_address} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
          </div>

          <div className="glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Chọn Sản phẩm</h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1 }}>
                <label>Loại bánh</label>
                <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} style={inputStyle} className="bg-slate-800 text-white">
                  {products.map(p => <option key={p.name} value={p.name} className="bg-slate-800">{p.name} - {formatMoney(p.price)}</option>)}
                </select>
              </div>
              <div style={{ width: '100px' }}>
                <label>Số lượng</label>
                <input type="number" min="1" value={qty} onChange={e => setQty(Number(e.target.value))} style={inputStyle} />
              </div>
              <button type="button" className="btn btn-primary" onClick={handleAddToCart} style={{ height: '42px' }}>Thêm</button>
            </div>

            <div className="table-container" style={{ boxShadow: 'none', background: 'rgba(0,0,0,0.1)' }}>
              <table>
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>SL</th>
                    <th>Thành tiền</th>
                    <th>Xoá</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(c => (
                    <tr key={c.product_name}>
                      <td>{c.product_name}</td>
                      <td>{c.quantity}</td>
                      <td className="currency">{formatMoney(c.quantity * c.unit_price)}</td>
                      <td><button type="button" onClick={() => removeCartItem(c.product_name)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>✖</button></td>
                    </tr>
                  ))}
                  {cart.length === 0 && <tr><td colSpan={4} style={{ textAlign: 'center' }}>Chưa có SP nào</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (Settings & Total) */}
        <div className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ color: 'var(--primary)' }}>Thanh Toán & Giao Hàng</h3>
          
          <div>
            <label>Ngày nhận *</label>
            <input type="date" name="receive_date" value={form.receive_date} onChange={handleChange} required style={inputStyle} />
          </div>

          <div>
            <label>Phí Ship (VND)</label>
            <input type="number" name="shipping_fee" value={form.shipping_fee} onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label>Chiết khấu (VND)</label>
            <input type="number" name="discount" value={form.discount} onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label>Đặt cọc (VND)</label>
            <input type="number" name="deposit" value={form.deposit} onChange={handleChange} style={inputStyle} />
          </div>

          {isEditMode ? null : (
            <>
              <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer', marginTop: '0.5rem' }}>
                <input type="checkbox" name="pay_ship_now" checked={form.pay_ship_now} onChange={handleChange} />
                Đã thanh toán phí ship
              </label>

              <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" name="full_pay" checked={form.full_pay} onChange={handleChange} />
                Thanh toán TOÀN BỘ (Full)
              </label>
            </>
          )}

          <div>
            <label>Ghi chú đơn hàng</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} style={{ ...inputStyle, height: '80px', resize: 'none' }} />
          </div>

          <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Tổng Hàng:</span> <span>{formatMoney(totalItems)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Tổng Đơn:</span> <span className="currency" style={{ fontSize: '1.2rem' }}>{formatMoney(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Đã thu:</span> <span>{formatMoney(paid)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 'bold' }}>
              <span>Còn thiếu:</span> <span className="due-positive" style={{ fontSize: '1.2rem' }}>{formatMoney(due)}</span>
            </div>
            
            <button className="btn btn-primary" onClick={handleSubmit} style={{ width: '100%', justifyContent: 'center', padding: '1rem', marginTop: '1rem' }}>
              {isEditMode ? 'CẬP NHẬT ĐƠN HÀNG' : 'LƯU ĐƠN HÀNG'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminPosPage() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <PosForm />
    </Suspense>
  )
}
