'use client'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import React from 'react'

const SignOut = () => {
  const router = useRouter()
  return (
    <div
      onClick={() => {
        signOut()
        const URL = process.env.NEXT_PUBLIC_NEXTAUTH_UR || ''
        router.push(URL)
      }}
      className="px-3 text-white text-sm hover:underline text-center">
      Sign out of NetFlix
    </div>
  )
}

export default SignOut
