'use client'

import { useState } from 'react'
import { AddBlogForm, BasePost } from '@/components/add-blog-form'
import { BlogList } from '@/components/blog-list'

export default function AdminPostsPage() {
  const [editingPost, setEditingPost] = useState<BasePost | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleEdit = (post: BasePost) => {
    setEditingPost(post)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="container" style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="header" style={{ marginBottom: '1.5rem' }}>
        <h1>Bài Viết</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6" style={{ color: 'black' }}>
        <AddBlogForm 
          initialData={editingPost} 
          onCancel={() => setEditingPost(null)}
          onSuccess={() => {
            setEditingPost(null)
            setRefreshKey(prev => prev + 1)
          }} 
        />
      </div>
      <BlogList key={refreshKey} onEdit={handleEdit} />
    </div>
  )
}
