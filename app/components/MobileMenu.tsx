import Link from 'next/link'
import React from 'react'

interface MobileMenuProps {
  visible?: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null
  }
  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex flex-col border-2 border-gray-800">
      <div className="flex flex-col gap-4">
        <Link href="/" className="px-3 text-center text-white hover:underline">
          Home
        </Link>
        <Link
          href="/series"
          className="px-3 text-center text-white hover:underline">
          Series
        </Link>
        <Link
          href="/films"
          className="px-3 text-center text-white hover:underline">
          Films
        </Link>
        <Link
          href="/myList"
          className="px-3 text-center text-white hover:underline">
          My List
        </Link>
      </div>
    </div>
  )
}

export default MobileMenu
