import BlogClient from '@/components/blog/BlogClient'
import connectDB from '@/lib/db'
import Article from '@/models/Article'

export default async function BlogPage() {
  await connectDB()
  const blogs = JSON.parse(JSON.stringify(await Article.find()))

  return <BlogClient blogs={blogs} />
}

{
  // برای استفاده در سرور
  // import createDOMPurify from 'isomorphic-dompurify'
  // import { JSDOM } from 'jsdom'
  // const window = new JSDOM('').window
  // const DOMPurify = createDOMPurify(window)
  /* <div className="flex flex-col gap-8">
        {blogs.map((blog) => (
          <section key={blog._id} className="border p-4 rounded-md shadow-sm">
            {blog.coverImage && (
              <Image
                src={blog.coverImage}
                alt={blog.title}
                width={400}
                height={400}
                className="rounded-md object-cover"
              />
            )}

            <h2 className="text-2xl font-semibold mt-4">{blog.title}</h2>
            <p className="text-gray-600 my-2">{blog.description}</p>

            <div
              className="prose max-w-none mt-2 prose-a:text-blue-600 prose-a:underline"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content),
              }}
            />

            <div className="flex gap-2 mt-4 flex-wrap">
              {blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div> */
}
