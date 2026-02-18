import { Injectable, Logger } from '@nestjs/common'
import firebase from 'firebase-admin'
import { config } from '../../config/configuration'
import { NotificationType } from '../../domain/models/notifications/NotificationType'
import { INotificationSenderProvider } from '../../domain/providers/notifications/INotificationSenderProvider'

@Injectable()
export class FirebaseAdminProvider implements INotificationSenderProvider {
  private readonly logger = new Logger(FirebaseAdminProvider.name)
  private readonly firebase: firebase.app.App
  constructor() {
    this.firebase = firebase.initializeApp(
      {
        credential: firebase.credential.cert({
          projectId: config().firebase.projectId,
          privateKey: (config().firebase.privateKey ?? '').replace(/\\n/g, '\n'),
          clientEmail: config().firebase.clientEmail
        })
      },
      'foreman'
    )
  }

  async sendNotification(p: {
    body: string
    deviceToken: string
    type: NotificationType
    title?: string
  }): Promise<void> {
    try {
      await this.firebase.messaging().send({
        notification: { body: p.body, title: p.title },
        token: p.deviceToken,
        data: { type: p.type }
      })
    } catch (e) {
      this.logger.error(e.message)
    }
  }
}
