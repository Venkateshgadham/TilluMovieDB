import {useEffect, useState} from 'react'
import {getTopRated} from '../utils/api'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'

import './TopRated.css'

export default function TopRated() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)

    getTopRated(page)
      .then(data => {
        if (!mounted) return
        setMovies(data.results || [])
        setTotalPages(data.total_pages || 1)
      })
      .catch(err => {
        if (mounted) setError(err.message)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    // ✅ Fixed cleanup function — now compliant with ESLint
    return () => {
      mounted = false
    }
  }, [page])

  return (
    <div className="container">
      <h2 className="page-title">Top Rated Movies</h2>
      {loading ? (
        <div className="shimmer-grid" />
      ) : (
        <div className="grid fade-in">
          {movies.map(m => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
      {error && <div className="error">{error}</div>}
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  )
}
