import { revalidateTag } from 'next/cache'
import getCurrentUser from './getCurrentUser'
import prismadb from '@/app/libs/prismadb'


export const getFavoriteMovie = async () => {
  const currentUser = await getCurrentUser()
  const favoriteMovie = await prismadb.movie.findMany({
    where: {
      id: {
        in: currentUser?.favoriteIds,
      },
    },
  })
  return favoriteMovie
}
