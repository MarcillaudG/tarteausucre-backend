import { Notification } from '../../../../../domain/models/notifications/Notification'
import { NotificationType } from '../../../../../domain/models/notifications/NotificationType'

export class NotificationVM {
  id: string
  sessionId: string
  phaseId: string
  type: NotificationType
  isRead: boolean
  createdAt: Date
  updatedAt: Date

  constructor(notification: Notification) {
    this.id = notification.id
    this.sessionId = notification.sessionId
    this.phaseId = notification.phaseId
    this.type = notification.type
    this.isRead = notification.isRead
    this.createdAt = notification.createdAt
    this.updatedAt = notification.updatedAt
  }
  static from(notification: Notification): NotificationVM {
    return new NotificationVM(notification)
  }
}
