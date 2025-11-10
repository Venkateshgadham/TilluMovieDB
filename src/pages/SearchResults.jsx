import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {searchMovies} from '../utils/api'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'

import './SearchResults.css'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function SearchResults() {
  const q = useQuery().get('q') || ''
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!q) {
      return undefined // 👈 ensures consistent return
    }

    let mounted = true
    setLoading(true)

    searchMovies(q, page)
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

    return () => {
      mounted = false // 👈 proper cleanup, no implicit return
    }
  }, [q, page])

  if (!q)
    return (
      <div className="container">
        <p className="small">Start a search using the search bar.</p>
      </div>
    )

  return (
    <div className="container">
      <h2 className="page-title">Search results for “{q}”</h2>
      {loading ? (
        <div className="shimmer-grid" />
      ) : (
        <div className="grid">
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
