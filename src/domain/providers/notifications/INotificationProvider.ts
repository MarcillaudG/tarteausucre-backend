import {
  Notification,
  NotificationToCreate,
  NotificationToUpdate
} from '../../models/notifications/Notification'

export interface INotificationProvider {
  create(notificationToCreate: NotificationToCreate): Promise<Notification>
  findAllBySessionId(sessionId: string): Promise<Notification[]>
  findOneById(id: string): Promise<Notification>
  update(id: string, notificationToUpdate: Partial<NotificationToUpdate>): Promise<Notification>
}
