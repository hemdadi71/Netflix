'use client'
import useInfoModalStore from '@/Hooks/useInfoModalStore'
import React, { useCallback } from 'react'
import { BsInfoCircle } from 'react-icons/bs'

interface InfoButtonProps {
  id: string
}

const InfoButton: React.FC<InfoButtonProps> = ({ id }) => {
  const { openModal } = useInfoModalStore()
  const handleOpenModal = useCallback(() => {
    openModal(id)
  }, [openModal, id])
  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-white
text-white
  bg-opacity-30 
  rounded-md 
  py-1 md:py-2 
  px-2 md:px-4
  w-auto 
  text-xs lg:text-lg 
  font-semibold
  flex
  flex-row
  items-center
  hover:bg-opacity-20
  transition">
        <BsInfoCircle className="w-4 md:w-7 mr-1" />
        More Info
      </button>
    </>
  )
}

export default InfoButton
