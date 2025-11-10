import {Link, useNavigate, useLocation} from 'react-router-dom'
import {useState} from 'react'

import './NavBar.css'

export default function NavBar() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  function onSubmit(e) {
    e.preventDefault()
    const trimmed = q.trim()
    if (!trimmed) return
    navigate(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <header className="nav-root">
      <div className="nav-left">
        <Link to="/" className="brand">
          <span className="logo-blob" />
          <span className="brand-text">TilluMovieDB</span>
        </Link>
        <nav className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Popular
          </Link>
          <Link
            to="/top-rated"
            className={location.pathname === '/top-rated' ? 'active' : ''}
          >
            Top Rated
          </Link>
          <Link
            to="/upcoming"
            className={location.pathname === '/upcoming' ? 'active' : ''}
          >
            Upcoming
          </Link>
        </nav>
      </div>

      <form className="nav-search" onSubmit={onSubmit}>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search movies, actors..."
          aria-label="Search movies"
        />
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
    </header>
  )
}
