'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export interface User {
  id: string
  name: string
  image: string | null
  email: string | null
  emailVerified: Date | null
  hashedPassword: string | null
  createdAt: Date
  updatedAt: Date
  favoriteIds: string[]
  role: string
}

interface DefaultAvatarProps {
  currentUser: User
}

const DefaultAvatar: React.FC<DefaultAvatarProps> = ({ currentUser }) => {
  const { name } = currentUser
  const router = useRouter()
  return (
    <div onClick={() => router.push('/')}>
      <div className="group flex flex-col items-center w-44 mx-auto">
        <div className="w-44 h-44 rounded-md relative flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
          <Image src="/images/default-blue.png" fill alt="avatar" />
        </div>
        <div className="mt-4 text-gray-400 text-2xl group-hover:text-white text-center">
          {name}
        </div>
      </div>
    </div>
  )
}

export default DefaultAvatar
