import { ButtonMethod } from '@/shared/enum/button'

const clientMethodMapper = {
  [ButtonMethod.CREATE]: 'CREATE',
  [ButtonMethod.VIEW]: 'VIEW',
  [ButtonMethod.UPDATE]: 'EDIT',
  [ButtonMethod.DELETE]: 'REMOVE',
  [ButtonMethod.CANCEL]: 'CANCEL',
  [ButtonMethod.SETTING]: 'SETTING',
  [ButtonMethod.PAGINATION]: 'PAGINATION',
  [ButtonMethod.DOWNLOAD]: 'EXPORT',
  [ButtonMethod.UPLOAD]: 'IMPORT',
  [ButtonMethod.CLOSE]: 'CLOSE',
}

export function mapClientMethod(method: ButtonMethod) {
  return clientMethodMapper[method]
}

export function mapClientMethods(methods: ButtonMethod[]) {
  return methods.map((method) => mapClientMethod(method))
}
