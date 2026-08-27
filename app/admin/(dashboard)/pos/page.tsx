'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CheckCircle, Save, User, Package, CreditCard, UserCheck, Loader2, Calendar } from 'lucide-react'

function PosForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const editId = searchParams.get('editId')
  const isEditMode = !!editId

  const getTodayDateStr = () => {
    const d = new Date()
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const getTomorrowDateStr = () => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const formatDateLabel = (dateStr: string) => {
    if (!dateStr) return ''
    const parts = dateStr.split('-')
    if (parts.length !== 3) return dateStr
    const year = Number(parts[0])
    const month = Number(parts[1])
    const day = Number(parts[2])
    if (isNaN(year) || isNaN(month) || isNaN(day)) return dateStr
    
    const dateObj = new Date(year, month - 1, day)
    const daysOfWeek = ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
    const dayOfWeekStr = daysOfWeek[dateObj.getDay()]
    const formattedMonth = String(month).padStart(2, '0')
    const formattedDay = String(day).padStart(2, '0')
    return `${dayOfWeekStr}, ${formattedDay}/${formattedMonth}`
  }

  const [products, setProducts] = useState<any[]>([])
  const [cart, setCart] = useState<any[]>([])
  
  // Form state - Default receive_date set to TOMORROW
  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    customer_address: '',
    receive_date: getTomorrowDateStr(),
    shipping_fee: 0,
    deposit: 0,
    discount: 0,
    pay_ship_now: false,
    full_pay: false,
    notes: ''
  })

  // Customer lookup state
  const [isSearchingCustomer, setIsSearchingCustomer] = useState(false)
  const [customerFoundInfo, setCustomerFoundInfo] = useState<{ name: string; phone: string; address?: string } | null>(null)

  // Current select product state
  const [selectedProduct, setSelectedProduct] = useState('')
  const [qty, setQty] = useState<number>(1)

  // Debounced Phone Lookup Effect
  useEffect(() => {
    const phone = form.customer_phone.trim()
    const digitsOnly = phone.replace(/\D/g, '')

    if (digitsOnly.length < 8) {
      setCustomerFoundInfo(null)
      setIsSearchingCustomer(false)
      return
    }

    setIsSearchingCustomer(true)
    const timer = setTimeout(() => {
      fetch(`/api/customers/lookup?phone=${encodeURIComponent(phone)}`)
        .then(res => res.json())
        .then(data => {
          setIsSearchingCustomer(false)
          if (data.found && data.customer_name) {
            setCustomerFoundInfo({
              name: data.customer_name,
              phone: data.customer_phone || phone,
              address: data.customer_address || ''
            })
            setForm(prev => ({
              ...prev,
              customer_name: data.customer_name,
              customer_address: data.customer_address || prev.customer_address
            }))
          } else {
            setCustomerFoundInfo(null)
          }
        })
        .catch(() => {
          setIsSearchingCustomer(false)
          setCustomerFoundInfo(null)
        })
    }, 350)

    return () => clearTimeout(timer)
  }, [form.customer_phone])

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
            receive_date: data.receive_date || getTomorrowDateStr(),
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

    if (name === 'pay_ship_now') {
      const isChecked = checked
      let currentNotes = form.notes || ''
      const tag = 'Đã thanh toán phí ship'
      if (isChecked) {
        if (!currentNotes.includes(tag)) {
          currentNotes = currentNotes ? `${currentNotes}\n${tag}` : tag
        }
      } else {
        currentNotes = currentNotes
          .split('\n')
          .filter(line => line.trim() !== tag)
          .join('\n')
          .trim()
      }
      setForm(prev => ({
        ...prev,
        pay_ship_now: isChecked,
        notes: currentNotes
      }))
      return
    }

    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleMoneyBlur = (field: 'shipping_fee' | 'discount' | 'deposit') => {
    const val = Number(form[field]) || 0
    if (val > 0 && val < 1000) {
      setForm(prev => ({ ...prev, [field]: val * 1000 }))
    }
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

  const updateCartQty = (name: string, delta: number) => {
    setCart(prev => prev.map(c => {
      if (c.product_name === name) {
        const newQty = c.quantity + delta
        return newQty > 0 ? { ...c, quantity: newQty } : c
      }
      return c
    }))
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
        setCustomerFoundInfo(null)
        setForm({
          customer_name: '', customer_phone: '', customer_address: '',
          receive_date: getTomorrowDateStr(),
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
    fontSize: '0.95rem'
  }

  return (
    <div style={{ animation: 'fadeIn 0.4s ease', paddingBottom: '5rem' }}>
      {/* Top Header */}
      <div className="header" style={{ marginBottom: '1.2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', width: '100%' }}>
          {isEditMode && (
            <button className="btn btn-outline" onClick={() => router.push('/admin/orders')} style={{ padding: '0.5rem 0.8rem' }}>
              <ArrowLeft size={18} />
            </button>
          )}
          <div>
            <h1 style={{ fontSize: '1.5rem' }}>{isEditMode ? `Sửa Đơn #${editId}` : 'Tạo Đơn Hàng Mới (POS)'}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              Quản lý đơn đặt bánh trung thu Văn Hòa Lạc
            </p>
          </div>
        </div>
      </div>
      
      <div className="pos-grid">
        {/* Left Column: Customer & Product Selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {/* Customer Info Card */}
          <div className="glass" style={{ padding: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h3 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.05rem', margin: 0 }}>
                <User size={18} />
                <span>Thông Tin Khách Hàng</span>
              </h3>
              {customerFoundInfo && (
                <span style={{
                  fontSize: '0.78rem',
                  color: '#34d399',
                  background: 'rgba(52, 211, 153, 0.12)',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  <UserCheck size={14} />
                  <span>Khách cũ ({customerFoundInfo.name})</span>
                </span>
              )}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.9rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Họ và tên khách *</label>
                <input 
                  type="text" 
                  name="customer_name" 
                  value={form.customer_name} 
                  onChange={handleChange} 
                  placeholder="Ví dụ: Nguyễn Văn A"
                  required 
                  style={{
                    ...inputStyle,
                    borderColor: customerFoundInfo ? '#10b981' : 'var(--border)',
                    boxShadow: customerFoundInfo ? '0 0 8px rgba(16, 185, 129, 0.2)' : 'none'
                  }} 
                />
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Số điện thoại</label>
                  {isSearchingCustomer && (
                    <span style={{ fontSize: '0.75rem', color: '#fbbf24', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} /> Tìm...
                    </span>
                  )}
                </div>
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
                  placeholder="Số nhà, tên đường, TP..."
                  style={{
                    ...inputStyle,
                    borderColor: customerFoundInfo && form.customer_address ? '#10b981' : 'var(--border)'
                  }} 
                />
              </div>
            </div>
          </div>


          {/* Product Selection Card */}
          <div className="glass" style={{ padding: '1.2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.05rem', margin: '0 0 1rem 0' }}>
              <Package size={18} />
              <span>Chọn Sản Phẩm</span>
            </h3>

            {/* Responsive Input Control Container */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Loại bánh</label>
                <select 
                  value={selectedProduct} 
                  onChange={e => setSelectedProduct(e.target.value)} 
                  style={{ ...inputStyle, height: '44px', cursor: 'pointer' }}
                >
                  {products.map(p => (
                    <option key={p.name} value={p.name} style={{ background: '#1e293b', color: '#fff' }}>
                      {p.name} - {formatMoney(p.price)}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.8rem', alignItems: 'end' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Số lượng</label>
                    <div className="preset-chip-group" style={{ margin: 0 }}>
                      {[1, 2, 4, 10].map(n => (
                        <button key={n} type="button" className="preset-chip" onClick={() => setQty(n)}>
                          +{n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <input 
                    type="number" 
                    min="1" 
                    value={qty} 
                    onChange={e => setQty(Math.max(1, Number(e.target.value)))} 
                    style={{ ...inputStyle, height: '44px' }} 
                  />
                </div>

                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleAddToCart} 
                  style={{ height: '44px', padding: '0 1.2rem', justifyContent: 'center', whiteSpace: 'nowrap' }}
                >
                  <Plus size={18} />
                  <span>Thêm Vào Đơn</span>
                </button>
              </div>
            </div>

            {/* Cart Display: Desktop Table View */}
            <div className="pos-cart-desktop">
              <div className="table-container" style={{ boxShadow: 'none', background: 'rgba(0,0,0,0.15)', borderRadius: '12px' }}>
                <table>
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th style={{ textAlign: 'center' }}>Đơn giá</th>
                      <th style={{ textAlign: 'center', width: '130px' }}>Số lượng</th>
                      <th style={{ textAlign: 'right' }}>Thành tiền</th>
                      <th style={{ textAlign: 'center', width: '50px' }}>Xoá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(c => (
                      <tr key={c.product_name}>
                        <td style={{ fontWeight: '500' }}>{c.product_name}</td>
                        <td style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {formatMoney(c.unit_price)}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <div className="qty-control">
                            <button type="button" className="qty-btn" onClick={() => updateCartQty(c.product_name, -1)}>
                              <Minus size={14} />
                            </button>
                            <span className="qty-val">{c.quantity}</span>
                            <button type="button" className="qty-btn" onClick={() => updateCartQty(c.product_name, 1)}>
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
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

            {/* Cart Display: Mobile Card View */}
            <div className="pos-cart-mobile">
              {cart.map(c => (
                <div key={c.product_name} className="cart-item-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.95rem', color: '#fff' }}>{c.product_name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Đơn giá: {formatMoney(c.unit_price)}</div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeCartItem(c.product_name)} 
                      style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.4rem', borderRadius: '8px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.2rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border)' }}>
                    <div className="qty-control">
                      <button type="button" className="qty-btn" onClick={() => updateCartQty(c.product_name, -1)}>
                        <Minus size={14} />
                      </button>
                      <span className="qty-val">{c.quantity}</span>
                      <button type="button" className="qty-btn" onClick={() => updateCartQty(c.product_name, 1)}>
                        <Plus size={14} />
                      </button>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Thành tiền</span>
                      <span className="currency" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        {formatMoney(c.quantity * c.unit_price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {cart.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.15)', borderRadius: '12px' }}>
                  <ShoppingCart size={32} style={{ margin: '0 auto 0.5rem auto', opacity: 0.4 }} />
                  <div style={{ fontSize: '0.9rem' }}>Chưa có sản phẩm nào trong giỏ hàng</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Payment & Summary Panel */}
        <div className="glass" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: 'fit-content' }}>
          <h3 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.05rem', margin: 0 }}>
            <CreditCard size={18} />
            <span>Thanh Toán & Giao Hàng</span>
          </h3>
          
          {/* Receive Date Selector with Quick Chips */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Calendar size={14} />
                <span>Ngày nhận bánh *</span>
              </label>
              <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: '600' }}>
                {formatDateLabel(form.receive_date)}
              </span>
            </div>

            <div className="date-chip-group">
              <button 
                type="button" 
                className={`date-chip ${form.receive_date === getTomorrowDateStr() ? 'active' : ''}`}
                onClick={() => setForm(prev => ({ ...prev, receive_date: getTomorrowDateStr() }))}
              >
                🌅 Ngày mai ({formatDateLabel(getTomorrowDateStr())})
              </button>
              <button 
                type="button" 
                className={`date-chip ${form.receive_date === getTodayDateStr() ? 'active' : ''}`}
                onClick={() => setForm(prev => ({ ...prev, receive_date: getTodayDateStr() }))}
              >
                📅 Hôm nay ({formatDateLabel(getTodayDateStr())})
              </button>
            </div>

            <input 
              type="date" 
              name="receive_date" 
              value={form.receive_date} 
              onChange={handleChange} 
              required 
              style={{ ...inputStyle, marginTop: '0.4rem' }} 
            />
          </div>

          {/* Shipping fee & Discount */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Phí Ship (VNĐ)</label>
              <input 
                type="number" 
                name="shipping_fee" 
                value={form.shipping_fee} 
                onChange={handleChange} 
                onBlur={() => handleMoneyBlur('shipping_fee')}
                placeholder="Ví dụ: 30000"
                style={inputStyle} 
              />
              <div className="preset-chip-group">
                <button type="button" className="preset-chip" onClick={() => setForm(p => ({ ...p, shipping_fee: 0 }))}>Free</button>
                <button type="button" className="preset-chip" onClick={() => setForm(p => ({ ...p, shipping_fee: 15000 }))}>15k</button>
                <button type="button" className="preset-chip" onClick={() => setForm(p => ({ ...p, shipping_fee: 20000 }))}>20k</button>
                <button type="button" className="preset-chip" onClick={() => setForm(p => ({ ...p, shipping_fee: 30000 }))}>30k</button>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Chiết khấu (VNĐ)</label>
              <input 
                type="number" 
                name="discount" 
                value={form.discount} 
                onChange={handleChange} 
                onBlur={() => handleMoneyBlur('discount')}
                placeholder="Ví dụ: 50000"
                style={inputStyle} 
              />
              <div className="preset-chip-group">
                <button type="button" className="preset-chip" onClick={() => setForm(p => ({ ...p, discount: 0 }))}>0đ</button>
                <button type="button" className="preset-chip" onClick={() => setForm(p => ({ ...p, discount: 20000 }))}>20k</button>
                <button type="button" className="preset-chip" onClick={() => setForm(p => ({ ...p, discount: 50000 }))}>50k</button>
              </div>
            </div>
          </div>

          {/* Deposit */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Đặt cọc (VNĐ)</label>
              <div className="preset-chip-group" style={{ margin: 0 }}>
                <button type="button" className="preset-chip" onClick={() => setForm(p => ({ ...p, deposit: Math.round(subtotal * 0.5) }))}>Cọc 50%</button>
                <button type="button" className="preset-chip" onClick={() => setForm(p => ({ ...p, deposit: subtotal }))}>Full 100%</button>
                <button type="button" className="preset-chip" onClick={() => setForm(p => ({ ...p, deposit: 0 }))}>Xóa cọc</button>
              </div>
            </div>
            <input 
              type="number" 
              name="deposit" 
              value={form.deposit} 
              onChange={handleChange} 
              onBlur={() => handleMoneyBlur('deposit')}
              placeholder="Ví dụ: 200000"
              style={inputStyle} 
            />
          </div>

          {!isEditMode && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.4rem 0' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                <input type="checkbox" name="pay_ship_now" checked={form.pay_ship_now} onChange={handleChange} style={{ accentColor: '#f59e0b' }} />
                <span>Đã thanh toán phí ship</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                <input type="checkbox" name="full_pay" checked={form.full_pay} onChange={handleChange} style={{ accentColor: '#f59e0b' }} />
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
              style={{ ...inputStyle, height: '65px', resize: 'none' }} 
            />
          </div>

          {/* Payment Totals Box */}
          <div style={{ marginTop: '0.3rem', borderTop: '1px solid var(--border)', paddingTop: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Tiền Hàng:</span> 
              <span>{formatMoney(totalItems)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Phí Ship:</span> 
              <span>{formatMoney(ship)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Chiết Khấu:</span> 
              <span style={{ color: '#ef4444' }}>-{formatMoney(disc)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', padding: '0.4rem 0', borderTop: '1px dashed var(--border)' }}>
              <span style={{ fontWeight: 'bold' }}>TỔNG ĐƠN:</span> 
              <span className="currency" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{formatMoney(subtotal)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Đã Thu:</span> 
              <span style={{ color: '#34d399', fontWeight: '500' }}>{formatMoney(paid)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 'bold' }}>
              <span>Còn Thiếu:</span> 
              <span className={due > 0 ? 'due-positive' : 'due-zero'} style={{ fontSize: '1.1rem' }}>
                {formatMoney(due)}
              </span>
            </div>
            
            <button 
              className="btn btn-primary" 
              onClick={handleSubmit} 
              style={{ width: '100%', justifyContent: 'center', padding: '0.8rem', borderRadius: '10px', fontSize: '0.98rem', fontWeight: 'bold' }}
            >
              {isEditMode ? <Save size={18} /> : <CheckCircle size={18} />}
              <span>{isEditMode ? 'CẬP NHẬT ĐƠN HÀNG' : 'LƯU ĐƠN HÀNG'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Sticky Mobile Bottom Bar */}
      {cart.length > 0 && (
        <div className="pos-mobile-sticky-bar">
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cart.length} món • Còn thiếu:</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: due > 0 ? '#ef4444' : '#34d399' }}>
              {formatMoney(due)}
            </div>
          </div>
          <button 
            className="btn btn-primary" 
            onClick={handleSubmit} 
            style={{ padding: '0.65rem 1.1rem', borderRadius: '10px', fontWeight: 'bold' }}
          >
            {isEditMode ? <Save size={16} /> : <CheckCircle size={16} />}
            <span>{isEditMode ? 'CẬP NHẬT' : 'LƯU ĐƠN'}</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default function AdminPosPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Đang tải giao diện POS...</div>}>
      <PosForm />
    </Suspense>
  )
}
