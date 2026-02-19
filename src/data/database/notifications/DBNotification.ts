import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm'
import {
  Notification,
  NotificationToCreate,
  NotificationToUpdate
} from '../../../domain/models/notifications/Notification'
import { NotificationType } from '../../../domain/models/notifications/NotificationType'
import { DBPhase } from '../phases/DBPhase'

@Entity('Notification')
export class DBNotification {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  sessionId: string

  @Column({ type: 'uuid' })
  phaseId: string

  @ManyToOne(() => DBPhase)
  @JoinColumn({ name: 'phaseId' })
  phase: DBPhase

  @Column({ type: 'varchar' })
  type: NotificationType

  @Column({ type: 'boolean' })
  isRead: boolean

  @Column({ type: 'int', nullable: true })
  catPoints?: number

  @Column({ type: 'int', nullable: true })
  mikaPoints?: number

  @Column({ type: 'timestamp' })
  createdAt: Date

  @Column({ type: 'timestamp' })
  updatedAt: Date

  static toNotification(dbnotification: DBNotification): Notification {
    return new Notification({
      id: dbnotification.id,
      sessionId: dbnotification.sessionId,
      phase: dbnotification.phase,
      type: dbnotification.type,
      isRead: dbnotification.isRead,
      catPoints: dbnotification.catPoints,
      mikaPoints: dbnotification.mikaPoints,
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
      catPoints: notification.catPoints,
      mikaPoints: notification.mikaPoints,
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

export type DBNotificationToCreate = Omit<DBNotification, 'id' |'phase'>
export type DBNotificationToUpdate = Pick<DBNotification, 'isRead' | 'updatedAt'>
