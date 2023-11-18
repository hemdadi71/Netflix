import React from 'react'
import { getMoviesByType } from '../actions/getMoviesByType'
import MovieList from '../components/MovieList'

const Series = async () => {
  const films = await getMoviesByType('series')
  return (
    <div className="pt-24">
      <MovieList movies={films} title="Series" />
    </div>
  )
}

export default Series
