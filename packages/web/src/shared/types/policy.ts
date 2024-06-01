import {
  PolicyAllowClientActions,
  PolicyAllowServerActions,
  PolicyConditionOps,
} from '../enum/policy'

export type Policies = {
  policies: PolicyResponseDto[]
}

export type PolicyResponseDto = {
  method: string
  resources: string[]
  conditions?: string[]
}

export type Resource = {
  action: PolicyAllowClientActions | PolicyAllowServerActions
  routes: string[]
  conditions?: Conditions[]
}

export type Conditions = {
  [operation in PolicyConditionOps]: { [key: string]: string } // todo: type
}

export type PolicyResources = {
  client: Resource[]
  server: Resource[]
}
