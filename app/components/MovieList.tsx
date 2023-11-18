'use client'
import React from 'react'
import MovieCard from './MovieCard'
import { getMovies } from '../actions/getMovies'
import { Movie } from '@prisma/client'

// export interface Movie {
//   _id: string
//   title: string
//   description: string
//   videoUrl: string
//   thumbnailUrl: string
//   genre: string
//   duration: string
//   type: string
// }

interface MovieListProps {
  title: string
  movies: Movie[]
}

const MovieList: React.FC<any> = ({ title, movies }) => {
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-6">
          {movies?.map((movie: Movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieList
