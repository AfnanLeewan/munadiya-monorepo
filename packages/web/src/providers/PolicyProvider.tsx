import { createContext } from 'react'
import { pathToRegexp } from 'path-to-regexp'
import { useAuth } from '@/hooks/useAuth'
import { useGetAPI } from '@/hooks/useAPI'
import { Policies, PolicyResponseDto } from '@/shared/types/policy'
import { useLocation, useNavigate } from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material'
import { PolicyAPI } from '@/api/policyApi'
import { PolicyAllowClientActions } from '@/shared/enum/policy'
import { ButtonMethod } from '@/shared/enum/button'
import { mapClientMethod } from '@/utils/mapper/clientMethod'
import { defaultRoutes } from '@/shared/constants/policy'

type PolicyProviderContextType = {
  isLoading: boolean
  allowToAccessToLocation: (method?: ButtonMethod, path?: string) => boolean
  policies?: Partial<PolicyResponseDto[]>
}

export const PolicyProviderContext = createContext<PolicyProviderContextType>({
  isLoading: false,
} as PolicyProviderContextType)

export const PolicyProvider = ({ children }) => {
  const { currentRole, loggedIn } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const {
    data: policies,
    isLoading,
    isFetching,
  } = useGetAPI<Policies>(
    PolicyAPI.GET_POLICY,
    { roleName: currentRole },
    {
      enabled: loggedIn,
    },
  )

  if (!loggedIn) {
    return <>{children}</>
  }

  const isPathMatch = (resource: string, path?: string): boolean => {
    const checkPath = path || location.pathname
    // todo: remove this. it's a temporary fix for the nested routes
    if (resource === '*') return true
    if (resource.endsWith('/*')) {
      const resourceWithoutWildcard = resource.slice(0, -2)
      return checkPath.startsWith(resourceWithoutWildcard)
    }
    return pathToRegexp(resource).test(checkPath)
  }

  const allowToAccessToLocation = (
    method?: ButtonMethod,
    path?: string,
  ): boolean => {
    if (!method) {
      return (
        policies?.policies?.some(
          (policy) =>
            policy?.resources.some((resource) => isPathMatch(resource, path)),
        ) ?? false
      )
    }
    const matchMethods = policies?.policies
      ?.filter(
        (policy) =>
          policy?.resources.some((resource) => isPathMatch(resource, path)),
      )
      .map((policy) => policy?.method)

    return matchMethods?.includes(mapClientMethod(method)) ?? false // note: if you add a new method, you need to add it to the mapClientMethod function.
  }

  const policyMatchesResource = (policy: PolicyResponseDto) => {
    const isHomeRoute = defaultRoutes.includes(location.pathname)
    return (
      isHomeRoute || policy?.resources.some((resource) => isPathMatch(resource))
    )
  }

  const res = policies?.policies.find(
    (policy) => policy.method === PolicyAllowClientActions.VIEW,
  ) as PolicyResponseDto

  let isAuthorized =
    Array.isArray(policies?.policies) && policyMatchesResource(res)

  if (location.pathname === '/404' || location.pathname === '/403') {
    isAuthorized = true
  }

  if (isLoading || isFetching) {
    return (
      <Backdrop
        sx={{
          color: 'contrast.light',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  if (!isAuthorized && !(isLoading || isFetching)) {
    navigate('/404', { replace: true })
  }

  return (
    <PolicyProviderContext.Provider
      value={{
        isLoading: isLoading || isFetching,
        policies: policies?.policies,
        allowToAccessToLocation,
      }}
    >
      {isAuthorized && !(isLoading || isFetching) && children}
    </PolicyProviderContext.Provider>
  )
}
