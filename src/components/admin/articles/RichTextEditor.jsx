'use client'

import { Mark, mergeAttributes } from '@tiptap/core'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import { FiImage, FiLink } from 'react-icons/fi'

const InlineHeading = Mark.create({
  name: 'inlineHeading',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      level: {
        default: 1,
      },
    }
  },

  parseHTML() {
    return [{ tag: 'span[data-heading]' }]
  },

  renderHTML({ mark, HTMLAttributes }) {
    const level = mark?.attrs?.level || 1
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-heading': level,
        class: `inline-h${level}`,
      }),
      0,
    ]
  },

  addCommands() {
    return {
      toggleInlineHeading:
        (level) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, { level })
        },
    }
  },
})

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit, InlineHeading, Link, Underline, Image],
    content: value || '<p></p>',
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  // همگام‌سازی مقدار بیرونی با ادیتور
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '')
    }
  }, [value])

  if (!editor) return <div>در حال بارگذاری ادیتور...</div>

  // ✅ تابع بهینه برای هدینگ‌ها
  const applyHeading = (level) => {
    const isHeading = editor.isActive('heading', { level })
    const chain = editor.chain().focus()

    if (isHeading) {
      // اگر از قبل heading بود → برگردون به پاراگراف
      chain.setParagraph().run()
    } else {
      chain.setNode('heading', { level }).run()
    }
  }

  // افزودن لینک
  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href || ''
    const url = prompt('URL لینک:', previousUrl)
    if (url === null) return

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    if (editor.state.selection.empty) {
      editor.chain().focus().insertContent(`<a href="${url}">${url}</a>`).run()
    } else {
      const { from, to } = editor.state.selection
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .insertContentAt(
          { from, to },
          `<a href="${url}">${editor.state.doc.textBetween(from, to)}</a>`
        )
        .run()
    }
  }

  // افزودن تصویر
  const addImage = () => {
    const url = prompt('URL تصویر:')
    if (!url) return
    const alt = prompt('Alt تصویر (اختیاری):') || ''
    editor.chain().focus().setImage({ src: url, alt }).run()
  }

  return (
    <div className="border border-lightgray rounded-lg p-2 min-h-[300px]">
      {/* --- Toolbar --- */}
      <div className="flex flex-wrap gap-2 mb-2">
        {/* هدینگ‌ها */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleInlineHeading(1).run()}
          className={`w-8 h-8 border rounded ${
            editor.isActive('inlineHeading', { 'data-heading': 1 })
              ? 'bg-gray-200'
              : ''
          }`}
        >
          H1
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleInlineHeading(2).run()}
          className={`w-8 h-8 border rounded ${
            editor.isActive('inlineHeading', { 'data-heading': 2 })
              ? 'bg-gray-200'
              : ''
          }`}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleInlineHeading(3).run()}
          className={`w-8 h-8 border rounded ${
            editor.isActive('inlineHeading', { 'data-heading': 3 })
              ? 'bg-gray-200'
              : ''
          }`}
        >
          H3
        </button>

        {/* پاراگراف */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`w-8 h-8 border rounded ${
            editor.isActive('paragraph') ? 'bg-gray-200' : ''
          }`}
        >
          P
        </button>

        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`flex items-center justify-center w-8 h-8 border rounded cursor-pointer text-gray hover:text-dark transition-all duration-300 ${
            editor.isActive('bold') ? 'bg-gray-200' : ''
          }`}
        >
          B
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`flex items-center justify-center w-8 h-8 border rounded cursor-pointer text-gray hover:text-dark transition-all duration-300 ${
            editor.isActive('italic') ? 'bg-gray-200' : ''
          }`}
        >
          I
        </button>

        {/* Underline */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`flex items-center justify-center w-8 h-8 border rounded cursor-pointer text-gray hover:text-dark transition-all duration-300 ${
            editor.isActive('underline') ? 'bg-gray-200' : ''
          }`}
        >
          U
        </button>

        {/* لیست‌ها */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`flex items-center justify-center w-8 h-8 border rounded cursor-pointer text-gray hover:text-dark transition-all duration-300 ${
            editor.isActive('bulletList') ? 'bg-gray-200' : ''
          }`}
        >
          UL
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`flex items-center justify-center w-8 h-8 border rounded cursor-pointer text-gray hover:text-dark transition-all duration-300 ${
            editor.isActive('orderedList') ? 'bg-gray-200' : ''
          }`}
        >
          OL
        </button>

        {/* Blockquote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`flex items-center justify-center w-8 h-8 border rounded cursor-pointer text-gray hover:text-dark transition-all duration-300 ${
            editor.isActive('blockquote') ? 'bg-gray-200' : ''
          }`}
        >
          ❝
        </button>

        {/* لینک */}
        <button
          type="button"
          onClick={addLink}
          className={`flex items-center justify-center w-8 h-8 border rounded cursor-pointer text-gray hover:text-dark transition-all duration-300 ${
            editor.isActive('link') ? 'bg-gray-200' : ''
          }`}
        >
          <FiLink />
        </button>

        {/* تصویر */}
        <button
          type="button"
          onClick={addImage}
          className="flex items-center justify-center w-8 h-8 border rounded cursor-pointer text-gray hover:text-dark transition-all duration-300"
        >
          <FiImage />
        </button>
      </div>

      {/* --- Editor Content --- */}
      <EditorContent editor={editor} className="min-h-[250px] px-2" />
    </div>
  )
}
