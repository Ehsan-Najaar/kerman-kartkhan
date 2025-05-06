// src/app/storage/page.tsx
'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Button from '@/components/ui/mine/Button'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function FileManager() {
  const [files, setFiles] = useState([])
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/storage/list-files')
      const data = await res.json()
      setFiles(data.files || [])
    } catch {
      toast.error('خطا در دریافت فایل‌ها')
    }
  }

  const uploadFile = async () => {
    if (!file) return
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/storage/upload', {
        method: 'POST',
        body: formData,
      })
      if (res.ok) {
        toast.success('آپلود با موفقیت انجام شد')
        setFile(null)
        fetchFiles()
      } else {
        toast.error('خطا در آپلود فایل')
      }
    } catch {
      toast.error('خطای ارتباط با سرور')
    } finally {
      setLoading(false)
    }
  }

  const deleteFile = async (key) => {
    try {
      const res = await fetch('/api/storage/delete', {
        method: 'DELETE',
        body: JSON.stringify({ key }),
      })
      if (res.ok) {
        toast.success('فایل حذف شد')
        fetchFiles()
      } else {
        toast.error('خطا در حذف فایل')
      }
    } catch {
      toast.error('خطا در برقراری ارتباط')
    }
  }

  const downloadFile = async (key) => {
    try {
      const res = await fetch('/api/storage/presigned', {
        method: 'POST',
        body: JSON.stringify({ key }),
      })
      const data = await res.json()
      if (data.url) {
        window.open(data.url, '_blank')
      } else {
        toast.error('خطا در دریافت لینک دانلود')
      }
    } catch {
      toast.error('خطا در دریافت فایل')
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">مدیریت فایل‌ها</h1>

      <div className="flex gap-2">
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <Button onClick={uploadFile} disabled={loading || !file}>
          {loading ? 'در حال آپلود...' : 'آپلود فایل'}
        </Button>
      </div>

      <div className="space-y-3">
        {files.map((file) => (
          <Card key={file.Key} className="flex items-center justify-between">
            <CardContent className="flex-1 truncate">{file.Key}</CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" onClick={() => downloadFile(file.Key)}>
                دانلود
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteFile(file.Key)}
              >
                حذف
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
