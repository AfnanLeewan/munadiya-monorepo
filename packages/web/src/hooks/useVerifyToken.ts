import { AuthAPI } from '@/api/authApi'
import { usePostAPI } from '@/hooks/useAPI'
import { useSnackbarQueue } from '@/hooks/useSnackbarQueue'
import { VerifyTokenResponse } from '@/shared/types/auth'
import { AxiosError, HttpStatusCode } from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

/**
 * Generates a custom hook that verifies a token and handles invalid tokens.
 *
 * @param {string} token - The token to be verified.
 * @param {string} redirectUrl - The URL to redirect to if the token is invalid.
 * @return {Object} An object containing the verification status, loading status, error status, and error object.
 */
export default function useVerifyToken(token: string, redirectUrl = '/') {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbarQueue()

  const tokenVerified = useRef(false)

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(true)
  const [error, setError] = useState<AxiosError>()

  const { mutateAsync: verifyFirstPasswordToken } =
    usePostAPI<VerifyTokenResponse>(AuthAPI.VERIFY_FIRST_PASSWORD_TOKEN)

  const handleInvalidToken = useCallback(() => {
    navigate(redirectUrl)
    enqueueSnackbar(
      t('common:user_management.send_first_password_email_expired'),
      {
        variant: 'error',
      },
    )
  }, [enqueueSnackbar, navigate, redirectUrl, t])

  const handleVerifyToken = useCallback(
    async (verifyToken: string) => {
      try {
        await verifyFirstPasswordToken({ token: verifyToken })
      } catch (e) {
        const err = e as AxiosError
        setIsError(true)
        setError(err)
        if (err.response?.status === HttpStatusCode.BadRequest) {
          handleInvalidToken()
        }
      } finally {
        setIsLoading(false)
      }
    },
    [handleInvalidToken, verifyFirstPasswordToken],
  )

  useEffect(() => {
    // If the token is falsy, call handleInvalidToken and return.
    if (!token) {
      handleInvalidToken()
      return
    }

    // If the token has already been verified, return.
    if (tokenVerified.current) {
      return
    }

    // Call handleVerifyToken with the token.
    handleVerifyToken(token)

    // Set tokenVerified.current to true.
    // Using a ref here is necessary because the useEffect hook is going to run multiple times,
    // and we want to make sure that we only verify the token once.
    tokenVerified.current = true
  }, [handleInvalidToken, handleVerifyToken, token])

  return { isTokenVerified: tokenVerified.current, isLoading, isError, error }
}
