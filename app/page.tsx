import SignOut from './components/SignOut'
import getCurrentUser from './actions/getCurrentUser'
import Navbar from './components/Navbar'
import Billboard from './components/Billboard'
import MovieList from './components/MovieList'
import { getFavoriteMovie } from './actions/getFavoritesMovie'
import { getMovies } from './actions/getMovies'
import FavoriteMovies from './components/FavoriteMovies'

export default async function Home() {
  const movies = await getMovies()
  return (
    <>
      <Billboard />
      <div className="pb-40">
        <MovieList movies={movies} title="Trending Now" />
      </div>
    </>
  )
}
