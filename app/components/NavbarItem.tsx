import Link from 'next/link'
import React from 'react'

interface NavbarItemProps {
  label: string
  href: string
  pathName: string
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, href, pathName }) => {
  const isActive = pathName === href
  return (
    <Link
      href={href}
      className={`text-white cursor-pointer hover:text-gray-300 transition py-2 backdrop-blur-md px-5 rounded-md hover:bg-opacity-70 ${
        isActive ? 'bg-red-600  bg-opacity-60' : 'bg-neutral-400  bg-opacity-40 '
      }`}>
      {label}
    </Link>
  )
}

export default NavbarItem
