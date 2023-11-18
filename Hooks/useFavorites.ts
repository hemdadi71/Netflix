import fetcher from '@/app/libs/fetcher'
import useSwr from 'swr'

const useMovies = () => {
  const { data, error, isLoading, mutate } = useSwr('/api/favorite', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useMovies
