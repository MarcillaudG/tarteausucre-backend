import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
  Notification,
  NotificationToCreate,
  NotificationToUpdate
} from '../../../domain/models/notifications/Notification'
import { INotificationProvider } from '../../../domain/providers/notifications/INotificationProvider'
import { DBNotification } from './DBNotification'

@Injectable()
export class DBNotificationProvider implements INotificationProvider {
  constructor(
    @InjectRepository(DBNotification)
    private readonly notificationRepository: Repository<DBNotification>
  ) {}

  async create(notificationToCreate: NotificationToCreate): Promise<Notification> {
    const notification = this.notificationRepository.create(
      DBNotification.dbNotificationToCreateFactory(notificationToCreate)
    )
    await this.notificationRepository.insert(notification)
    return this.findOneById(notification.id)
  }

  async findAllBySessionId(sessionId: string): Promise<Notification[]> {
    const notifications = await this.notificationRepository.find({
      where: { sessionId: sessionId }
    })
    return notifications.map((notification) => DBNotification.toNotification(notification))
  }

  async findOneById(id: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({ where: { id: id } })
    if (!notification) {
      throw new NotFoundException('Notification not found')
    }
    return DBNotification.toNotification(notification)
  }

  async update(
    id: string,
    notificationToUpdate: Partial<NotificationToUpdate>
  ): Promise<Notification> {
    await this.notificationRepository.update(
      id,
      DBNotification.dbNotificationToUpdateFactory(notificationToUpdate)
    )
    return this.findOneById(id)
  }
}
