'use client'

import AdminPanelNavbar from '@/components/AdminPanelNavbar'
import { Loader1, Loader2 } from '@/components/Loader'
import ArticleAccordion from '@/components/admin/articles/ArticleAccordion'
import ArticleModal from '@/components/admin/articles/ArticleModal'
import ArticlesHeader from '@/components/admin/articles/ArticlesHeader'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function ArticlesManagment() {
  const [articles, setArticles] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [articlesLoading, setArticlesLoading] = useState(true)

  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    coverImage: '',
    tags: [],
    published: false,
  })

  useEffect(() => {
    const getArticles = async () => {
      try {
        setArticlesLoading(true)
        const res = await fetch('/api/articles')
        const data = await res.json()
        setArticles(data)
      } catch (err) {
        console.error(err.message)
      } finally {
        setArticlesLoading(false)
      }
    }
    getArticles()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleAddTag = () => {
    const newTag = tagInput.trim()
    if (newTag && !form.tags.includes(newTag)) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleDeleteArticle = async (id) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' })
      const data = await res.json()

      if (!res.ok) {
        return toast.error(data.message || 'خطا در حذف مقاله')
      }
      setArticles(articles.filter((article) => article._id !== id))
      toast.success(data.message || 'مقاله با موفقیت حذف شد')
    } catch (err) {
      console.error(err.message || 'خطا در حذف مقاله')
    } finally {
      setLoading(false)
    }
  }

  const handleEditArticle = (article) => {
    setForm({
      title: article.title,
      slug: article.slug,
      description: article.description,
      content: article.content,
      coverImage: article.coverImage,
      tags: article.tags,
      published: article.published,
      _id: article._id,
    })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.title.length > 40) {
      return toast.error('حداکثر عنوان مقاله 40 کاراکتر است!')
    }

    if (form.description.length > 105) {
      return toast.error('حداکثر توضیحات مقاله 105 کاراکتر است!')
    }

    setLoading(true)
    try {
      let url = '/api/admin/articles'
      let method = 'POST'

      if (form._id) {
        url = `/api/admin/articles/${form._id}`
        method = 'PUT'
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (data.success) {
        if (method === 'POST') {
          setArticles((prev) => [...prev, data.article])
          toast.success('مقاله با موفقیت افزوده شد')
        } else {
          setArticles((prev) =>
            prev.map((a) => (a._id === data.article._id ? data.article : a))
          )
          toast.success('مقاله با موفقیت ویرایش شد')
        }
        setShowModal(false)
        setForm({
          title: '',
          slug: '',
          description: '',
          content: '',
          coverImage: '',
          tags: [],
          published: true,
        })
      } else {
        toast.error(data.message || 'مشکل در ذخیره مقاله!')
      }
    } catch (err) {
      console.error(err)
      toast.error('خطا در ذخیره مقاله')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <AdminPanelNavbar />

      <div className="w-full lg:w-4/5 bg-light p-4 overflow-hidden relative space-y-6">
        {loading && <Loader1 />}

        {/* Header */}
        <ArticlesHeader
          total={articles.length}
          onAdd={() => setShowModal(true)}
          search={search}
          onSearchChange={(e) => setSearch(e.target.value)}
        />

        {/* show all articles */}
        {articlesLoading ? (
          <Loader2 />
        ) : filteredArticles.length > 0 ? (
          <ArticleAccordion
            articles={filteredArticles}
            onDelete={handleDeleteArticle}
            onEdit={handleEditArticle}
          />
        ) : (
          <p className="text-center text-gray-500">هیچ مقاله‌ای یافت نشد.</p>
        )}

        {/* Modal */}
        <ArticleModal
          form={form}
          setForm={setForm}
          showModal={showModal}
          setShowModal={setShowModal}
          tagInput={tagInput}
          setTagInput={setTagInput}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  )
}
