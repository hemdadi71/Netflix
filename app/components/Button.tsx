'use client'
import clsx from 'clsx'
import Spinner from './Spinner'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined

  children?: React.ReactNode

  disabled?: boolean
  isLoading?: boolean
  className?: string
}
const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  disabled,
  type,
  className,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`bg-red-600 py-3 relative text-white flex justify-center items-center rounded-md w-full hover:bg-red-700 transition ${className}`}>
      {children}
      {isLoading && (
        <Spinner width={40} height={40} className="absolute right-[105px]" />
      )}
    </button>
  )
}

export default Button
