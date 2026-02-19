import { NotificationType } from './NotificationType'

export type PushNotification = {
  readonly body: string
  readonly deviceTokens: string[]
  readonly type: NotificationType
  readonly notificationId: string
  readonly title?: string
}
