import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import axios, { HttpStatusCode } from 'axios'
import Cookies from 'js-cookie'
import { NetworkError } from '@/shared/errors/NetworkError'
import { FirebaseAuth } from '@/config/firebase'
import { envService } from './EnvService'

function handleRefreshToken() {
  const { auth } = FirebaseAuth.getInstance()

  auth.onIdTokenChanged(async (user) => {
    if (user) {
      user.getIdTokenResult().then((result) => {
        if (result.claims.external_id) {
          localStorage.setItem('access_token', result.token)
        }
      })
    }
  })
}

function createAxiosInstance() {
  const backendUrl = envService.getBackendUrl()
  let isAlreadyFetchingAccessToken = false
  let refreshToken: Promise<void> | null = null

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
  })

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const token = localStorage.getItem('access_token')
      const currentRole = Cookies.get('current-role')
      return {
        ...config,
        // @ts-ignore
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          'current-role': currentRole,
          ...config.headers,
        },
      }
    },
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      isAlreadyFetchingAccessToken = false
      return response
    },
    async (error) => {
      if (error.response?.status === HttpStatusCode.Forbidden) {
        window.location.href = '/403'
      }

      if (!navigator.onLine) {
        throw new NetworkError()
      }

      const isRememberMe = localStorage.getItem('previous_user')

      if (
        error.response?.status === HttpStatusCode.Unauthorized &&
        isRememberMe
      ) {
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true
          refreshToken = new Promise((resolve) => {
            resolve(handleRefreshToken())
          })
        }
        await refreshToken
      }

      return Promise.reject(error)
    },
  )

  return axiosInstance
}

const axiosInstance = createAxiosInstance()

export { axiosInstance }
