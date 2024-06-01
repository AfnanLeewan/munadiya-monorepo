import { useMutation } from '@tanstack/react-query'
import type { AxiosRequestConfig } from 'axios'

import { APIMethods } from '@/shared/types/api'
import { API } from '@/api'

const useClientMutation = <T, U = Record<string, any>>(
  method: APIMethods,
  url: string,
  config?: AxiosRequestConfig<U>,
) => {
  const makeRequest = (body: U): Promise<T> => {
    return new Promise((resolve, reject) => {
      switch (method) {
        case 'post':
          API.post<T>(url, body, config)
            .then((res) => resolve(res))
            .catch((error: any) => reject(error))
          break
        case 'put':
          API.put<T>(url, body, config)
            .then((res) => resolve(res))
            .catch((error: any) => reject(error))
          break
        case 'patch':
          API.patch<T>(url, body, config)
            .then((res) => resolve(res))
            .catch((error: any) => reject(error))
          break
        case 'delete':
          API.delete<T>(url, config)
            .then((res) => resolve(res))
            .catch((error: any) => reject(error))
          break

        default:
          API.get<T>(url, body, config)
            .then((data) => resolve(data))
            .catch((error) => reject(error))
          break
      }
    })
  }

  return useMutation((body: U) => makeRequest(body), {
    networkMode: 'always', // Always disregard the online/offline state in requests. We need this to display a network error toast.
  })
}

export default useClientMutation
