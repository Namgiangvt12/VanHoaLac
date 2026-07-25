"use client"

import { useState, useRef, useMemo, useEffect } from "react"
import dynamic from "next/dynamic"
import "react-quill-new/dist/quill.snow.css"
import imageCompression from 'browser-image-compression'

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

export interface BlogFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  image_url: string
  category: string
  published: boolean
}

export interface BasePost extends BlogFormData {
  id: number
  created_at: string
}

interface Props {
  initialData?: BasePost | null
  onSuccess?: () => void
  onCancel?: () => void
}

export function AddBlogForm({ initialData, onSuccess, onCancel }: Props) {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: 'Tin tức',
    published: true,
  })
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [message, setMessage] = useState('')
  const quillRef = useRef<any>(null)

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        slug: initialData.slug || '',
        excerpt: initialData.excerpt || '',
        content: initialData.content || '',
        image_url: initialData.image_url || '',
        category: initialData.category || 'Tin tức',
        published: Boolean(initialData.published),
      })
    } else {
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        image_url: '',
        category: 'Tin tức',
        published: true,
      })
    }
  }, [initialData])

  const toSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/([^0-9a-z-\s])/g, "")
      .replace(/(\s+)/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  const imageHandler = () => {
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")
    input.click()

    input.onchange = async () => {
      let file = input.files ? input.files[0] : null
      if (!file) return

      try {
        if (file.type.startsWith('image/')) {
          file = await imageCompression(file, {
            maxSizeMB: 0.8,
            maxWidthOrHeight: 1920,
            useWebWorker: true
          })
        }
      } catch (error) {
        console.error("Compression error:", error)
      }

      const uploadData = new FormData()
      uploadData.append("file", file)

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        })
        const data = await res.json()
        if (data.url) {
          const quill = quillRef.current.getEditor()
          const range = quill.getSelection(true) || { index: quill.getLength() }
          quill.insertEmbed(range.index, "image", data.url)
        } else {
          alert('Lỗi: ' + (data.detail || 'Không thể upload ảnh'))
        }
      } catch (err: any) {
        alert("Có lỗi xảy ra khi upload ảnh nội dung: " + err.message)
      }
    }
  }

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), [])

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files ? e.target.files[0] : null
    if (!file) return
    
    setUploadingImage(true)
    
    try {
      if (file.type.startsWith('image/')) {
        file = await imageCompression(file, {
          maxSizeMB: 0.8,
          maxWidthOrHeight: 1200,
          useWebWorker: true
        })
      }
    } catch (error) {
      console.error("Compression error:", error)
    }

    const uploadData = new FormData()
    uploadData.append("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      })
      const data = await res.json()
      if (data.url) {
        setFormData(prev => ({ ...prev, image_url: data.url }))
      } else {
        alert('Lỗi: ' + (data.detail || 'Không thể upload ảnh đại diện'))
      }
    } catch (err: any) {
      alert("Lỗi kết nối upload: " + err.message)
    } finally {
      setUploadingImage(false)
      e.target.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const isEdit = !!initialData?.id
    const url = isEdit ? `/api/posts/${initialData.id}` : '/api/posts'
    const method = isEdit ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(isEdit ? 'Bài viết đã được cập nhật thành công!' : 'Bài viết đã được thêm thành công!')
        if (!isEdit) {
          setFormData({
            title: '',
            slug: '',
            excerpt: '',
            content: '',
            image_url: '',
            category: 'Tin tức',
            published: true,
          })
        }
        if (onSuccess) onSuccess()
      } else {
        setMessage(`Lỗi: ${data.detail || data.error || 'Không thể lưu bài viết'}`)
      }
    } catch (error: any) {
      setMessage('Có lỗi xảy ra khi lưu bài viết: ' + (error.message || 'Lỗi mạng'))
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => {
      const next = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }
      if (name === 'title' && !initialData) {
        next.slug = toSlug(value)
      }
      return next
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {initialData ? 'Chỉnh Sửa Bài Viết' : 'Thêm Bài Viết Mới'}
        </h2>
        {initialData && onCancel && (
          <button type="button" onClick={onCancel} className="text-sm text-gray-500 hover:text-gray-700 font-medium underline">Hủy (Về Thêm Mới)</button>
        )}
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded font-medium ${message.includes('thành công') || message.includes('cập nhật') ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Tiêu đề *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tiêu đề bài viết"
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
            placeholder="slug-cua-bai-viet"
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
            Tóm tắt *
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tóm tắt bài viết (sẽ hiển thị trong danh sách)"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Nội dung *
          </label>
          <div className="bg-white">
            <ReactQuill 
              {...({ ref: quillRef } as any)}
              theme="snow"
              value={formData.content}
              onChange={(value: string) => setFormData(prev => ({ ...prev, content: value }))}
              modules={modules}
              className="h-[400px] mb-12"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ảnh đại diện (Thumbnail)
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="URL ảnh hoặc tải file lên..."
              />
            </div>
            <label className="whitespace-nowrap cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center font-medium">
              {uploadingImage ? 'Đang tải...' : '📂 Tải lên'}
              <input type="file" accept="image/*" className="hidden" disabled={uploadingImage} onChange={handleThumbnailUpload} />
            </label>
          </div>
          {formData.image_url && (
            <div className="mt-2 relative w-32 h-20 rounded border border-gray-200 overflow-hidden bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={formData.image_url} alt="Thumbnail preview" className="w-full h-full object-cover" />
            </div>
          )}
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
            <option value="Tin tức">Tin tức</option>
            <option value="Báo chí">Báo chí</option>
            <option value="Khuyến mãi">Khuyến mãi</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
            Kích hoạt xuất bản (Hiện trên trang web)
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || uploadingImage}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 font-semibold"
        >
          {loading ? 'Đang lưu...' : (initialData ? 'Lưu Thay Đổi Bài Viết' : 'Thêm Bài Viết Mới')}
        </button>
      </form>
    </div>
  )
}
