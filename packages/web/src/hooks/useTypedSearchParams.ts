import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useTypedSearchParams = <
  T extends ReadonlyArray<string>,
  TQuery = Partial<{
    [K in T extends ReadonlyArray<infer U> ? U : never]: string
  }> & {
    limit: string
    page: string
  },
>({
  queryKeys,
  prefix = '',
  defaultInit,
}: {
  queryKeys: T
  prefix?: string
  defaultInit?: Record<string, string>
}) => {
  const [searchParam, setSearchParams] = useSearchParams(defaultInit)

  const query = useMemo(() => {
    const queryObject = Array.from(searchParam?.entries())
      .filter(([key]) => !prefix || key.startsWith(prefix))
      .map(
        ([key, value]) => [key.substring(prefix?.length || 0), value] as const,
      )
      .filter(([key]) => queryKeys.includes(key))
      .reduce(
        (acc, [key, value]) => {
          if (value) {
            acc[key] = value
          }
          return acc
        },
        {
          limit: '20',
          page: '1',
        } as TQuery,
      )
    return queryObject
  }, [searchParam, prefix, queryKeys])

  const setQuery = (dispatch: (params: TQuery) => TQuery) => {
    Object.entries(dispatch(query) as Record<string, string>).forEach(
      ([key, value]) => {
        if (value) {
          searchParam.set(prefix + key, value as any)
        } else {
          searchParam.delete(prefix + key)
        }
      },
    )
    setSearchParams(searchParam, { replace: true })
  }
  return [query, setQuery] as const
}
