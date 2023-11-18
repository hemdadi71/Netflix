'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { TbError404 } from 'react-icons/tb'
const NotFound = () => {
  const router = useRouter()
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.back()
    }, 3000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [router])
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-white text-2xl">
      <p>Page Not Found</p>
      <TbError404 size={60} />
    </div>
  )
}

export default NotFound
