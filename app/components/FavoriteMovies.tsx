'use client'
import MovieList from './MovieList'
import useFavorites from '@/Hooks/useFavorites'
import Spinner from './Spinners'



const FavoriteMovies = () => {
  const { data: favorites, isLoading } = useFavorites()
  return (
    <>
      {isLoading ? (
        <Spinner className="w-10 h-10" />
      ) : (
        <MovieList
          title={`${
            favorites.length
              ? `Favorite list : ${favorites.length}`
              : 'Your favorite list is empty'
          }`}
          movies={favorites}
        />
      )}
    </>
  )
}

export default FavoriteMovies
