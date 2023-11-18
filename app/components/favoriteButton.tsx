import useCurrentUser from '@/Hooks/useCurrentUser'
import useFavorites from '@/Hooks/useFavorites'
import axios from 'axios'
import React, { useCallback, useMemo, useState } from 'react'
import { GoHeart } from 'react-icons/go'
import { GoHeartFill } from 'react-icons/go'
import Spinner from './Spinner'
interface FavoriteButtonProps {
  movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { mutate: mutateFavorites } = useFavorites()

  const { data: currentUser, mutate } = useCurrentUser()

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(movieId)
  }, [currentUser, movieId])

  const toggleFavorites = useCallback(async () => {
    setIsLoading(true)
    let response

    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId } })
    } else {
      response = await axios.post('/api/favorite', { movieId })
    }

    const updatedFavoriteIds = response?.data?.favoriteIds

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    })
    mutateFavorites()
    setIsLoading(false)
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites])

  const Icon = isFavorite ? GoHeartFill : GoHeart

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer relative flex items-center justify-center">
      {isLoading ? (
        <Spinner width={50} height={50} className="w-4 lg:w-10" />
      ) : (
        <Icon
          size={40}
          className={` group-hover/item:text-neutral-300 w-4 lg:w-10 ${
            isFavorite ? 'text-red-600' : 'text-white'
          }`}
        />
      )}
    </div>
  )
}

export default FavoriteButton
