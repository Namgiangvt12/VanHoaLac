"use client"

import { useState } from "react"

interface ProductFormData {
  name: string
  slug: string
  description: string
  price: string
  image_url: string
  category: string
  in_stock: boolean
  featured: boolean
}

export function AddProductForm() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    slug: '',
    description: '',
    price: '',
    image_url: '',
    category: 'Bánh Trung Thu',
    in_stock: true,
    featured: false,
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Sản phẩm đã được thêm thành công!')
        // Reset form
        setFormData({
          name: '',
          slug: '',
          description: '',
          price: '',
          image_url: '',
          category: 'Bánh Trung Thu',
          in_stock: true,
          featured: false,
        })
      } else {
        setMessage(`Lỗi: ${data.error}`)
      }
    } catch (error) {
      setMessage('Có lỗi xảy ra khi thêm sản phẩm')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Thêm Sản Phẩm Mới</h2>

      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('thành công') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Tên sản phẩm *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ví dụ: Bánh Trung Thu Nhân Hạt Sen"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
            Slug (URL) *
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ví dụ: banh-hat-sen"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mô tả chi tiết về sản phẩm..."
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Giá (VNĐ) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ví dụ: 180000"
          />
        </div>

        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">
            URL hình ảnh
          </label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ví dụ: /images/mooncake.jpg"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Danh mục
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Bánh Trung Thu">Bánh Trung Thu</option>
            <option value="Bánh Trung Thu Đặc Biệt">Bánh Trung Thu Đặc Biệt</option>
            <option value="Bánh Trung Thu Truyền Thống">Bánh Trung Thu Truyền Thống</option>
          </select>
        </div>

        <div className="flex space-x-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="in_stock"
              checked={formData.in_stock}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Còn hàng</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Nổi bật</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Đang thêm...' : 'Thêm Sản Phẩm'}
        </button>
      </form>
    </div>
  )
}