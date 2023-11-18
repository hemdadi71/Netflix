'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { FcLock } from 'react-icons/fc'

const UserRole = () => {
  const router = useRouter()
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.back()
    }, 2000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [router])
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 md:text-2xl text-md text-white">
      <p>This Page Is Secured</p>
      <FcLock size={60} />
    </div>
  )
}

export default UserRole
