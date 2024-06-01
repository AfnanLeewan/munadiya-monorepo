import type { AxiosRequestConfig } from 'axios'
import useClientMutation from '../services/react-query/mutation'
import useClientQuery from '../services/react-query/query'

export const useGetAPI = <T, TQuery extends {} = {}>(
  url: string,
  params: TQuery = {} as TQuery,
  queryOptions = {},
  key?: string,
) => useClientQuery<T>(url, params, queryOptions, key)

export const usePostAPI = <T, TBody = Record<string, any>>(
  url: string,
  config?: AxiosRequestConfig<TBody>,
) => useClientMutation<T, TBody>('post', url, config)

export const usePutAPI = <T, TBody = Record<string, any>>(
  url: string,
  config?: AxiosRequestConfig<TBody>,
) => useClientMutation<T, TBody>('put', url, config)

export const usePatchAPI = <T, TBody = Record<string, any>>(
  url: string,
  config?: AxiosRequestConfig<TBody>,
) => useClientMutation<T, TBody>('patch', url, config)

export const useDeleteAPI = <T>(
  url: string,
  config?: AxiosRequestConfig<any>,
) => useClientMutation<T>('delete', url, config)

export const useGetMutationAPI = <T>(
  url: string,
  config?: AxiosRequestConfig<any>,
) => useClientMutation<T>('get', url, config)
