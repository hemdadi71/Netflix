'use client'
import React, { useCallback } from 'react'
import useInfoModalStore from '@/Hooks/useInfoModalStore'
import Image from 'next/image'
import {
  IoChevronDownCircleOutline,
  IoPlayCircleOutline,
} from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { BsFillPlayFill } from 'react-icons/bs'
import FavoriteButton from './favoriteButton'
import { BsInfoLg } from 'react-icons/bs'
interface MovieCardProps {
  data: Record<string, any>
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter()
  const { openModal } = useInfoModalStore()

  const redirectToWatch = useCallback(
    () => router.push(`/watch/${data.id}`),
    [router, data.id]
  )

  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <div className="relative w-full h-[12vw]">
        <Image
          onClick={redirectToWatch}
          src={data.thumbnailUrl}
          alt="Movie"
          fill
          draggable={false}
          className="
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-md
        group-hover:opacity-90
        sm:group-hover:opacity-0
        delay-300
      "
        />
      </div>
      <div
        className="
        opacity-0
        absolute
        top-0
        transition
        duration-200
        z-40
        invisible
        sm:visible
        delay-300
        w-full
        scale-0
        group-hover:scale-110
        group-hover:-translate-y-[6vw]
        group-hover:translate-x-[2vw]
        group-hover:opacity-100
      ">
        <div className="relative w-full h-[12vw]">
          <Image
            onClick={redirectToWatch}
            src={data.thumbnailUrl}
            alt="Movie"
            fill
            draggable={false}
            className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-t-md
        "
          />
        </div>
        <div
          className="
          z-10
          bg-zinc-800
          p-2
          lg:p-4
          absolute
          w-full
          transition
          shadow-md
          rounded-b-md
          ">
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={redirectToWatch}
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
              <BsFillPlayFill size={30} className="text-black w-4 lg:w-6" />
            </div>
            <FavoriteButton movieId={data.id} />
            <div
              onClick={() => openModal(data?.id)}
              className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition-all duration-200 ease-in-out hover:bg-white hover:border-neutral-300">
              <BsInfoLg
                size={30}
                className="text-white group-hover/item:text-gray-800 w-4 lg:w-6"
              />
            </div>
          </div>
          <p className="text-green-400 md:text-xl text-md font-semibold mt-4">
            {data.title}
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
          </div>
          <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
            <p>{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
