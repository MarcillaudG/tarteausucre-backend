import { Notification } from '../../../../../domain/models/notifications/Notification'
import { NotificationType } from '../../../../../domain/models/notifications/NotificationType'
import { PhaseDTO } from './PhaseDTO'

export class NotificationVM {
  id: string
  sessionId: string
  phase: PhaseDTO
  type: NotificationType
  isRead: boolean
  createdAt: Date
  updatedAt: Date

  constructor(notification: Notification) {
    this.id = notification.id
    this.sessionId = notification.sessionId
    this.phase = new PhaseDTO(notification.phase)
    this.type = notification.type
    this.isRead = notification.isRead
    this.createdAt = notification.createdAt
    this.updatedAt = notification.updatedAt
  }
  static from(notification: Notification): NotificationVM {
    return new NotificationVM(notification)
  }
}
