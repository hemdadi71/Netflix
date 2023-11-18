import prismadb from '@/app/libs/prismadb'
export const getSingleMovie = async (id: string) => {
  const movie = await prismadb.movie.findUnique({
    where: {
      id,
    },
  })
  return movie
}
