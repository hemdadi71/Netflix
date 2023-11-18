
import getSession from './getSession'
import prismadb from '@/app/libs/prismadb'
const getCurrentUser = async () => {
  const session = await getSession()
  const sessionEmail = session?.user?.email
  if (!sessionEmail) {
    return null
  }
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: sessionEmail,
    },
  })
  return currentUser
}

export default getCurrentUser
