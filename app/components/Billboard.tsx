import React from 'react'

import { getMovie } from '../actions/getMovie'
import PlayButton from './PlayButton'
import Modal from './Modal'
import InfoButton from './InfoButton'

const Billboard = async () => {
  const movie = await getMovie()
  return (
    <>
      <div className="relative md:h-[56.25vw] xl:h-fit w-full">
        <video
          className="w-full md:h-[56.25vw] 2xl:h-[40vw] object-cover brightness-[60%]"
          poster={movie?.thumbnailUrl}
          src={movie?.videoUrl}
          autoPlay
          muted
          loop
        />
        <div className="absolute top-[30%] md:top-[40%] xl:top-[30%] ml-4 md:ml-16">
          <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
            {movie?.title}
          </p>
          <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
            {movie?.description}
          </p>
          <div className="flex items-center mt-3 md:mt-4 gap-3">
            <PlayButton movieId={movie?.id} />
            <InfoButton id={movie?.id} />
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Billboard
