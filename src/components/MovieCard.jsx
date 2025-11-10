import {Link} from 'react-router-dom'
import {IMG_BASE} from '../utils/api'

import './MovieCard.css'

export default function MovieCard({movie}) {
  const poster = movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null
  return (
    <article className="movie-card">
      <div className="poster-wrap">
        <img
          src={poster || '/no-poster.png'}
          alt={movie.title}
          className="poster"
        />
        <div className="poster-overlay">
          <div className="rating">⭐ {movie.vote_average ?? '-'}</div>
          <Link to={`/movie/${movie.id}`} className="details-btn">
            View Details
          </Link>
        </div>
      </div>
      <h4 className="movie-title">{movie.title}</h4>
    </article>
  )
}
