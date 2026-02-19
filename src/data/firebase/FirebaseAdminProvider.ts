import { Injectable, Logger } from '@nestjs/common'
import firebase from 'firebase-admin'
import { config } from '../../config/configuration'
import { NotificationType } from '../../domain/models/notifications/NotificationType'
import { INotificationSenderProvider } from '../../domain/providers/notifications/INotificationSenderProvider'
import { PushNotification } from '../../domain/models/notifications/PushNotification'

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
      }
    )
  }

  async sendNotification(p: PushNotification): Promise<void> {
    try {
      for (const deviceToken of p.deviceTokens) {
        console.log('sending notification to device token', deviceToken)
        await this.firebase.messaging().send({
          notification: { body: p.body, title: p.title },
            token: deviceToken,
            data: { type: p.type, notificationId: p.notificationId }
          })
        }
    } catch (e) {
      this.logger.error(e.message)
    }
  }
}
