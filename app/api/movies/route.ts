import prismadb from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { inputValue } = body
    const movies = await prismadb.movie.findMany()
    const results = movies.filter(movie =>
      movie.title?.toLowerCase()?.startsWith(inputValue.toLowerCase())||
      movie.genre?.toLowerCase()?.startsWith(inputValue.toLowerCase())
    )
    return NextResponse.json(results)
  } catch (error) {
    console.log(error, 'REGISTRATION_ERROR')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
