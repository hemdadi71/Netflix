'use client'
import Image from 'next/image'
import React from 'react'

interface SpinnerProps {
  className?: string
  width: number
  height: number
}

const Spinner = ({ className, width, height }: SpinnerProps) => {
  return (
    <Image
      src={'/images/spinner.svg'}
      width={width}
      height={height}
      alt="spinner"
      className={className}
    />
  )
}

export default Spinner
