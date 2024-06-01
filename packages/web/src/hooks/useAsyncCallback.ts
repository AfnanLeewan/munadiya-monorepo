import { useState } from 'react'

type AsyncFunction<T> = () => Promise<T>
type SuccessCallback<T> = (result: T) => void
type ErrorCallback = (error) => void

type AsyncHookResult<T> = {
  isLoading: boolean
  executeAsyncFunction: (
    asyncFunction: AsyncFunction<T>,
    onSuccess: SuccessCallback<T>,
    onError: ErrorCallback,
  ) => void
}

const useAsyncCallback = <T>(): AsyncHookResult<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const executeAsyncFunction = async (
    asyncFunction: AsyncFunction<T>,
    onSuccess: SuccessCallback<T>,
    onError: ErrorCallback,
  ) => {
    setIsLoading(true)
    asyncFunction()
      .then((result) => {
        onSuccess(result)
      })
      .catch((err) => {
        onError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return { isLoading, executeAsyncFunction }
}

export default useAsyncCallback
