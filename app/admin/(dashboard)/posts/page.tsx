'use client'

import { AddBlogForm } from '@/components/add-blog-form'

export default function AdminPostsPage() {
  return (
    <div className="container" style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="header" style={{ marginBottom: '1.5rem' }}>
        <h1>Bài Viết</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6" style={{ color: 'black' }}>
        <AddBlogForm />
      </div>
    </div>
  )
}
