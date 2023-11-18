import prismadb from '@/app/libs/prismadb'
export const getMovie = async () => {
  const movieCount = await prismadb.movie.count()
  const randomIndex = Math.floor(Math.random() * movieCount)
  const randomMovies = await prismadb.movie.findMany({
    take: 1,
    skip: randomIndex,
  })
  return randomMovies[0]
}
