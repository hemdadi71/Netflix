'use client'

import React, { useState, useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import { CldUploadButton } from 'next-cloudinary'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Button from './Button'
import Input from './inputs/Input'

const Form = () => {
  const [mount, setMount] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setMount(true)
  }, [])
  // const [link, setLink] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>()
  const videoUrl = watch('videoUrl')
  const thumbnailUrl = watch('thumbnailUrl')
  const handleUpload = (result: any) => {
    setValue('videoUrl', result?.info?.secure_url, { shouldValidate: true })
  }
  const handlePosterUpload = (result: any) => {
    setValue('thumbnailUrl', result?.info?.secure_url, { shouldValidate: true })
  }
  const onSubmit: SubmitHandler<FieldValues> = Data => {
    console.log(Data)
    setIsLoading(true)
    axios
      .post('/api/movie', Data)
      .then(res => {
        toast.success('Movie added successfully')
      })
      .catch(error => toast.error('Somthing went wrong!!!'))
      .finally(() => {
        setIsLoading(false)
      })
  }
  if (!mount) {
    return null
  }
  return (
    <>
      <div className="flex items-center jusify-center w-[70%] rounded-xl bg-opacity-30 backdrop-blur-md bg-black">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center w-full gap-5 p-4 h-full">
          <div className="flex flex-col justify-center items-center gap-1 w-[30%]">
            {videoUrl && (
              <div className="relative flex flex-col items-center justify-center w-[400px] h-[300px]">
                <video
                  className="rounded-xl"
                  src={videoUrl || ''}
                  autoPlay
                  loop
                />
              </div>
            )}
            <CldUploadButton
              className="w-full"
              options={{ maxFiles: 1 }}
              onUpload={handleUpload}
              uploadPreset="l7osseh6">
              <Button type="button">Upload Video</Button>
            </CldUploadButton>
            {thumbnailUrl && (
              <div className="relative flex flex-col items-center justify-center w-[250px] h-[120px] mt-2">
                <Image
                  className="rounded-xl object-cover"
                  src={thumbnailUrl || ''}
                  alt="image"
                  fill
                />
              </div>
            )}
            <CldUploadButton
              className="w-full"
              options={{ maxFiles: 1 }}
              onUpload={handlePosterUpload}
              uploadPreset="l7osseh6">
              <Button type="button">Upload Poster</Button>
            </CldUploadButton>
          </div>
          <div className="w-[70%] flex flex-col">
            <div className="flex flex-col w-full gap-3">
              <div className="flex gap-3 w-full">
                <div className="w-[50%]">
                  <Input
                    id="title"
                    label="Title:"
                    register={register}
                    errors={errors}
                    pattern={/([a-zA-Z]{2}|[^0-9]{2}|\D{2}|[^\d]{2})/}
                    text="Enter valid title"
                  />
                </div>
                <div className="w-[50%]">
                  <Input
                    id="description"
                    label="Description:"
                    register={register}
                    errors={errors}
                    pattern={/([a-zA-Z]{10}|[^0-9]{2}|\D{2}|[^\d]{2})/}
                    text="Enter valid description"
                  />
                </div>
              </div>
              <div className="flex items-center w-full gap-3">
                <div className="w-[50%]">
                  <Input
                    id="genre"
                    label="Genre:"
                    register={register}
                    errors={errors}
                    pattern={/([a-zA-Z]{10}|[^0-9]{2}|\D{2}|[^\d]{2})/}
                    text="Enter valid genre"
                  />
                </div>
                <div className="w-[50%]">
                  <Input
                    id="duration"
                    label="Duration:"
                    register={register}
                    errors={errors}
                    pattern={/([a-zA-Z]{10}|[^0-9]{2}|\D{2}|[^\d]{2})/}
                    text="Enter valid duration"
                  />
                </div>
              </div>
              <div className="flex items-center w-full gap-3">
                <div className="w-[50%]">
                  <Input
                    id="type"
                    label="Type:"
                    register={register}
                    errors={errors}
                    pattern={/([a-zA-Z]{1}|[^0-9]{2}|\D{2}|[^\d]{2})/}
                    text="Enter valid type"
                  />
                </div>
                <div className="w-[50%]">
                  <Button isLoading={isLoading} type="submit">
                    Add Video
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Form
