import bcrypt from 'bcrypt'
import prismadb from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { without } from 'lodash'
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { movieId } = body
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return new NextResponse('User not found', { status: 402 })
    }
    if (!movieId) {
      return new NextResponse('Missing info', { status: 400 })
    }
    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    })
    if (!existingMovie) {
      return new NextResponse('Invalid ID', { status: 422 })
    }
    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    })
    return NextResponse.json(user)
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
export async function DELETE(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const { movieId } = body
    if (!currentUser) {
      return new NextResponse('User not found', { status: 402 })
    }
    if (!movieId) {
      return new NextResponse('Missing info', { status: 400 })
    }
    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    })
    if (!existingMovie) {
      return new NextResponse('Invalid ID', { status: 422 })
    }
    const UpdatedFavoriteIds = without(currentUser.favoriteIds, movieId)
    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: {
        favoriteIds: UpdatedFavoriteIds,
      },
    })
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR')
    return new NextResponse('Internal Error', { status: 500 })
  }
}



export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    const favoriteMovie = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    })
    return NextResponse.json(favoriteMovie)
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
