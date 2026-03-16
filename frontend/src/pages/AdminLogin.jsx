// src/pages/AdminLogin.jsx — not linked in navbar, only accessible via /admin-login
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'dealflow@admin2025'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('df_admin') === '1') navigate('/admin-blog')
  }, [navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (password === ADMIN_PASS) {
        sessionStorage.setItem('df_admin', '1')
        navigate('/admin-blog')
      } else {
        setError('Incorrect password.')
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500 mb-4">
            <span className="text-white font-black text-lg">DF</span>
          </div>
          <h1 className="text-white font-bold text-xl">Admin Login</h1>
          <p className="text-slate-400 text-sm mt-1">DealFlow Blog Management</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="mb-5">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              placeholder="Enter admin password"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-emerald-400"
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Checking...' : 'Sign in'}
          </button>
        </form>

        <p className="text-slate-600 text-xs text-center mt-4">This page is not publicly listed.</p>
      </div>
    </div>
  )
}
