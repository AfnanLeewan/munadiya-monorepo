export interface PubSubStrategy {
  getChannel(): string
  handleMessage(message: string): string
}
