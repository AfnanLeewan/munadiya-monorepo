import { PubSubStrategy } from './strategy.interface'

export class NotificationStrategy implements PubSubStrategy {
  getChannel() {
    return 'general-notification-channel'
  }

  handleMessage(message: string): string {
    return message
  }
}
