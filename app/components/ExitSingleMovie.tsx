'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const ExitSingleMovie = () => {
  const router = useRouter()
  return (
    <AiOutlineArrowLeft
      size={40}
      onClick={() => router.back()}
      className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition"
    />
  )
}

export default ExitSingleMovie
