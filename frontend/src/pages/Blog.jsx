// src/pages/Blog.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const headerImages = [
  { src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1600&q=80', alt: 'Blog' },
]

export default function Blog() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('df_posts')
      const all = saved ? JSON.parse(saved) : []
      setPosts(all.filter(p => p.published).sort((a, b) => new Date(b.date) - new Date(a.date)))
    } catch {
      setPosts([])
    }
  }, [])

  return (
    <div className="bg-white">
      <PageHeader
        label="Blog"
        title="Tips, guides & updates"
        subtitle="Business insights, tech tips and DealFlow news"
        images={headerImages}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">✍️</p>
              <h2 className="text-xl font-bold text-slate-900 mb-2">No posts yet</h2>
              <p className="text-slate-500 text-sm">Check back soon — articles are on the way.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  {post.coverImage && (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-44 object-cover"
                      loading="lazy"
                    />
                  )}
                  {!post.coverImage && (
                    <div className="w-full h-44 bg-gradient-to-br from-emerald-50 to-slate-100 flex items-center justify-center">
                      <span className="text-4xl">📝</span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {(post.tags || []).slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs bg-slate-50 border border-gray-100 text-slate-500 px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-600 transition-colors">{post.title}</h3>
                    {post.excerpt && <p className="text-slate-500 text-sm mt-2 line-clamp-2">{post.excerpt}</p>}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xs text-slate-400">{new Date(post.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span className="text-xs font-semibold text-emerald-600">Read more →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
