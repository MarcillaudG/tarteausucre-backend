import { PushNotification } from '../../models/notifications/PushNotification'

export interface INotificationSenderProvider {
  sendNotification(p: PushNotification): Promise<void>
}
