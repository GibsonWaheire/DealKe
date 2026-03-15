// src/pages/NotFound.jsx
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

export default function NotFound() {
  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-zinc-200 leading-none select-none">404</p>
        <h1 className="text-2xl font-semibold text-zinc-800 mt-4">Page not found</h1>
        <p className="text-zinc-500 mt-2 text-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium h-auto py-2.5 px-6 rounded-lg">
            <Link to="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" className="border border-zinc-300 text-zinc-700 hover:bg-zinc-50 h-auto py-2.5 px-6 rounded-lg">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
