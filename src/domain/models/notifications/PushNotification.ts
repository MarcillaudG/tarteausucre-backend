import { NotificationType } from './NotificationType'

export type PushNotification = {
  readonly body: string
  readonly type: NotificationType
  readonly title?: string
}
