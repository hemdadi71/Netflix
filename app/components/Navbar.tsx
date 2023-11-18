'use client'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import NavbarItem from './NavbarItem'
import { BsBell, BsChevronDown, BsSearch } from 'react-icons/bs'
import MobileMenu from './MobileMenu'
import AccountMenu from './AccountMenu'
import { User } from './DefaultAvatar'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import useCurrentUser from '@/Hooks/useCurrentUser'

interface NavbarProps {
  currentUser?: User
}

const TOP_OFFSET = 66

const Navbar: React.FC<NavbarProps> = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showBackground, setShowBackground] = useState(false)
  const router = useRouter()
  const { data: currentUser } = useCurrentUser()
  const pathName = usePathname()
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathName])
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(!showMobileMenu)
  }, [showMobileMenu])
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu(!showAccountMenu)
  }, [showAccountMenu])
  return (
    <nav
      className={`w-full fixed z-30 ${
        pathName.includes('watch') ||
        pathName.includes('auth') ||
        pathName.includes('profiles')
          ? 'hidden'
          : 'block'
      }`}>
      <div
        className={`px-4 md:px-16 py-6 flex items-center transition duration-500  ${
          showBackground ? 'bg-zinc-900 bg-opacity-90' : ''
        } ${pathName === '/admin' && 'bg-zinc-900 bg-opacity-40'}`}>
        <div
          onClick={() => router.push('/')}
          className="h-4 lg:h-7 relative w-24 cursor-pointer">
          <Image src="/images/logo.png" fill alt="logo" />
        </div>
        <div className="ml-8 gap-7 hidden lg:flex">
          <NavbarItem pathName={pathName} href="/" label="Home" />
          <NavbarItem pathName={pathName} href="/series" label="Series" />
          <NavbarItem pathName={pathName} href="/films" label="Films" />
          <NavbarItem pathName={pathName} href="/myList" label="My Favorites" />
          {currentUser?.role === 'admin' && (
            <NavbarItem pathName={pathName} href="/admin" label="Admin" />
          )}
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition duration-300 ${
              showMobileMenu ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex ml-auto gap-7 items-center">
          <Link
            href="/search"
            className={` hover:text-gray-300 cursor-pointer transition ${
              pathName === '/search' ? 'text-red-600' : 'text-gray-200'
            }`}>
            {/* <div className='sm:text-[50px] md:text-[500px]'> */}
            <BsSearch className="sm:text-[20px] md:text-[30px]" />
            {/* </div> */}
          </Link>
          <div
            onClick={toggleAccountMenu}
            className="flex items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden relative">
              <Image src="/images/default-blue.png" fill alt="avatar" />
            </div>
            <BsChevronDown
              className={`text-white transition duration-300 ${
                showAccountMenu ? 'rotate-180' : 'rotate-0'
              }`}
            />
            <AccountMenu visible={showAccountMenu} currentUser={currentUser} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
