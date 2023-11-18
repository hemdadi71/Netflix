'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs'

interface PlayButtonProps {
  movieId: string
  setIsVisible?: any
  onClose?:any
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId, setIsVisible,onClose }) => {
  const router = useRouter()

  return (
    <button
      onClick={() => {
        router.push(`/watch/${movieId}`)
        setIsVisible(false)
        onClose()
      }}
      className="
        bg-white 
        rounded-md 
        py-1 md:py-2 
        px-2 md:px-4
        w-auto 
        text-xs lg:text-lg 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        ">
      <BsFillPlayFill className="w-4 md:w-7 text-black mr-1" />
      Play
    </button>
  )
}

export default PlayButton
