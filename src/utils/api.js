export const API_KEY = '8c45d940c29c52dadfecdee11a498efe' // <-- replace this
export const API_BASE = 'https://api.themoviedb.org/3'
export const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

async function fetchTMDB(path, params = {}) {
  const url = new URL(API_BASE + path)
  url.searchParams.set('api_key', API_KEY)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`TMDB API error ${res.status}`)
  return res.json()
}

export const getPopular = (page = 1) => fetchTMDB('/movie/popular', {page})
export const getTopRated = (page = 1) => fetchTMDB('/movie/top_rated', {page})
export const getUpcoming = (page = 1) => fetchTMDB('/movie/upcoming', {page})
export const getMovieDetails = id => fetchTMDB(`/movie/${id}`)
export const getMovieCredits = id => fetchTMDB(`/movie/${id}/credits`)
export const searchMovies = (query, page = 1) =>
  fetchTMDB('/search/movie', {query, page})
