import prismadb from '@/app/libs/prismadb'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      description,
      title,
      videoUrl,
      thumbnailUrl,
      genre,
      duration,
      type,
    } = body

    if (
      !title ||
      !description ||
      !videoUrl ||
      !thumbnailUrl ||
      !genre ||
      !type ||
      !duration
    ) {
      return new NextResponse('Missing info', { status: 400 })
    }
    const existingMovie = await prismadb.movie.findUnique({
      where: {
        title,
      },
    })

    if (existingMovie) {
      return new NextResponse('Email taken', { status: 422 })
    }
    const movie = await prismadb.movie.create({
      data: {
        type,
        title,
        description,
        videoUrl,
        thumbnailUrl,
        genre,
        duration,
      },
    })
    revalidatePath('/')
    return NextResponse.json(movie)
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
