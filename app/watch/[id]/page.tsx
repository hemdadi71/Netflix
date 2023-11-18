import { getSingleMovie } from '@/app/actions/getSingleMovie'
import ExitSingleMovie from '@/app/components/ExitSingleMovie'
import React from 'react'

interface SingleMovieProps {
  params: {
    id: string
  }
}

const SingleMovie: React.FC<SingleMovieProps> = async ({ params }) => {
  const data = await getSingleMovie(params.id)
  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <ExitSingleMovie />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>
      <video
        className="h-full w-full"
        autoPlay
        controls
        src={data?.videoUrl}></video>
    </div>
  )
}

export default SingleMovie
