import { NotificationType } from './NotificationType'

export class Notification {
  readonly id: string
  readonly sessionId: string
  readonly phaseId: string
  readonly type: NotificationType
  readonly isRead: boolean
  readonly createdAt: Date
  readonly updatedAt: Date

  constructor(n: NotificationParams) {
    this.id = n.id
    this.sessionId = n.sessionId
    this.phaseId = n.phaseId
    this.type = n.type
    this.isRead = n.isRead
    this.createdAt = n.createdAt
    this.updatedAt = n.updatedAt
  }
  static notificationToCreateFactory(n: NotificationToCreateParams): NotificationToCreate {
    return {
      sessionId: n.sessionId,
      phaseId: n.phaseId,
      type: n.type,
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
}

export type NotificationParams = Notification
export type NotificationToCreate = Omit<Notification, 'id'>
export type NotificationToCreateParams = Omit<NotificationToCreate, 'createdAt' | 'updatedAt'>
export type NotificationToUpdate = Pick<Notification, 'isRead'>
