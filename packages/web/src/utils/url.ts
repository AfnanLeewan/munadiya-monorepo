import queryString from 'query-string'

export const queryStringToObject = (str: string, options = {}) =>
  queryString.parse(str, {
    arrayFormat: 'bracket',
    ...options,
  })

export const objectToQueryString = (obj: Record<string, any>, options = {}) =>
  queryString.stringify(obj, {
    arrayFormat: 'bracket',
    ...options,
  })

export const encodeObject = (values: Record<string, any>) => {
  return btoa(objectToQueryString(values))
}

export const decodeObject = (code: string) => {
  return queryStringToObject(atob(code))
}
