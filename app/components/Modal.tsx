'use client'
import React from 'react'
import InfoModal from './InfoModal'
import useInfoModalStore from '@/Hooks/useInfoModalStore'



const Modal = () => {
  const { isOpen, closeModal } = useInfoModalStore()
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
    </>
  )
}

export default Modal
