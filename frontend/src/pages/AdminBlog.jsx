// src/pages/AdminBlog.jsx — admin blog management
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const emptyForm = { title: '', excerpt: '', content: '', tags: '', coverImage: '', published: true }

export default function AdminBlog() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState(null) // post id being edited
  const [view, setView] = useState('list') // 'list' | 'new' | 'edit'

  useEffect(() => {
    if (sessionStorage.getItem('df_admin') !== '1') { navigate('/admin-login'); return }
    try {
      const saved = localStorage.getItem('df_posts')
      setPosts(saved ? JSON.parse(saved) : [])
    } catch { setPosts([]) }
  }, [navigate])

  const savePosts = (updated) => {
    setPosts(updated)
    localStorage.setItem('df_posts', JSON.stringify(updated))
  }

  const handleSave = () => {
    if (!form.title.trim() || !form.content.trim()) return
    if (editing) {
      savePosts(posts.map(p => p.id === editing ? {
        ...p, ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean), date: p.date
      } : p))
    } else {
      const newPost = {
        id: Date.now().toString(),
        slug: slugify(form.title),
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        date: new Date().toISOString(),
        author: 'DealFlow',
      }
      savePosts([newPost, ...posts])
    }
    setForm(emptyForm); setEditing(null); setView('list')
  }

  const handleEdit = (post) => {
    setForm({ ...post, tags: (post.tags || []).join(', ') })
    setEditing(post.id)
    setView('edit')
  }

  const handleDelete = (id) => {
    if (!window.confirm('Delete this post?')) return
    savePosts(posts.filter(p => p.id !== id))
  }

  const togglePublish = (id) => {
    savePosts(posts.map(p => p.id === id ? { ...p, published: !p.published } : p))
  }

  const logout = () => { sessionStorage.removeItem('df_admin'); navigate('/admin-login') }

  const FormView = () => (
    <div className="max-w-2xl">
      <h2 className="text-lg font-bold text-slate-900 mb-6">{editing ? 'Edit Post' : 'New Post'}</h2>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Title *</label>
          <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))}
            placeholder="Post title" className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Excerpt</label>
          <input value={form.excerpt} onChange={e => setForm(f => ({...f, excerpt: e.target.value}))}
            placeholder="Short description shown in blog listing" className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Content *</label>
          <textarea value={form.content} onChange={e => setForm(f => ({...f, content: e.target.value}))}
            placeholder="Write your post content here..." rows={12}
            className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400 resize-y" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Cover Image URL</label>
          <input value={form.coverImage} onChange={e => setForm(f => ({...f, coverImage: e.target.value}))}
            placeholder="https://..." className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Tags (comma-separated)</label>
          <input value={form.tags} onChange={e => setForm(f => ({...f, tags: e.target.value}))}
            placeholder="KRA, Business, Tech" className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="pub" checked={form.published} onChange={e => setForm(f => ({...f, published: e.target.checked}))} className="w-4 h-4 accent-emerald-500" />
          <label htmlFor="pub" className="text-sm text-slate-700">Publish immediately</label>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={handleSave} disabled={!form.title || !form.content}
            className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm">
            {editing ? 'Save changes' : 'Publish post'}
          </button>
          <button onClick={() => { setForm(emptyForm); setEditing(null); setView('list') }}
            className="border border-gray-200 text-slate-600 hover:bg-slate-50 px-6 py-2.5 rounded-lg text-sm transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-slate-900 font-bold text-lg">DealFlow Admin</span>
            <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">Blog</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/blog" target="_blank" className="text-slate-500 hover:text-slate-900 text-sm transition-colors">View Blog →</a>
            <button onClick={logout} className="text-slate-500 hover:text-red-600 text-sm transition-colors">Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {view === 'list' ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
                <p className="text-slate-500 text-sm mt-1">{posts.length} post{posts.length !== 1 ? 's' : ''} total</p>
              </div>
              <button onClick={() => { setForm(emptyForm); setEditing(null); setView('new') }}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
                + New Post
              </button>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl">
                <p className="text-4xl mb-3">✍️</p>
                <p className="text-slate-700 font-semibold">No posts yet</p>
                <p className="text-slate-400 text-sm mt-1">Click "New Post" to write your first article.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {posts.sort((a,b) => new Date(b.date)-new Date(a.date)).map(post => (
                  <div key={post.id} className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-900 font-semibold text-sm truncate">{post.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-xs font-semibold ${post.published ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {post.published ? '● Published' : '○ Draft'}
                        </span>
                        <span className="text-slate-400 text-xs">{new Date(post.date).toLocaleDateString('en-KE')}</span>
                        {(post.tags || []).slice(0,2).map(t => (
                          <span key={t} className="text-xs bg-slate-50 border border-gray-100 text-slate-500 px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => togglePublish(post.id)}
                        className="text-xs border border-gray-200 text-slate-600 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors">
                        {post.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button onClick={() => handleEdit(post)}
                        className="text-xs border border-gray-200 text-slate-600 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(post.id)}
                        className="text-xs border border-red-100 text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <FormView />
        )}
      </div>
    </div>
  )
}
