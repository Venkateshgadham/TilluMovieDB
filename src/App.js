import {Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Popular from './pages/Popular'
import TopRated from './pages/TopRated'
import Upcoming from './pages/Upcoming'
import SearchResults from './pages/SearchResults'
import MovieDetails from './pages/MovieDetails'

export default function App() {
  return (
    <div className="app-root">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Popular />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route
            path="*"
            element={
              <div className="container">
                <h2>404 - Not Found</h2>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  )
}
