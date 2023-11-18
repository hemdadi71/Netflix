import prismadb from '@/app/libs/prismadb'
export const getMoviesByType = async (type: string) => {
  const movies = await prismadb.movie.findMany({
    where: {
      type,
    },
  })

  return movies
}
