import { axiosInstance } from '@/services/axios'
import type { AxiosRequestConfig } from 'axios'

enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

const handleError = (error: any) => {
  switch (error?.statusCode) {
    case HttpStatusCode.BAD_REQUEST:
      break
    case HttpStatusCode.NOT_FOUND:
    case HttpStatusCode.CONFLICT:
      break
    case HttpStatusCode.INTERNAL_SERVER_ERROR:
      break
    case HttpStatusCode.FORBIDDEN:
      window.location.pathname = '/forbidden'
      break
    case HttpStatusCode.UNAUTHORIZED:
      localStorage.clear()
      window.location.pathname = '/login'
      break
    default:
      throw error
  }

  throw error
}

export class API {
  static get = <R>(
    url: string,
    params: any = {},
    config?: AxiosRequestConfig<any>,
  ): Promise<R> => {
    return axiosInstance
      .get(url, {
        ...config,
        params,
      })
      .then((res) => {
        if (res?.config?.responseType) {
          return res
        }

        return res.data
      })
      .catch((error) => handleError(error))
  }

  static post = <R>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig<any> = {},
  ): Promise<R> => {
    return axiosInstance
      .post(url, data, {
        headers: { 'Content-Type': 'application/json' },
        ...config,
      })
      .then((res) => {
        if (res?.config?.responseType) {
          return res
        }
        if (res.data) {
          return res.data
        }
        return res
      })
      .catch((error) => {
        handleError(error)
      })
  }

  static put = <R>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig<any> = {},
  ): Promise<R> => {
    return axiosInstance
      .put(url, data, {
        headers: { 'Content-Type': 'application/json' },
        ...config,
      })
      .then((res) => {
        if (res?.config?.responseType) {
          return res
        }

        return res.data
      })
      .catch((error) => handleError(error))
  }

  static patch = <R>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig<any> = {},
  ): Promise<R> => {
    return axiosInstance
      .patch(url, data, {
        headers: { 'Content-Type': 'application/json' },
        ...config,
      })
      .then((res) => {
        if (res?.config?.responseType) {
          return res
        }

        return res.data
      })
      .catch((error) => handleError(error))
  }

  static uploadFile = <R>(
    url: string,
    data: File | null,
    config: AxiosRequestConfig<any> = {},
  ): Promise<R> => {
    return axiosInstance
      .put(url, data, config)
      .then((res) => {
        if (res?.config?.responseType) {
          return res
        }

        return res.data
      })
      .catch((error) => handleError(error))
  }

  static delete = <R>(
    url: string,
    config: AxiosRequestConfig<any> = {},
  ): Promise<R> => {
    return axiosInstance
      .delete(url, config)
      .then((res) => {
        if (res?.config?.responseType) {
          return res
        }

        return res.data
      })
      .catch((error) => handleError(error))
  }
}
