import { PushNotification } from '../../models/notifications/PushNotification'

export interface INotificationSenderProvider {
  sendNotification(notification: PushNotification): Promise<void>
}
