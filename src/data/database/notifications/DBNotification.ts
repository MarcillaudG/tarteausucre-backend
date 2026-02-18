import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import {
  Notification,
  NotificationToCreate,
  NotificationToUpdate
} from '../../../domain/models/notifications/Notification'
import { NotificationType } from '../../../domain/models/notifications/NotificationType'

@Entity('Notification')
export class DBNotification {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  sessionId: string

  @Column({ type: 'uuid' })
  phaseId: string

  @Column({ type: 'varchar' })
  type: NotificationType

  @Column({ type: 'boolean' })
  isRead: boolean

  @Column({ type: 'timestamp' })
  createdAt: Date

  @Column({ type: 'timestamp' })
  updatedAt: Date

  static toNotification(dbnotification: DBNotification): Notification {
    return new Notification({
      id: dbnotification.id,
      sessionId: dbnotification.sessionId,
      phaseId: dbnotification.phaseId,
      type: dbnotification.type,
      isRead: dbnotification.isRead,
      createdAt: dbnotification.createdAt,
      updatedAt: dbnotification.updatedAt
    })
  }

  static dbNotificationToCreateFactory(notification: NotificationToCreate): DBNotificationToCreate {
    return {
      sessionId: notification.sessionId,
      phaseId: notification.phaseId,
      type: notification.type,
      isRead: notification.isRead,
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt
    }
  }

  static dbNotificationToUpdateFactory(
    notification: Partial<NotificationToUpdate>
  ): Partial<DBNotificationToUpdate> {
    return {
      isRead: notification.isRead,
      updatedAt: new Date()
    }
  }
}

export type DBNotificationToCreate = Omit<DBNotification, 'id'>
export type DBNotificationToUpdate = Pick<DBNotification, 'isRead' | 'updatedAt'>
