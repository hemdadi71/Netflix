import prismadb from '@/app/libs/prismadb'
export const getMovies = async () => {
  const movies = await prismadb.movie.findMany()
  
  return movies
}
