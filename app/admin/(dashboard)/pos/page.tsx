'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ShoppingCart, Plus, Trash2, ArrowLeft, CheckCircle, Save, User, Package, CreditCard } from 'lucide-react'

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
    if (cart.length === 0) return alert('Giỏ hàng chưa có sản phẩm nào!')
    if (!form.customer_name) return alert('Vui lòng nhập tên khách hàng!')
    
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
      .then(() => {
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
        alert(`Đã tạo thành công đơn hàng #${data.order_id}!`)
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
    padding: '0.65rem 0.8rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    color: 'white',
    outline: 'none',
    marginTop: '0.3rem',
    fontSize: '0.9rem'
  }

  return (
    <div style={{ animation: 'fadeIn 0.4s ease', paddingBottom: '3rem' }}>
      {/* Top Header */}
      <div className="header" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isEditMode && (
            <button className="btn btn-outline" onClick={() => router.push('/admin/orders')} style={{ padding: '0.5rem 0.8rem' }}>
              <ArrowLeft size={18} />
            </button>
          )}
          <div>
            <h1>{isEditMode ? `Chỉnh Sửa Đơn Hàng #${editId}` : 'Tạo Đơn Hàng Mới (POS)'}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              Tạo mới và quản lý đơn đặt bánh thủ công Văn Hòa Lạc
            </p>
          </div>
        </div>
      </div>
      
      <div className="pos-grid">
        {/* Left Column: Customer & Product Selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Customer Info Card */}
          <div className="glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
              <User size={18} />
              <span>Thông Tin Khách Hàng</span>
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Họ và tên khách *</label>
                <input 
                  type="text" 
                  name="customer_name" 
                  value={form.customer_name} 
                  onChange={handleChange} 
                  placeholder="Ví dụ: Nguyễn Văn A"
                  required 
                  style={inputStyle} 
                />
              </div>
              
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Số điện thoại</label>
                <input 
                  type="text" 
                  name="customer_phone" 
                  value={form.customer_phone} 
                  onChange={handleChange} 
                  placeholder="Ví dụ: 0987654321"
                  style={inputStyle} 
                />
              </div>
              
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Địa chỉ giao hàng</label>
                <input 
                  type="text" 
                  name="customer_address" 
                  value={form.customer_address} 
                  onChange={handleChange} 
                  placeholder="Số nhà, tên đường, phường/xã, TP..."
                  style={inputStyle} 
                />
              </div>
            </div>
          </div>

          {/* Product Selection Card */}
          <div className="glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
              <Package size={18} />
              <span>Chọn Sản Phẩm</span>
            </h3>

            {/* Responsive Input Control Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.8rem', alignItems: 'end', marginBottom: '1.5rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Loại bánh</label>
                <select 
                  value={selectedProduct} 
                  onChange={e => setSelectedProduct(e.target.value)} 
                  style={{ ...inputStyle, height: '42px', cursor: 'pointer' }}
                >
                  {products.map(p => (
                    <option key={p.name} value={p.name} style={{ background: '#1e293b', color: '#fff' }}>
                      {p.name} - {formatMoney(p.price)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Số lượng</label>
                <input 
                  type="number" 
                  min="1" 
                  value={qty} 
                  onChange={e => setQty(Math.max(1, Number(e.target.value)))} 
                  style={{ ...inputStyle, height: '42px' }} 
                />
              </div>

              <div>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleAddToCart} 
                  style={{ width: '100%', height: '42px', justifyContent: 'center', marginTop: '0.3rem' }}
                >
                  <Plus size={18} />
                  <span>Thêm Vào Đơn</span>
                </button>
              </div>
            </div>

            {/* Selected Products Table */}
            <div className="table-container" style={{ boxShadow: 'none', background: 'rgba(0,0,0,0.15)', borderRadius: '12px' }}>
              <table>
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th style={{ textAlign: 'center' }}>Đơn giá</th>
                    <th style={{ textAlign: 'center' }}>SL</th>
                    <th style={{ textAlign: 'right' }}>Thành tiền</th>
                    <th style={{ textAlign: 'center', width: '60px' }}>Xoá</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(c => (
                    <tr key={c.product_name}>
                      <td style={{ fontWeight: '500' }}>{c.product_name}</td>
                      <td style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {formatMoney(c.unit_price)}
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{c.quantity}</td>
                      <td className="currency" style={{ textAlign: 'right' }}>
                        {formatMoney(c.quantity * c.unit_price)}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          type="button" 
                          onClick={() => removeCartItem(c.product_name)} 
                          style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.4rem', borderRadius: '6px' }}
                          title="Xóa sản phẩm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {cart.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
                        <ShoppingCart size={36} style={{ margin: '0 auto 0.5rem auto', opacity: 0.4 }} />
                        <div>Chưa có sản phẩm nào trong giỏ hàng</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Payment & Summary Panel */}
        <div className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', height: 'fit-content' }}>
          <h3 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
            <CreditCard size={18} />
            <span>Thanh Toán & Giao Hàng</span>
          </h3>
          
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ngày nhận bánh *</label>
            <input 
              type="date" 
              name="receive_date" 
              value={form.receive_date} 
              onChange={handleChange} 
              required 
              style={inputStyle} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Phí Ship (VNĐ)</label>
              <input 
                type="number" 
                name="shipping_fee" 
                value={form.shipping_fee} 
                onChange={handleChange} 
                style={inputStyle} 
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Chiết khấu (VNĐ)</label>
              <input 
                type="number" 
                name="discount" 
                value={form.discount} 
                onChange={handleChange} 
                style={inputStyle} 
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Đặt cọc (VNĐ)</label>
            <input 
              type="number" 
              name="deposit" 
              value={form.deposit} 
              onChange={handleChange} 
              style={inputStyle} 
            />
          </div>

          {!isEditMode && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.6rem 0' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                <input type="checkbox" name="pay_ship_now" checked={form.pay_ship_now} onChange={handleChange} />
                <span>Đã thanh toán phí ship</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                <input type="checkbox" name="full_pay" checked={form.full_pay} onChange={handleChange} />
                <span>Thanh toán TOÀN BỘ (Full)</span>
              </label>
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ghi chú đơn hàng</label>
            <textarea 
              name="notes" 
              value={form.notes} 
              onChange={handleChange} 
              placeholder="Ghi chú giao hàng, loại vỏ, loại hộp..."
              style={{ ...inputStyle, height: '70px', resize: 'none' }} 
            />
          </div>

          {/* Payment Totals Box */}
          <div style={{ marginTop: '0.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Tiền Hàng:</span> 
              <span>{formatMoney(totalItems)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Phí Ship:</span> 
              <span>{formatMoney(ship)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Chiết Khấu:</span> 
              <span style={{ color: '#ef4444' }}>-{formatMoney(disc)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', padding: '0.5rem 0', borderTop: '1px dashed var(--border)' }}>
              <span style={{ fontWeight: 'bold' }}>TỔNG ĐƠN:</span> 
              <span className="currency" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{formatMoney(subtotal)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Đã Thu:</span> 
              <span style={{ color: '#34d399', fontWeight: '500' }}>{formatMoney(paid)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', fontWeight: 'bold' }}>
              <span>Còn Thiếu:</span> 
              <span className={due > 0 ? 'due-positive' : 'due-zero'} style={{ fontSize: '1.15rem' }}>
                {formatMoney(due)}
              </span>
            </div>
            
            <button 
              className="btn btn-primary" 
              onClick={handleSubmit} 
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold' }}
            >
              {isEditMode ? <Save size={18} /> : <CheckCircle size={18} />}
              <span>{isEditMode ? 'CẬP NHẬT ĐƠN HÀNG' : 'LƯU ĐƠN HÀNG'}</span>
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
