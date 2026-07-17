"use client"

import { useState } from 'react'
import { AddProductForm } from '@/components/add-product-form'
import { AddBlogForm } from '@/components/add-blog-form'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'posts'>('products')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Quản Lý Nội Dung</h1>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'products'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Sản Phẩm
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'posts'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Bài Viết
          </button>
        </div>

        {/* Content */}
        {activeTab === 'products' && <AddProductForm />}
        {activeTab === 'posts' && <AddBlogForm />}
      </div>
    </div>
  )
}