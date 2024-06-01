export enum PolicyAllowClientActions {
  // client
  VIEW = 'VIEW',
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  REMOVE = 'REMOVE',
  EXPORT = 'EXPORT',
}

export enum PolicyAllowServerActions {
  // server
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum PolicyActionsType {
  CLIENT = 'client',
  SERVER = 'server',
}

export enum PolicyConditionOps {
  STRING_EQUAL = 'string-equal',
  STRING_NOT_EQUAL = 'string-not-equal',
}
