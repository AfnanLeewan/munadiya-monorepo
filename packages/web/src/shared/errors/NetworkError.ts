export class NetworkError extends Error {
  constructor() {
    super('Network Error')
    this.name = 'NetworkError'
  }
}
