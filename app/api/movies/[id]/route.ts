import getCurrentUser from '@/app/actions/getCurrentUser'
import prismadb from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const movies = await prismadb.movie.findUnique({
      where: {
        id,
      },
    })
    return NextResponse.json(movies)
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
