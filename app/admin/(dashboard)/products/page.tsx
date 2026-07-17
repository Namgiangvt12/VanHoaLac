'use client'

import { AddProductForm } from '@/components/add-product-form'

export default function AdminProductsPage() {
  return (
    <div className="container" style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="header" style={{ marginBottom: '1.5rem' }}>
        <h1>Sản Phẩm</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6" style={{ color: 'black' }}>
        <AddProductForm />
      </div>
    </div>
  )
}
