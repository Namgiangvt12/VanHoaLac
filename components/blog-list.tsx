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
      const res = await fetch("/api/posts", { cache: "no-store" })
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
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.detail || "Lỗi khi xóa bài viết")
      }
      
      // Refresh list
      fetchPosts()
    } catch (err: any) {
      alert(err.message)
    }
  }

  if (loading) return <div className="text-gray-500 py-4">Đang tải danh sách bài viết...</div>
  if (error) return <div className="text-red-500 py-4">Lỗi: {error}</div>

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Danh Sách Bài Viết ({posts.length})</h3>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ảnh</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu đề & Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Danh mục</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày đăng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{post.id}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  {post.image_url ? (
                    <div className="w-12 h-12 rounded overflow-hidden bg-gray-100 relative border border-gray-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-400">Không ảnh</div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="font-medium">{post.title}</div>
                  <div className="text-gray-500 text-xs font-mono">/{post.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.scheduled_at && new Date(post.scheduled_at) > new Date() ? (
                    <div>
                      <div className="text-amber-600 font-medium text-xs">Hẹn lúc:</div>
                      <div>{new Date(post.scheduled_at).toLocaleString("vi-VN", { dateStyle: 'short', timeStyle: 'short' })}</div>
                    </div>
                  ) : (
                    post.created_at ? new Date(post.created_at).toLocaleDateString("vi-VN") : "N/A"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {post.published && post.scheduled_at && new Date(post.scheduled_at) > new Date() ? (
                    <span className="px-2.5 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                      <span>⏰ Hẹn giờ</span>
                    </span>
                  ) : post.published ? (
                    <span className="px-2.5 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                      <span>✓ Đã đăng</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 border border-gray-200">
                      <span>Bản nháp</span>
                    </span>
                  )}
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
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">Chưa có bài viết nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
