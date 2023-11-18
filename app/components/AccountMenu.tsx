import { signOut } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import SignOut from './SignOut'
import getSession from '../actions/getSession'
import { User } from './DefaultAvatar'
import useCurrentUser from '@/Hooks/useCurrentUser'

interface AccountMenuProps {
  visible?: boolean
  currentUser?: any
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible, currentUser }) => {
  if (!visible) {
    return null
  }
  return (
    <div className="bg-black w-56 top-14 right-0 py-3 flex flex-col border-2 border-gray-800 absolute">
      <div className="flex flex-col">
        <div className="px-3 group/item flex gap-3 items-center w-full">
          <Image
            className="rounded-md"
            src="/images/default-blue.png"
            width={32}
            height={32}
            alt="avatar"
          />
          <p className="text-white text-sm group-hover/item:underline">
            {currentUser?.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <SignOut />
      </div>
    </div>
  )
}

export default AccountMenu
