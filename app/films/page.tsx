import React from 'react'
import MovieCard from '../components/MovieCard'
import { getMoviesByType } from '../actions/getMoviesByType'
import { getMovies } from '../actions/getMovies'
import MovieList from '../components/MovieList'

const Films = async () => {
  const films = await getMoviesByType('film')

  return (
    <div className="pt-24">
      <MovieList movies={films} title="Films" />
    </div>
  )
}

export default Films
