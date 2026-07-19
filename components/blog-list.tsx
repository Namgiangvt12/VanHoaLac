"use client"

import { useState, useEffect } from "react"
import type { BasePost } from "./add-blog-form"

interface BlogListProps {
  onEdit: (post: BasePost) => void
}

export function BlogList({ onEdit }: BlogListProps) {
  const [posts, setPosts] = useState<BasePost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts")
      if (!res.ok) throw new Error("Failed to fetch posts")
      const data = await res.json()
      setPosts(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xoá bài viết này không?")) return

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE"
      })
      if (!res.ok) throw new Error("Lỗi khi xóa bài viết")
      
      // Refresh list
      fetchPosts()
    } catch (err: any) {
      alert(err.message)
    }
  }

  if (loading) return <div className="text-gray-500">Đang tải danh sách bài viết...</div>
  if (error) return <div className="text-red-500">Lỗi: {error}</div>

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Danh Sách Bài Viết ({posts.length})</h3>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu đề</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Danh mục</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày đăng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="font-medium">{post.title}</div>
                  <div className="text-gray-500 text-xs">/{post.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {post.published ? 'Đã đăng' : 'Bản nháp'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => onEdit(post)}
                    className="text-indigo-600 hover:text-indigo-900 font-semibold"
                  >
                    Sửa
                  </button>
                  <button 
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:text-red-900 ml-4 font-semibold"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Chưa có bài viết nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
