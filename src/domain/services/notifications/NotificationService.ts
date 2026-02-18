import { Inject, Injectable } from '@nestjs/common'
import { Notification } from '../../models/notifications/Notification'
import { INotificationProvider } from '../../providers/notifications/INotificationProvider'

@Injectable()
export class NotificationService {
  constructor(
    @Inject('INotificationProvider') private readonly notificationProvider: INotificationProvider
  ) {}

  async getAllBySessionId(sessionId: string): Promise<Notification[]> {
    return await this.notificationProvider.findAllBySessionId(sessionId)
  }

  async getOneById(id: string): Promise<Notification> {
    return await this.notificationProvider.findOneById(id)
  }
}
