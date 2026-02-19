import { Phase } from '../phases/Phase'
import { NotificationType } from './NotificationType'

export class Notification {
  readonly id: string
  readonly sessionId: string
  readonly phase: Phase
  readonly type: NotificationType
  readonly isRead: boolean
  readonly catPoints?: number
  readonly mikaPoints?: number
  readonly createdAt: Date
  readonly updatedAt: Date

  constructor(n: NotificationParams) {
    this.id = n.id
    this.sessionId = n.sessionId
    this.phase = n.phase
    this.catPoints = n.catPoints
    this.mikaPoints = n.mikaPoints
    this.type = n.type
    this.isRead = n.isRead
    this.createdAt = n.createdAt
    this.updatedAt = n.updatedAt
  }
  static notificationToCreateFactory(n: NotificationToCreateParams): NotificationToCreate {
    return {
      sessionId: n.sessionId,
      phaseId: n.phaseId,
      catPoints: n.catPoints,
      mikaPoints: n.mikaPoints,
      type: n.type,
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
}

export type NotificationParams = Notification
export type NotificationToCreate = Omit<Notification, 'id' | 'phase'> & { phaseId: string }
export type NotificationToCreateParams = Omit<NotificationToCreate, 'createdAt' | 'updatedAt'>
export type NotificationToUpdate = Pick<Notification, 'isRead'>
