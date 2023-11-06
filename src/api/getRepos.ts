import axios, { AxiosError, AxiosResponse, isAxiosError } from 'axios'
import { useEffect, useState } from 'react'

const useGetRepos = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<AxiosResponse>()
  const [error, setError] = useState<AxiosResponse>()

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://api.github.com/search/repositories',
      params: {
        sort: 'stars',
        order: 'desc',
        q: `created:>2017-01-10`,
        per_page: 30,
        page: 1,
      },
    })
      .then((response) => {
        setIsLoading(false)
        setData(response)
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          const error = err as AxiosError
          setError(error.response)
        }
      })
  }, [])

  return {
    data,
    isLoading,
    error,
  }
}

export default useGetRepos
