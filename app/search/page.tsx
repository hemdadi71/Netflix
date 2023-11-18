'use client'

import React, { useState } from 'react'
import SearchInput from '../components/SearchInput'
import { debounce } from 'lodash'
import axios from 'axios'
import MovieList from '../components/MovieList'

const Search = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [value, setValue] = useState('')
  const handleInputChange = debounce((inputValue: string) => {
    if (inputValue) {
      setIsLoading(true)
      axios.post('/api/movies', { inputValue }).then(res => {
        setIsLoading(false)
        setValue(inputValue)
        setData(res.data)
      })
    }
  }, 1000)
  return (
    <>
      <div className="px-4 md:px-12 pt-32 flex justify-center">
        <div className="md:w-[40%]">
          <SearchInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(e.target.value)
            }}
            label="Search"
            isLoading={isLoading}
            id="Search"
          />
        </div>
      </div>
      <div className="mt-5">
        {value && data.length && (
          <MovieList title={`Search results for : ${value}`} movies={data} />
        )}
      </div>
      <div>
        {value && data.length === 0 && (
          <div className="mt-5 text-white text-md md:text-xl lg:text-2xl font-semibold mb-4 px-4 md:px-12">
            <p>Result not found</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Search
