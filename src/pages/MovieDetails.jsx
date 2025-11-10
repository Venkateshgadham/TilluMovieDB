import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getMovieDetails, getMovieCredits, IMG_BASE} from '../utils/api'
import './MovieDetails.css'

export default function MovieDetails() {
  const {id} = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)

    Promise.all([getMovieDetails(id), getMovieCredits(id)])
      .then(([details, credits]) => {
        if (!mounted) return
        setMovie(details)
        setCast(credits.cast || [])
      })
      .catch(err => {
        if (mounted) setError(err.message)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [id])

  if (loading)
    return (
      <div className="container">
        <div className="shimmer-hero" />
      </div>
    )

  if (error)
    return (
      <div className="container">
        <div className="error">{error}</div>
      </div>
    )

  if (!movie) return null

  const backgroundImageUrl = movie.backdrop_path
    ? `${IMG_BASE}${movie.backdrop_path}`
    : `${IMG_BASE}${movie.poster_path}`

  return (
    <div className="container details-page">
      <section className="movie-hero">
        <div
          className="hero-poster"
          style={{backgroundImage: `url(${backgroundImageUrl})`}}
        >
          <div className="hero-grad">
            <div className="hero-info">
              <h1 className="hero-title">{movie.title}</h1>
              <div className="hero-meta">
                ⭐ {movie.vote_average} • {movie.release_date} •{' '}
                {movie.runtime ? `${movie.runtime} min` : ''}
              </div>
              <p className="hero-overview">{movie.overview}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cast-section">
        <h3>Cast</h3>
        <div className="cast-grid">
          {cast.slice(0, 24).map(c => (
            <div className="cast-card" key={c.credit_id || c.cast_id}>
              <img
                src={
                  c.profile_path
                    ? `${IMG_BASE}${c.profile_path}`
                    : '/no-poster.png'
                }
                alt={c.name}
              />
              <div className="cast-info">
                <div className="cast-name">{c.original_name}</div>
                <div className="cast-role small">as {c.character}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
