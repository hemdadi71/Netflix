'use client'
import React from 'react'
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form'

interface InputProps {
  id: string
  label: string
  type?: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  disabled?: boolean
  pattern: RegExp
  text: string
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  register,
  required,
  pattern,
  text,
  errors,
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        disabled={disabled}
        {...register(id, {
          required,
          pattern: {
            value: pattern,
            message: text,
          },
        })}
        className="
        block
        rounded-md
        px-6
        pt-6
        pb-1
        w-full
        text-md
      text-white
      bg-neutral-700
        appearance-none
        focus:outline-none
        focus:ring-0
        peer
        invalid:border-b-1
        "
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="
        absolute 
        text-md
      text-zinc-400
        duration-150 
        transform 
        -translate-y-3 
        scale-75 
        top-4 
        z-10 
        origin-[0] 
        left-6
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-3
      ">
        {label}
      </label>
      {errors[id] && (
        <p className="text-red-500 text-sm font-semibold pl-2 mt-1">
          {errors[id]?.type === 'required' ? 'This field is required' : text}
        </p>
      )}
    </div>
  )
}

export default Input
