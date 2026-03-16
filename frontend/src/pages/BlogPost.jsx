// src/pages/BlogPost.jsx
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('df_posts')
      const all = saved ? JSON.parse(saved) : []
      const found = all.find(p => p.slug === slug && p.published)
      if (!found) navigate('/blog')
      else setPost(found)
    } catch {
      navigate('/blog')
    }
  }, [slug, navigate])

  if (!post) return null

  return (
    <div className="bg-white min-h-screen">
      {post.coverImage && (
        <div className="w-full h-64 md:h-80 overflow-hidden">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/blog" className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 text-sm mb-8 transition-colors">
          ← Back to Blog
        </Link>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {(post.tags || []).map(tag => (
            <span key={tag} className="text-xs bg-emerald-50 border border-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">{post.title}</h1>

        <div className="flex items-center gap-3 mt-4 pb-6 border-b border-gray-100">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">DF</span>
          </div>
          <div>
            <p className="text-slate-800 text-sm font-semibold">DealFlow</p>
            <p className="text-slate-400 text-xs">{new Date(post.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none mt-8 text-slate-700 leading-relaxed whitespace-pre-wrap text-base">
          {post.content}
        </div>

        <div className="mt-14 border-t border-gray-100 pt-8 text-center">
          <p className="text-slate-500 text-sm mb-4">Need help with a digital service? We're on WhatsApp.</p>
          <a
            href="https://wa.me/254726899113"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
