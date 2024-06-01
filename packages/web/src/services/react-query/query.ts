import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'

import { API } from '@/api'
import { objectToQueryString } from '@/utils/url'

const useClientQuery = <T>(
  url: string,
  params = {},
  queryOptions = {},
  key?: string,
) => {
  const makeRequest = useCallback(
    (): Promise<T> =>
      new Promise((resolve, reject) => {
        API.get<T>(url, params)
          .then((data) => resolve(data))
          .catch((error) => reject(error))
      }),
    [params, url],
  )
  const query = useQuery(
    [key || `${url}?${objectToQueryString(params)}`],
    () => makeRequest(),
    {
      ...queryOptions,
      keepPreviousData: true,
    },
  )
  return {
    ...query,
    reset: () => query.remove(),
  }
}

export type ClientQueryReturnType<T> = ReturnType<typeof useClientQuery<T>>

export default useClientQuery
